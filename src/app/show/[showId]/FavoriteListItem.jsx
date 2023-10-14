"use client";

import React, { useState, useEffect } from "react";

const ShowListItem = ({ favorite }) => {
  const userId = favorite.userId;
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

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
    <div className="">
      <h1 className="text-bold">{user.username}</h1>
    </div>
  );
};

export default ShowListItem;
