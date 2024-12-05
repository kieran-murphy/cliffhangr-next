"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import DisplayRating from "@/components/DisplayRating";
import "@/components/ShowReview/ShowReview.css";

export default function Home({ params }) {
  const [commentText, setCommentText] = useState("");
  const [commentInput, setCommentInput] = useState(false);
  const [reactionsExpanded, setReactionsExpanded] = useState(false);
  const [reacts, setReacts] = useState([]);
  const [review, setReview] = useState(null);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!review) return <p>No review found!</p>;

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center text-center">
        <h3 className="text-2xl font-bold mr-4">{review.username}</h3>
        <h3 className="text-2xl font-bold mr-4">{sessionUserID}</h3>
        <DisplayRating rating={review.rating} />
      </div>
      <h1 className="my-2">{review.time}</h1>
      <div className="text-left p-2 h-20 w-full card bg-base-200 rounded-lg">
        {review.text}
      </div>
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
        <div className="mt-4" onClick={() => setReactionsExpanded(true)}>
          {reacts.slice(0, 3).map((react) => {
            return react;
          })}
          {review.reactOnReviews.length}
        </div>
      )}

      <div className="divider"></div>
      <br />
      <h3 className="text-md font-bold">React</h3>
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
              className="btn text-xl"
              style={{ boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)" }}
            >
              {emoji}
            </button>
          ) : (
            <button
              key={key}
              onClick={() => addReact(label)}
              className="btn text-xl"
            >
              {emoji}
            </button>
          )
        )}
      </div>

      <div className="divider"></div>
      <br />
      <h3 className="text-md font-bold">Comments</h3>
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
              <h3 className="m-4">No comments yet. Add one!</h3>
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
                <div className="comment-box">
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
        </div>
      )}
    </div>
  );
}
