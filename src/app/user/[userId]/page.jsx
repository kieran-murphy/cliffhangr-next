"use client";

import React, { use, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import UserReviewListItem from "@/components/UserReviewListItem";
import UserFavoriteListItem from "@/components/UserFavoriteListItem";
import UserFollowerListItem from "@/components/UserFollowerListItem";
import UserFollowingListItem from "@/components/UserFollowingListItem";

export default function Home({ params }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [isFollower, setIsFollower] = useState(false);
  const [isFollowerID, setIsFollowerID] = useState(false);
  const [isUser, setIsUser] = useState(false);

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
      const response = await fetch("http://localhost:3000/api/follow", {
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
      const response = await fetch("http://localhost:3000/api/follow", {
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
    <>
      <Link href={"/user"}>
        <div className="border border-grey-400 cursor-pointer m-4 w-1/3 opacity-80">
          <h1>{"<- Back to users"}</h1>
        </div>
      </Link>
      <div className="border border-cyan-400 m-4 w-1/3">
        <h1 className="font-bold">{user.username}</h1>
      </div>
      <div className="border border-cyan-400 m-4 w-1/3">
        <h1 className="">{user.email}</h1>
      </div>
      <div className="border border-cyan-400 m-4 w-1/3">
        <h1 className="">Role: {user.role}</h1>
      </div>
      <div
        className="border border-cyan-400 cursor-pointer m-4 w-1/3"
        onClick={() => setShowFavorites(!showFavorites)}
      >
        {showFavorites ? (
          <div>
            <div
              className="my-2 hover:border border-cyan-400"
              onClick={() => setShowFavorites(!showFavorites)}
            >
              collapse
            </div>
            {user.favoriteShows.map((favorite) => (
              <UserFavoriteListItem key={favorite.id} favorite={favorite} />
            ))}
          </div>
        ) : (
          <h1>{user.favoriteShows.length} favorites</h1>
        )}
      </div>
      <div
        className="border border-cyan-400 cursor-pointer m-4 w-1/3"
        onClick={() => setShowReviews(!showReviews)}
      >
        {showReviews ? (
          <div>
            <div
              className="my-2 hover:border border-cyan-400"
              onClick={() => setShowReviews(!showReviews)}
            >
              collapse
            </div>
            {user.writtenReviews.map((review) => (
              <UserReviewListItem key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <h1>{user.writtenReviews.length} reviews</h1>
        )}
      </div>
      <div
        className="border border-cyan-400 cursor-pointer m-4 w-1/3"
        onClick={() => setShowFollowing(!showFollowing)}
      >
        {showFollowing ? (
          <div>
            <div
              className="my-2 hover:border border-cyan-400"
              onClick={() => setShowFollowing(!showFollowing)}
            >
              collapse
            </div>
            {user.following.map((follow) => (
              <UserFollowingListItem key={follow.id} follow={follow} />
            ))}
          </div>
        ) : (
          <h1>{user.following.length} following</h1>
        )}
      </div>
      <div
        className="border border-cyan-400 cursor-pointer m-4 w-1/3"
        onClick={() => setShowFollowers(!showFollowers)}
      >
        {showFollowers ? (
          <div>
            <div
              className="my-2 hover:border border-cyan-400"
              onClick={() => setShowFollowers(!showFollowers)}
            >
              collapse
            </div>
            {user.followers.map((follow) => (
              <UserFollowerListItem key={follow.id} follow={follow} />
            ))}
          </div>
        ) : (
          <h1>{user.followers.length} followers</h1>
        )}
      </div>
      <div className="border border-cyan-400 m-4 w-1/3">
        <h1 className="opacity-70">Comments: {user.CommentOnReview.length}</h1>
      </div>
      {!isUser && (
        <>
          {isFollower ? (
            <div
              className="border border-cyan-400 m-4 w-1/3 cursor-pointer"
              onClick={() => unfollow()}
            >
              <h1 className="font-bold">Unfollow</h1>
            </div>
          ) : (
            <div
              className="border border-cyan-400 m-4 w-1/3 cursor-pointer"
              onClick={() => follow()}
            >
              <h1 className="font-bold">Follow</h1>
            </div>
          )}
        </>
      )}
    </>
  );
}
