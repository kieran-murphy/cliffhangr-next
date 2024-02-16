"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import ReviewCommentListItem from "@/components/ReviewCommentListItem";
import ReactListItem from "@/components/ReactListItem";

export default function Home({ params }) {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showId, setShowId] = useState("");
  const [userId, setUserId] = useState("");
  const [show, setShow] = useState(null);
  const [user, setUser] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [showReacts, setShowReacts] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [isUser, setIsUser] = useState(false);

  const { data: session } = useSession(); // Also get status to check loading state
  const router = useRouter();

  const reviewId = params.reviewId;
  const sessionUserID = session?.user?.id || null; // Directly access ID from session

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
      if (review.userId === sessionUserID) {
        setIsUser(true);
      }
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

  const deleteReview = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/review", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviewID: reviewId }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("There was an error deleting the review", error);
      alert("There was an error deleting the review");
    }
    router.replace(`/show/${showId}`);
  };

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
        <h1>{review.rating} ⭐</h1>
      </div>
      <div className="border border-cyan-400 m-4 w-1/3">
        <h1>{review.text}</h1>
      </div>
      <div className="border border-cyan-400 m-4 w-1/3">
        <h1>{review.createdAt}</h1>
      </div>

      <div
        className="border border-cyan-400 cursor-pointer m-4 w-1/3"
        onClick={() => setShowReacts(!showReacts)}
      >
        {showReacts ? (
          <div>
            <div
              className="my-2 hover:border border-cyan-400"
              onClick={() => setShowReacts(!showReacts)}
            >
              collapse
            </div>
            {review.reactOnReviews.map((react) => (
              <ReactListItem key={react.id} react={react} />
            ))}
          </div>
        ) : (
          <h1>{review.reactOnReviews.length} reacts</h1>
        )}
      </div>

      <div
        className="border border-cyan-400 cursor-pointer m-4 w-1/3"
        onClick={() => setShowComments(!showComments)}
      >
        {showComments ? (
          <div>
            <div
              className="my-2 hover:border border-cyan-400"
              onClick={() => setShowComments(!showComments)}
            >
              collapse
            </div>
            {review.CommentOnReview.map((comment) => (
              <ReviewCommentListItem key={comment.id} comment={comment} />
            ))}
          </div>
        ) : (
          <h1>{review.CommentOnReview.length} comments</h1>
        )}
      </div>
      {isUser && (
        <div
          className="border border-cyan-400 cursor-pointer m-4 w-1/3"
          onClick={() => setShowDelete(!showDelete)}
        >
          {showDelete ? (
            <div>
              <div className="my-2">Are you sure?</div>
              <div
                className="my-2 hover:border border-cyan-400"
                onClick={deleteReview}
              >
                yes
              </div>
              <div
                className="my-2 hover:border border-cyan-400"
                onClick={() => setShowComments(!showDelete)}
              >
                no
              </div>
            </div>
          ) : (
            <h1>delete review?</h1>
          )}
        </div>
      )}
    </div>
  );
}
