"use client";

import React, { use, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FaRegCheckSquare } from "react-icons/fa";

import Image from "next/image";

import Favourites from "./Favourites";
import ProfileReviews from "./ProfileReviews";
import Watchlist from "./Watchlist";
import SmallUser from "@/components/SmallUser";
// import LoadingSpinner from "@/components/LoadingSpinner";

export default function UserClientPage({ user, userId }) {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  const [avgScore, setAvgScore] = useState(0);
  const [isFollower, setIsFollower] = useState(false);
  const [isFollowerID, setIsFollowerID] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [tab, setTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");

  const { data: session } = useSession(); // Also get status to check loading state

  const sessionUserID = session?.user?.id || null; // Directly access ID from session

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      if (sessionUserID === userId) {
        setIsUser(true);
      }
    };

    const calculateAverageReviews = () => {
      const totalRating = user.writtenReviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      const avgRating = totalRating / user.writtenReviews.length;
      setAvgScore(avgRating);
    };

    if (user) {
      checkFollowing();
      checkIsUser();
      calculateAverageReviews();
    }
  }, [user, sessionUserID]);

  useEffect(() => {
    if (editMode && user) {
      setNewUsername(user.username);
      setNewImageUrl(user.imageUrl || "");
    }
  }, [editMode, user]);

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

  const updateProfile = async () => {
    try {
      const response = await fetch("/api/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: userId,
          data: { username: newUsername, imageUrl: newImageUrl },
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      // Optionally update the local user state with the updated values
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Profile update failed");
    }
  };

//   if (loading) return <LoadingSpinner />;
//   if (error) return <p>Error: {error.message}</p>;
  if (!user) return <p>No user found!</p>;

  return (
    <div>
      <div className="w-full flex flex-row place-content-center">
        <div className="avatar my-8 mx-4">
          <div className="w-20 rounded-full ring ring-slate-400 ring-offset-base-100 ring-offset-2">
            <Image
              src={user.imageUrl || "/images/profile.png"}
              alt="profile"
              width={80}
              height={80}
            />
          </div>
        </div>
        <div className="self-center flex flex-col">
          <h1 className="text-xl font-bold ">{user.username} </h1>
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

      <div className="w-full md:w-1/2 mx-auto flex place-content-center">
        {tab === "profile" ? (
          <div className="flex flex-col w-full place-content-center">
            {!editMode ? (
              <>
                {!isUser ? (
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
                ) : (
                  <div className="flex place-content-center mx-6 mt-6">
                    <button
                      className="btn btn-secondary w-full"
                      onClick={() => setEditMode(true)}
                    >
                      Edit my profile
                    </button>
                  </div>
                )}
                <div className=" stats stats-vertical shadow text-center m-6 bg-base-200">
                  <div className="stat" onClick={() => setTab("reviews")}>
                    <div className="stat-title">Reviews</div>
                    <div className="stat-value text-success">
                      {user.writtenReviews.length}
                    </div>
                  </div>

                  <div className="stat">
                    <div className="stat-title">Avg Score</div>
                    <div className="stat-value text-success">
                      {user.writtenReviews.length > 0 ? avgScore.toFixed(2) : 0}
                    </div>
                  </div>

                  <div className="stat">
                    <div className="stat-title">Following</div>
                    {!showFollowing ? (
                      <div
                        className="stat-value text-warning"
                        onClick={() => {
                          setShowFollowing(true);
                        }}
                      >
                        {user.following.length}
                      </div>
                    ) : (
                      <div
                        className=""
                        onClick={() => {
                          setShowFollowing(false);
                        }}
                      >
                        {user.following.map((f) => (
                          <div key={f.id}>
                            <SmallUser userId={f.followingId} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="stat">
                    <div className="stat-title">Followers</div>
                    {!showFollowers ? (
                      <div
                        className="stat-value text-secondary"
                        onClick={() => {
                          setShowFollowers(true);
                        }}
                      >
                        {user.followers.length}
                      </div>
                    ) : (
                      <div
                        className=""
                        onClick={() => {
                          setShowFollowing(false);
                        }}
                      >
                        {user.followers.map((f) => (
                          <div key={f.id}>
                            <SmallUser userId={f.followerId} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col place-content-center mx-6 mt-6">
                <div className="form-control">
                  <label htmlFor="username-input" className="label">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username-input"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="Username"
                    className="input input-secondary my-2"
                  />
                  <label htmlFor="image-url-input" className="label">
                    Image URL
                  </label>
                  <input
                    type="text"
                    id="image-url-input"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="Image URL"
                    className="input input-secondary my-2"
                  />
                </div>
                <div className="flex place-content-center mt-6">
                  <button
                    className="btn btn-secondary w-full"
                    onClick={updateProfile}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
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
