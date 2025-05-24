"use client";

import { useState, useEffect } from "react";
import ShowListItem from "@/components/ShowListItem";
import ShowSearchBar from "@/components/ShowSearchBar";
import { getErrorMessage } from "@/utils/error";

import type { ShowType } from "@/types/show";

type ShowApiResponse = {
  shows: ShowType[];
};

const ShowList = (): React.JSX.Element => {
  const [shows, setShows] = useState<ShowType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const showsPerPage = 8;

useEffect(() => {
  let isMounted = true;

  const getShows = async (): Promise<ShowType[]> => {
    try {
      const encoded = encodeURIComponent(searchTerm);
      const response = await fetch(`/api/show?search=${encoded}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Fetch failed:", response.status, response.statusText, errorText);
        return [];
      }

      const data: ShowApiResponse = await response.json();
      return data.shows;
    } catch (error) {
      console.error("Unexpected error fetching shows:", getErrorMessage(error));
      return [];
    }
  };

  const fetchShows = async () => {
    const shows: ShowType[] = await getShows();
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
    <div className="w-full md:w-1/2 mx-auto flex flex-col place-content-center">
      <ShowSearchBar setSearchTerm={setSearchTerm} />
      <div className="m-4">
        {currentShows.map((show: ShowType) => (
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
    </div>
  );
}

export default ShowList;