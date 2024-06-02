"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const UserReviewListItem = ({ review }) => {
  const showId = review.showId;
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState({});

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

  if (loading) return <p></p>;

  return (
    <Link href={`/review/${review.id}`}>
      <div className="my-2 hover:border border-cyan-400">
        <h1 className="font-bold">{show.title}</h1>
        {review.rating} ⭐
        <br />
        {review.text}
        {/* <br />
          {review.reactOnReviews.length} reacts
          <br />
          {review.CommentOnReview.length} comments */}
      </div>
    </Link>
  );
};

export default UserReviewListItem;
