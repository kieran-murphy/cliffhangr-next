"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const ReactListItem = ({ react }) => {
  const userId = react.userId;
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const reactDict = {
    LIKE: "👍",
    LOVE: "❤️",
    LAUGH: "😂",
    ANGRY: "😡",
    WOW: "😮",
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
    <Link href={`/user/${user.id}`}>
      <div className="my-2 hover:border border-cyan-400">
        <h1 className="font-bold">
          {user.username} - {reactDict[react.react]}
        </h1>
      </div>
    </Link>
  );
};

export default ReactListItem;
