"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import DisplayRating from "@/components/DisplayRating";
import { getErrorMessage } from "@/utils/error";
import "./Review.css";

import type { ReactType } from "@/types/reactOnReview";
import type { ReviewType } from "@/types/review";

type ReviewClientProps = {
  review: ReviewType
}

type Reacts = "LIKE" | "LOVE" | "LAUGH" | "ANGRY" | "WOW" | null;

const ReviewClient = ({ review }: ReviewClientProps): React.JSX.Element => {
  const [commentText, setCommentText] = useState("");
  const [commentInput, setCommentInput] = useState(false);
  const [reactionsExpanded, setReactionsExpanded] = useState(false);
  const [userReact, setUserReact] = useState<Reacts>(null);
  const [userReactID, setUserReactID] = useState<string | null>(null);

  const emojiMap = {
    LIKE: "👍",
    LOVE: "😍",
    LAUGH: "😂",
    WOW: "😮",
    ANGRY: "😡",
  };

  const reactsDict = {
    LIKE: ["LIKE", "👍"],
    LOVE: ["LOVE", "😍"],
    LAUGH: ["LAUGH", "😂"],
    ANGRY: ["ANGRY", "😡"],
    WOW: ["WOW", "😮"],
  };

  const { data: session } = useSession();
  const sessionUserID = session?.user?.id || null;

  const router = useRouter()

  useEffect(() => {
    if (sessionUserID) {
      if (review) {
        const matchingReact = review.reactOnReviews.find(
          (element) => element.userId === sessionUserID
        );
        if (matchingReact) {
          setUserReact(matchingReact.react);
          setUserReactID(matchingReact.id);
        }
      }
    }
  }, [review, sessionUserID]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  }

  const addReact = async (react: string) => {
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
        console.error("There was an error deleting the reaction", getErrorMessage(error));
        alert("There was an error deleting the reaction");
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
            userId: sessionUserID,
            reviewId: review.id,
            react: react,
          },
        }),
      });
    } catch (error) {
      console.error("There was an error adding the reaction", getErrorMessage(error));
      alert("There was an error adding the reaction");
    }
    window.location.reload();
  };

  const addReviewComment = async (commentText: string) => {
    try {
      await fetch("/api/commentonreview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentOnReview: {
            userId: sessionUserID,
            reviewId: review.id,
            text: commentText,
          },
        }),
      });
    } catch (error) {
      console.error("There was an error adding the comment", getErrorMessage(error));
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
        body: JSON.stringify({ reviewID: review.id }),
      });
    } catch (error) {
      console.error("There was an error deleting the review", getErrorMessage(error));
      alert("There was an error deleting the review");
    }
    router.push(`/show/${review.show.id}`);
  };

  // Handle loading and error states
  if (!review) return <p>No review found!</p>;

  // Render the show title conditionally
  return (
    <div className="flex flex-col items-center m-4">
      <div className="flex flex-col items-center text-center">
        <h3 className="text-2xl font-bold mr-4">
          {review.show?.title || "Title not available"}
        </h3>
        <DisplayRating rating={review.rating} size={10} />
      </div>
      <div className="divider"></div>
      <div>
        <h3 className="text-left opacity-70 mb-2 italic">{review.user.username}:</h3>
        <div className="text-left p-2 h-20 mx-auto card bg-base-200 rounded-lg">
          {review.text}
        </div>
      </div>

      <div className="divider"></div>

      <h3 className="text-md font-bold">Reacts</h3>
      {reactionsExpanded ? (
        <div className="mt-4">
          {review.reactOnReviews.map((react) => {
            return (
              <div key={react.id}>
                {emojiMap[react.react]} - {react.user.username}
              </div>
            );
          })}
        </div>
      ) : (
        review.reactOnReviews.length > 0 && (
          <div className="flex flex-col place-items-center w-1/2">
            <button
              className="btn w-full"
              id="see-reacts"
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
            <button
              key={key}
              onClick={() => addReact(label)}
              className="btn text-xl mx-1"
            >
              {emoji}
            </button>
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
          {sessionUserID === review.userId && (
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
              <div className="flex flex-row place-content-between" id="comment">
                <div>
                  <Link href={`/user/${comment.userId}`}>
                    <h3 className="user">{comment.user.username}</h3>
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

export default ReviewClient;