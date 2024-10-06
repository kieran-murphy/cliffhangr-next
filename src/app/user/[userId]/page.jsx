"use client";

import React, { use, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FaRegCheckSquare } from "react-icons/fa";
import Image from "next/image";

import Favourites from "@/components/Favourites";
import ProfileReviews from "@/components/ProfileReviews";
import Watchlist from "@/components/Watchlist";

export default function Home({ params }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [avgScore, setAvgScore] = useState(0.0);
  const [isFollower, setIsFollower] = useState(false);
  const [isFollowerID, setIsFollowerID] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [tab, setTab] = useState("profile");

  const { data: session } = useSession(); // Also get status to check loading state

  const userId = params.userId;
  const sessionUserID = session?.user?.id || null; // Directly access ID from session

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/user?id=${userId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data.user);
        setUser(data.user);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  useEffect(() => {
    const checkFollowing = () => {
      let matchingFollow = user.followers.find(
        (follower) => follower.followerId === sessionUserID
      );
      if (matchingFollow) {
        setIsFollower(true);
        setIsFollowerID(matchingFollow.id);
      }
    };

    const checkIsUser = () => {
      console.log(sessionUserID);
      console.log(userId);
      if (sessionUserID === userId) {
        setIsUser(true);
      }
    };

    if (user) {
      checkFollowing();
      checkIsUser();
    }
  }, [user, sessionUserID]);

  const follow = async () => {
    try {
      const response = await fetch("/api/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          follow: {
            followerId: sessionUserID,
            followingId: userId,
          },
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        console.log(data);
        window.location.reload();
      } else {
        alert("Submission failed");
      }
    } catch (error) {
      console.error("There was an error submitting the form data", error);
      alert("There was an error submitting the form data");
    }
  };

  const unfollow = async () => {
    try {
      const response = await fetch("/api/follow", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          followID: isFollowerID,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        console.log(data);
        window.location.reload();
      } else {
        alert("Submission failed");
      }
    } catch (error) {
      console.error("There was an error submitting the form data", error);
      alert("There was an error submitting the form data");
    }
    // alert("unfollow");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!user) return <p>No user found!</p>;

  return (
    <div>
      <div className="w-full flex flex-row lg:flex-col place-content-evenly">
        <div className="avatar my-8 ">
          <div className="w-20 rounded-full ring ring-slate-400 ring-offset-base-100 ring-offset-2">
            <Image
              src={"/images/profile.png"}
              alt="profile"
              width={80}
              height={80}
            />
          </div>
        </div>
        <div className="self-center flex flex-col">
          <h1 className="text-xl font-bold ">{user.username} </h1>
          {user.isAdmin ? (
            <div className="flex flex-row">
              <FaCheckCircle className="h-4 ml-6 mr-1 text-info" />{" "}
              <h1 className="font-light text-xs">Admin</h1>
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex place-content-center tabs tabs-boxed ">
        <a
          className={`tab ${tab === "profile" ? "tab-active" : ""}`}
          onClick={() => setTab("profile")}
        >
          Profile
        </a>
        <a
          className={`tab ${tab === "reviews" ? "tab-active" : ""}`}
          onClick={() => setTab("reviews")}
        >
          Reviews
        </a>
        <a
          className={`tab ${tab === "favourites" ? "tab-active" : ""}`}
          onClick={() => setTab("favourites")}
        >
          Favourites
        </a>
        <a
          className={`tab ${tab === "watchlist" ? "tab-active" : ""}`}
          onClick={() => setTab("watchlist")}
        >
          Watchlist
        </a>
      </div>

      <div className="w-full flex place-content-center">
        {tab === "profile" ? (
          <div className="flex flex-col w-full place-content-center">
            {!isUser && (
              <>
                {isFollower ? (
                  <div className="flex place-content-center mx-6 mt-6">
                    <button
                      className="btn w-full"
                      onClick={() => {
                        unfollow("Steve", user.name);
                      }}
                    >
                      Following <FaRegCheckSquare className="ml-2" />
                    </button>
                  </div>
                ) : (
                  <div className="flex place-content-center mx-6 mt-6">
                    <button
                      className="btn btn-info w-full"
                      onClick={() => {
                        follow("Steve", user.name);
                      }}
                    >
                      Follow +
                    </button>
                  </div>
                )}
              </>
            )}
            <div className=" stats stats-vertical shadow text-center m-6 bg-base-200">
              <div className="stat">
                <div className="stat-title">Reviews</div>
                <div className="stat-value text-success">
                  {user.writtenReviews.length}
                </div>
              </div>

              <div className="stat">
                <div className="stat-title">Avg Score</div>
                <div className="stat-value text-success">
                  {user.writtenReviews.length > 0 ? avgScore : 0}
                </div>
              </div>

              <div className="stat">
                <div className="stat-title">Following</div>
                <div className="stat-value text-warning">
                  {user.following.length}
                </div>
              </div>

              <div className="stat">
                <div className="stat-title">Followers</div>
                <div className="stat-value text-secondary">
                  {user.followers.length}
                </div>
              </div>
            </div>
          </div>
        ) : tab === "watchlist" ? (
          <Watchlist watchlist={user.watchlistShows} />
        ) : tab === "favourites" ? (
          <Favourites favourites={user.favoriteShows} />
        ) : (
          <ProfileReviews reviews={user.writtenReviews} />
        )}
      </div>
    </div>
  );
}
