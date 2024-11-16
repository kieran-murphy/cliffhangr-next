import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import DisplayRating from "../DisplayRating";
import "./ShowReview.css";

import { FaRegTimesCircle, FaCaretUp, FaCaretDown } from "react-icons/fa";
import { ImStarEmpty, ImStarFull, ImHappy, ImClock } from "react-icons/im"; //https://react-icons.github.io/react-icons/icons?name=im

const ShowReview = ({ user, reviewId, show }) => {
  const [commentText, setCommentText] = useState("");
  const [commentInput, setCommentInput] = useState(false);
  const [reactionsExpanded, setReactionsExpanded] = useState(false);
  const [reacts, setReacts] = useState([]);
  const [review, setReview] = useState(null);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/review?id=${reviewId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setReview(data.review);
      } catch (error) {
        setError(error);
      }
    };

    if (reviewId) {
      fetchData();
    }
  }, [reviewId]);

  useEffect(() => {
    if (review !== null) {
      let arr = [];
      review.reactOnReviews.forEach((el) => {
        const emoji = emojiMap[el.react];
        if (emoji) {
          arr.push(emoji);
        }
      }); //add function here to determine which emoji to push
      let counts = arr.reduce((counts, num) => {
        counts[num] = (counts[num] || 0) + 1;
        return counts;
      }, {});
      arr.sort(function (p0, p1) {
        return counts[p1] - counts[p0];
      });
      arr = Array.from(new Set(arr));
      setReacts(arr);
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

  return (
    review !== null && (
      <div className="my-4 pt-1 text-center h-10 ">
        <label
          htmlFor={review.text}
          className="btn modal-button flex flex-row place-content-evenly"
        >
          <h1 className="font-bold">{review.username}</h1>
          <h1>{review.rating}⭐</h1>
          <div className="flex flex-row place-items-center">
            <h1>{review.upvotes}</h1>
            {reacts.slice(0, 3).map((react) => {
              return <h1 key={react}>{react}</h1>;
            })}
            {review.reactOnReviews.length}
          </div>
        </label>
        <input type="checkbox" id={review.text} className="modal-toggle" />
        <label htmlFor={review.text} className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center text-center">
                <h3 className="text-2xl font-bold mr-4">{review.username}</h3>
                <DisplayRating rating={review.rating} />
              </div>
              <h1 className="my-2">{review.time}</h1>
              <div className="text-left p-2 h-20 w-full card bg-base-200 rounded-lg">
                {review.text}
              </div>
              {reactionsExpanded ? (
                <div
                  className="mt-4"
                  // onClick={() => setReactionsExpanded(false)}
                >
                  {review.reactOnReviews.map((react, index) => {
                    return (
                      <div key={`${react.user}-${index}`}>
                        {emojiMap[react.react]} - {react.username}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div
                  className="mt-4"
                  onClick={() => setReactionsExpanded(true)}
                >
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
          </label>
        </label>
      </div>
    )
  );
};

export default ShowReview;
