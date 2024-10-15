import React, { useState, useEffect } from "react";
import Link from "next/link";

const SmallUser = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {userId}</p>;
  if (!user) return <p>No user found!</p>;

  return (
    <Link href={`/user/${userId}`}>
      <button className="btn btn-active btn-neutral my-2 w-full">
        {user.username}
      </button>
    </Link>
  );
};

export default SmallUser;
