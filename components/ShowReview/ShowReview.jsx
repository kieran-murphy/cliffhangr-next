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

  return (
    review !== null && (
      <Link href={`/review/${reviewId}`}>
        <div className="my-4 pt-1 h-10 ">
          <div className="btn modal-button flex flex-row place-content-between p-4">
            <h1 className="font-bold">{review.username}</h1>
            <h1>{review.rating}⭐</h1>
          </div>
        </div>
      </Link>
    )
  );
};

export default ShowReview;
