"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import DisplayRating from "@/components/DisplayRating";
import "./Review.css";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Home({ params }) {
  const [commentText, setCommentText] = useState("");
  const [commentInput, setCommentInput] = useState(false);
  const [reactionsExpanded, setReactionsExpanded] = useState(false);
  const [review, setReview] = useState(null);
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userReact, setUserReact] = useState(null);
  const [userReactID, setUserReactID] = useState(null);

  const emojiMap = {
    LIKE: "👍",
    LOVE: "😍",
    LAUGH: "😂",
    WOW: "😮",
    ANGRY: "😡",
  };

  const reactsDict = {
    LIKE: ["LIKE", "👍"],
    LOVE: ["LOVE", "❤️"],
    LAUGH: ["LAUGH", "😂"],
    ANGRY: ["ANGRY", "😡"],
    WOW: ["WOW", "😮"],
  };

  const { data: session } = useSession(); // Also get status to check loading state

  const reviewId = params.reviewId;
  const user = session?.user || null; // Directly access user from session
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
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/show?id=${review.showId}`);
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
    if (review) {
      fetchData();
    }
  }, [review]);

  useEffect(() => {
    if (user) {
      if (review) {
        const userId = user.id;
        const matchingReact = review.reactOnReviews.find(
          (element) => element.userId === userId
        );
        if (matchingReact) {
          setUserReact(matchingReact.react);
          setUserReactID(matchingReact.id);
        }
      }
    }
  }, [review, user]);

  // Ensure data fetching is correct
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/show?id=${params.showId}`);
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

    if (params.showId) {
      fetchData();
    }
  }, [params.showId]);

  function handleChange(event) {
    setCommentText(event.target.value);
  }

  const addReact = async (react) => {
    if (userReact) {
      try {
        await fetch("/api/reactonreview", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reactOnReviewID: userReactID }),
        });
      } catch (error) {
        console.error("There was an error deleting the review", error);
        alert("There was an error deleting the review");
      }
    }
    try {
      await fetch("/api/reactonreview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reactOnReview: {
            userId: user.id,
            reviewId: reviewId,
            react: react,
            username: user.name,
          },
        }),
      });
    } catch (error) {
      console.error("There was an error adding the review", error);
      alert("There was an error adding the review");
    }
    window.location.reload();
  };

  const addReviewComment = async (comment) => {
    try {
      await fetch("/api/commentonreview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentOnReview: {
            userId: user.id,
            username: user.name,
            reviewId: reviewId,
            text: comment,
          },
        }),
      });
    } catch (error) {
      console.error("There was an error adding the comment", error);
      alert("There was an error adding the comment");
    }
    window.location.reload();
  };

  const deleteReview = async () => {
    try {
      await fetch("/api/review", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviewID: reviewId }),
      });
    } catch (error) {
      console.error("There was an error deleting the review", error);
      alert("There was an error deleting the review");
    }
    window.location.reload();
  };

  // Handle loading and error states
  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error.message}</p>;
  if (!show) return <p>No show found!</p>;

  if (!review) return <p>No review found!</p>;

  // Render the show title conditionally
  return (
    <div className="flex flex-col items-center m-4">
      <div className="flex flex-col items-center text-center">
        {/* <h3 className="text-2xl font-bold mr-4">{review.username}</h3> */}
        <h3 className="text-2xl font-bold mr-4">
          {show?.title || "Title not available"}
        </h3>
        <DisplayRating rating={review.rating} />
      </div>
      <div className="divider"></div>
      <div>
        <h3 className="text-left opacity-70 mb-2 italic">{review.username}:</h3>
        <div className="text-left p-2 h-20 mx-auto card bg-base-200 rounded-lg">
          {review.text}
        </div>
      </div>

      <div className="divider"></div>

      <h3 className="text-md font-bold">Reacts</h3>
      {reactionsExpanded ? (
        <div className="mt-4">
          {review.reactOnReviews.map((react, index) => {
            return (
              <div key={`${react.user}-${index}`}>
                {emojiMap[react.react]} - {react.username}
              </div>
            );
          })}
        </div>
      ) : (
        review.reactOnReviews.length > 0 && (
          <div className="flex flex-col place-items-center w-1/2">
            <button
              className="btn w-full"
              onClick={() => setReactionsExpanded(true)}
            >
              See {review.reactOnReviews.length} reacts
            </button>
          </div>
        )
      )}
      <br />

      <div
        className="flex flex-row items-center"
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {Object.entries(reactsDict).map(([key, [label, emoji]]) =>
          label === userReact ? (
            <button
              key={key}
              onClick={() => deleteReact(label)}
              className="btn text-xl mx-1"
              style={{ boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)" }}
            >
              {emoji}
            </button>
          ) : (
            <button
              key={key}
              onClick={() => addReact(label)}
              className="btn text-xl mx-1"
            >
              {emoji}
            </button>
          )
        )}
      </div>

      <div className="divider"></div>
      <br />
      <h3 className="text-md font-bold">
        {review.CommentOnReview.length} Comments
      </h3>
      {review.CommentOnReview.length === 0 ? (
        <div className="flex flex-col place-items-center">
          {commentInput ? (
            <div className="flex flex-col place-items-center">
              <textarea
                className="textarea textarea-primary my-4"
                value={commentText}
                onChange={handleChange}
                placeholder="Your comment here"
              ></textarea>
              <button
                className="btn w-full"
                onClick={() => {
                  addReviewComment(commentText);
                  setCommentInput(false);
                }}
              >
                Add
              </button>
            </div>
          ) : (
            <div>
              <h3 className="m-4 italic">No comments yet. Add one!</h3>
              <button
                className="btn w-full"
                onClick={() => setCommentInput(true)}
              >
                +
              </button>
            </div>
          )}
          {user.id === review.userId && (
            <button
              className="btn btn-outline btn-error w-full my-4"
              onClick={() => {
                deleteReview();
              }}
            >
              Delete Review
            </button>
          )}
        </div>
      ) : (
        <div>
          {review.CommentOnReview.map((comment) => (
            <div className="w-full my-2" key={comment.id}>
              <div className="divider"></div>
              <div className="flex flex-row place-content-between">
                {/* <div className="comment-box"> */}
                <div>
                  <Link href={`/user/${comment.userId}`}>
                    <h3 className="user">{comment.username}</h3>
                    <h3 className="comment">{comment.text}</h3>
                  </Link>
                </div>
              </div>
            </div>
          ))}
          <div className="flex flex-col place-items-center">
            <textarea
              className="textarea textarea-primary my-4 w-full"
              value={commentText}
              onChange={handleChange}
              placeholder="Your comment here"
            ></textarea>
            <button
              className="btn btn-primary w-full"
              onClick={() => {
                addReviewComment(commentText);
                setCommentInput(false);
              }}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
