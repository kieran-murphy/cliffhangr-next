"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Home({ params }) {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showId, setShowId] = useState("");
  const [userId, setUserId] = useState("");
  const [show, setShow] = useState(null);
  const [user, setUser] = useState(null);

  const reviewId = params.reviewId;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/review?id=${reviewId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setReview(data.review);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (reviewId) {
      fetchData();
    }
  }, [reviewId]);

  useEffect(() => {
    if (review) {
      setShowId(review.showId);
      setUserId(review.userId);
    }
  }, [review]);

  useEffect(() => {
    const fetchShowData = async () => {
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
      fetchShowData();
    }
  }, [showId]);

  useEffect(() => {
    const fetchUserData = async () => {
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
      fetchUserData();
    }
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!review) return <p>No review found!</p>;

  return (
    <div>
      <Link href={`/show/${showId}`}>
        <div className="border border-cyan-400 m-4 w-1/3">
          <h1>{show ? show.title : null}</h1>
        </div>
      </Link>
      <Link href={`/user/${userId}`}>
        <div className="border border-cyan-400 m-4 w-1/3">
          <h1>{user ? user.username : null}</h1>
        </div>
      </Link>
      <div className="border border-cyan-400 m-4 w-1/3">
        <h1>{review.rating}</h1>
      </div>
      <div className="border border-cyan-400 m-4 w-1/3">
        <h1>{review.text}</h1>
      </div>
      <div className="border border-cyan-400 m-4 w-1/3">
        <h1>{review.createdAt}</h1>
      </div>
      <div className="border border-cyan-400 m-4 w-1/3">
        <h1>{review.reactOnReviews.length} reacts</h1>
      </div>
      <div className="border border-cyan-400 m-4 w-1/3">
        <h1>{review.CommentOnReview.length} comments</h1>
      </div>
    </div>
  );
}
