"use client";

import React, { useState, useEffect } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import Link from "next/link";

const CommentListItem = ({ comment }) => {
  const userId = comment.userId;
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const deleteReview = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/commentonreview",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ commentOnReviewID: id }),
        }
      );

      const data = await response.json();
      console.log(data);
      window.location.reload();
    } catch (error) {
      console.error("There was an error deleting the comment", error);
      alert("There was an error deleting the comment");
    }
  };

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
    <div className="my-2 hover:border border-cyan-400">
      <h1 className="font-bold">{user.username}</h1>
      <div className="flex w-full">
        <Link href={`/user/${user.id}`}>
          <h1 className="flex-1">{comment.text}</h1>
        </Link>
        <div
          className="ml-auto p-4 bg-blue-500"
          onClick={() => deleteReview(comment.id)}
        >
          <FaRegTrashCan />
        </div>
      </div>
    </div>
  );
};

export default CommentListItem;
