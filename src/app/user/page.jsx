"use client";

import { useState, useEffect } from "react";

import MainLayout from "../layout/main-layout";
import UserListItem from "@/components/UserListItem";
import UserSearchBar from "@/components/UserSearchBar";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      const RequestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(
        `/api/user?search=${searchTerm}`,
        RequestOptions
      );
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

    const fetchUsers = async () => {
      const users = await getUsers();
      setUsers(users);
    };
    fetchUsers();
  }, [searchTerm]);

  return (
    <MainLayout>
      <UserSearchBar setSearchTerm={setSearchTerm} />

      <div>
        {users?.map((user) => {
          return <UserListItem key={user.id} user={user} />;
        })}
      </div>
    </MainLayout>
  );
}
