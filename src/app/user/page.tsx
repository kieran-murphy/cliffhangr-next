"use client";

import React, { useEffect, useState } from "react";
import UserListItem from "@/components/UserListItem";
import UserSearchBar from "@/components/UserSearchBar";

import type { User as UserType } from "@/types/user";

const UserList = (): React.JSX.Element => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  useEffect(() => {
    let isMounted = true;

    const getUsers = async () => {
      // Encode the search term to handle special characters
      const encoded = encodeURIComponent(searchTerm)
      try {
        const response = await fetch(`/api/user?search=${encoded}`);
        if (!response.ok) throw new Error("Failed to fetch search results");
        const data = await response.text();
        const f = JSON.parse(data);
        return f.users;
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } 
    };

    const fetchUsers = async () => {
      const users = await getUsers();
      if (isMounted) {
        setUsers(users);
      }
    };

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, [searchTerm]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const nextPage = () => {
    if (currentPage < Math.ceil(users.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (error) return <p>Error: {error?.message ?? "User not found"}</p>;

  return (
    <div className="w-full md:w-1/2 mx-auto flex flex-col place-content-center">
      <UserSearchBar setSearchTerm={setSearchTerm} />
      <div className="m-4">
        {currentUsers.map((user: UserType) => (
          <UserListItem key={user.id} user={user} />
        ))}
      </div>
      <div className="flex flex-row place-content-between m-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="btn mx-1"
        >
          {"< Prev"}
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(users.length / usersPerPage)}
          className="btn mx-1"
        >
          {"Next >"}
        </button>
      </div>
    </div>
  );
}

export default UserList;