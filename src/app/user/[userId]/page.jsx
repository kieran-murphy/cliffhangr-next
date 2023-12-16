"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import MainLayout from "../../layout/main-layout";
import UserReviewListItem from "@/components/UserReviewListItem";
import UserFavoriteListItem from "@/components/UserFavoriteListItem";

export default function Home({ params }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const userId = params.userId;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/user?id=${userId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!user) return <p>No user found!</p>;

  return (
    <MainLayout>
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
      <div className="border border-cyan-400 m-4 w-1/3">
        <h1 className="opacity-70">Comments: {user.CommentOnReview.length}</h1>
      </div>
    </MainLayout>
  );
}
