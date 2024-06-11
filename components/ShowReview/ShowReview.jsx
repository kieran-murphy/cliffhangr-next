import React, { useState, useEffect } from "react";
import Image from "next/image";
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

  const emojiMap = {
    LIKE: "👍",
    LOVE: "😍",
    LAUGH: "😂",
    WOW: "😮",
    ANGRY: "😡",
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

  function handleChange(event) {
    setCommentText(event.target.value);
  }

  return (
    review !== null && (
      <div className="my-4 pt-1 text-center h-10 ">
        <label
          htmlFor={review.text}
          className="btn modal-button flex flex-row place-content-evenly"
        >
          <h1 className="font-bold">{review.username}</h1>
          <h1>{review.rating}⭐</h1>
          {/* {review.text.length > 16 ? (
            <h1>{review.text.substring(0, 16)}...</h1>
          ) : (
            <h1>{review.text}</h1>
          )} */}
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
                  onClick={() => setReactionsExpanded(false)}
                >
                  {review.reactOnReviews.map((react) => {
                    return (
                      <div key={react.user}>
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
              <div className="flex flex-row items-center">
                <button
                  onClick={() => addReaction(user, "👍", review._id)}
                  className="btn text-red-600 text-xl"
                >
                  👍
                </button>
                <button
                  onClick={() => addReaction(user, "😍", review._id)}
                  className="btn text-green-500 text-xl"
                >
                  😍
                </button>
                <button
                  onClick={() => addReaction(user, "😂", review._id)}
                  className="btn text-red-600 text-xl"
                >
                  😂
                </button>
                <button
                  onClick={() => addReaction(user, "😮", review._id)}
                  className="btn text-red-600 text-xl"
                >
                  😮
                </button>

                <button
                  onClick={() => addReaction(user, "😡", review._id)}
                  className="btn text-red-600 text-xl"
                >
                  😡
                </button>
              </div>
              <div className="divider"></div>
              <br />
              <h3 className="text-md font-bold">Comments</h3>
              {review.CommentOnReview.length === 0 ? (
                <div className="flex flex-col place-items-center">
                  {commentInput ? (
                    <div className="flex flex-col place-items-center">
                      <textarea
                        className="textarea textarea-primary my-2"
                        value={commentText}
                        onChange={handleChange}
                        placeholder="Your comment here"
                      ></textarea>
                      <button
                        className="btn w-full"
                        onClick={() => {
                          addReviewComment(user, commentText, review._id);
                          setCommentInput(false);
                        }}
                      >
                        Add
                      </button>
                    </div>
                  ) : (
                    <div>
                      <h3>No comments yet. Add one!</h3>
                      <button
                        className="btn w-full"
                        onClick={() => setCommentInput(true)}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {review.CommentOnReview.map((comment) => (
                    <div className="w-full my-2" key={comment.id}>
                      <div className="divider"></div>
                      <div className="flex flex-row place-content-between">
                        <div className="comment-box">
                          <h3 className="user">{comment.username}</h3>
                          <h3 className="comment">{comment.text}</h3>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    className="btn w-full my-4"
                    onClick={() => {
                      addReviewComment(user, commentText, review._id);
                      setCommentInput(false);
                    }}
                  >
                    Add
                  </button>
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
