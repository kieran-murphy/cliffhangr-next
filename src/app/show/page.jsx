"use client";

import { useState, useEffect } from "react";

import ShowListItem from "@/components/ShowListItem";
import ShowSearchBar from "@/components/ShowSearchBar";

export default function Home() {
  const [shows, setShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const showsPerPage = 8;

  useEffect(() => {
    let isMounted = true;
    const getShows = async () => {
      const RequestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(
        `/api/show?search=${searchTerm}`,
        RequestOptions
      );
      if (!response.ok) {
        console.log(response);
      }
      const data = await response.text();
      try {
        const f = JSON.parse(data);
        return f.shows;
      } catch (error) {
        return error.message;
      }
    };
    const fetchShows = async () => {
      const shows = await getShows();
      if (isMounted) {
        setShows(shows);
      }
    };
    fetchShows();
    return () => {
      isMounted = false;
    };
  }, [searchTerm]);

  const indexOfLastShow = currentPage * showsPerPage;
  const indexOfFirstShow = indexOfLastShow - showsPerPage;
  const currentShows = shows.slice(indexOfFirstShow, indexOfLastShow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < Math.ceil(shows.length / showsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <ShowSearchBar setSearchTerm={setSearchTerm} />
      <div className="m-4">
        {currentShows.map((show) => (
          <ShowListItem key={show.id} show={show} />
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
          disabled={currentPage === Math.ceil(shows.length / showsPerPage)}
          className="btn mx-1"
        >
          {"Next >"}
        </button>
      </div>
    </>
  );
}
