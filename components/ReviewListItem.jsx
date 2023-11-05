"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const ReviewListItem = ({ review }) => {
  const userId = review.userId;
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

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

  if (loading) return <p></p>;

  return (
    <Link href={`/review/${review.id}`}>
      <div className="py-2">
        <h1 className="">
          <h1 className="font-bold">{user.username}</h1>
          {review.rating} ⭐
          <br />
          {review.text}
          {/* <br />
          {review.reactOnReviews.length} reacts
          <br />
          {review.CommentOnReview.length} comments */}
        </h1>
      </div>
    </Link>
  );
};

export default ReviewListItem;
