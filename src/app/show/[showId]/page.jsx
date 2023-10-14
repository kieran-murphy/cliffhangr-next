"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import FavoriteListItem from "./FavoriteListItem";

export default function Home({ params }) {
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviews, setShowReviews] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const showId = params.showId;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/show?id=${showId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setShow(data.show);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (showId) {
      fetchData();
    }
  }, [showId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!show) return <p>No show found!</p>;

  return (
    <div>
      <Link href={"/show"}>
        <div className="border border-grey-400 cursor-pointer m-4 w-1/3 opacity-80">
          <h1>{"<- Back to shows"}</h1>
        </div>
      </Link>
      <div className="border border-cyan-400 m-4 w-1/3">
        <h1 className="font-bold">{show.title}</h1>
      </div>
      <div className="border border-cyan-400 m-4 w-1/3">
        <h1>{show.averageRating} average rating</h1>
      </div>
      <div
        className="border border-cyan-400 cursor-pointer m-4 w-1/3"
        onClick={() => setShowFavorites(!showFavorites)}
      >
        {showFavorites ? (
          <div>
            {show.favoritedBy.map((f) => (
              <FavoriteListItem key={f.id} favorite={f} />
              // <h1 key={f.id}>{f.userId}</h1>
            ))}
          </div>
        ) : (
          <h1>{show.favoritedBy.length} favorites</h1>
        )}
      </div>
      <div
        className="border border-cyan-400 cursor-pointer m-4 w-1/3"
        onClick={() => setShowReviews(!showReviews)}
      >
        {showReviews ? (
          <div>
            {show.reviews.map((r) => (
              <h1 key={r.id}>
                {r.rating} - {r.text}
              </h1>
            ))}
          </div>
        ) : (
          <h1>{show.reviews.length} reviews</h1>
        )}
      </div>
    </div>
  );
}
