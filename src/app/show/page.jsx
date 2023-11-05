"use client";

import { useState, useEffect } from "react";

import ShowListItem from "@/components/ShowListItem";

export default function Home() {
  const [shows, setShows] = useState([]);

  const getShows = async () => {
    const RequestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch("/api/show", RequestOptions);
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

  useEffect(() => {
    const fetchShows = async () => {
      const shows = await getShows();
      setShows(shows);
    };
    fetchShows();
  }, []);

  return (
    <div>
      {shows?.map((show) => {
        return <ShowListItem key={show.id} show={show} />;
      })}
    </div>
  );
}
