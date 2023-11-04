"use client";

import { useState, useEffect } from "react";

import UserListItem from "./UserListItem";

export default function Home() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const RequestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch("/api/user", RequestOptions);
    if (!response.ok) {
      console.log(response);
    }
    const data = await response.text();
    try {
      const f = JSON.parse(data);
      return f.users;
    } catch (error) {
      return error.message;
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setUsers(users);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      {users?.map((user) => {
        return <UserListItem key={user.id} user={user} />;
      })}
    </div>
  );
}
