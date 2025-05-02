"use client";

import React, { useEffect, useState } from "react";

import UserListItem from "@/components/UserListItem";
import UserSearchBar from "@/components/UserSearchBar";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  useEffect(() => {
    let isMounted = true;

    const getUsers = async () => {
      const RequestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      // Encode the search term to handle special characters
      const encoded = encodeURIComponent(searchTerm)
      const response = await fetch(
        `/api/user?search=${encoded}`,
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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

  return (
    <div className="w-full md:w-1/2 mx-auto flex flex-col place-content-center">
      <UserSearchBar setSearchTerm={setSearchTerm} />
      <div className="m-4">
        {currentUsers.map((user) => (
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
