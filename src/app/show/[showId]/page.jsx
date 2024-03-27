"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import FavoriteListItem from "@/components/ShowFavoriteListItem";
import ReviewListItem from "@/components/ReviewListItem";

export default function Home({ params }) {
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const [alreadyFavorited, setAlreadyFavorited] = useState(false);
  const [userReviewID, setUserReviewID] = useState(null);
  const [userFavID, setUserFavID] = useState(null);

  const { data: session } = useSession(); // Also get status to check loading state
  const router = useRouter();

  const showId = params.showId;
  const userID = session?.user?.id || null; // Directly access ID from session

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/show?id=${showId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setShow(data.show);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (showId) {
      fetchData();
    }
  }, [showId]);

  useEffect(() => {
    checkReviewStatus();
    checkFavStatus();
  }, [show, userID]);

  const [formData, setFormData] = useState({
    text: "",
    rating: 0,
  });

  const checkReviewStatus = () => {
    if (show) {
      if (userID) {
        const matchingReview = show.reviews.find(
          (element) => element.userId === userID
        );
        if (matchingReview) {
          setUserReviewID(matchingReview.id); // This will print the matching review object
          setAlreadyReviewed(true);
        } else {
          setAlreadyReviewed(false);
        }
      }
    }
  };

  const checkFavStatus = () => {
    if (show) {
      if (userID) {
        const matchingFav = show.favoritedBy.find(
          (element) => element.userId === userID
        );
        if (matchingFav) {
          setUserFavID(matchingFav.id); // This will print the matching review object
          setAlreadyFavorited(true);
        } else {
          setAlreadyFavorited(false);
        }
      }
    }
  };

  const toggleFavorite = async () => {
    if (alreadyFavorited) {
      try {
        const response = await fetch("/api/favoriteshow", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ favoriteShowID: userFavID }),
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("There was an error deleting the favorite", error);
        alert("There was an error deleting the favorite");
      }
    } else {
      try {
        const response = await fetch("/api/favoriteshow", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            favoriteShow: {
              showId: showId,
              userId: userID,
            },
          }),
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("There was an error submitting the favorite", error);
        alert("There was an error submitting the favorite");
      }
    }
    window.location.reload();
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from event target
    setFormData({
      ...formData, // Spread existing formData
      [name]: value, // Update changed value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log("Form Data Submitted:", formData.text);

    // Here you could also send the formData to a server or perform other actions
    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          review: {
            text: formData.text,
            rating: Number(formData.rating),
            showId: showId,
            userId: userID,
          },
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setFormData({ text: "", rating: 0 });
        console.log(data);
        router.replace(`/review/${data.review.id}`);
      } else {
        alert("Submission failed");
      }
    } catch (error) {
      console.error("There was an error submitting the form data", error);
      alert("There was an error submitting the form data");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!show) return <p>No show found!</p>;

  return (
    <>
      <Link href={"/show"}>
        <div className="border border-grey-400 cursor-pointer m-4 w-1/3 opacity-80">
          <h1>{"<- Back to shows"}</h1>
        </div>
      </Link>
      <div>
        <Image src={show.image} width={500} height={500} alt={show.title} />
      </div>
      <div className="border border-cyan-400 m-4 w-1/3">
        <h1 className="font-bold">{show.title}</h1>
      </div>
      <div className="border border-cyan-400 m-4 w-1/3">
        <h1>{show.averageRating} average rating</h1>
      </div>
      <div className="border border-cyan-400 m-4 w-1/3">
        <h1>Released {show.year}</h1>
      </div>
      <div className="border border-cyan-400 m-4 w-1/3">
        <h1>{show.seasons} seasons</h1>
      </div>
      <div
        className="border border-cyan-400 cursor-pointer m-4 w-1/3"
        onClick={() => setShowFavorites(!showFavorites)}
      >
        {showFavorites ? (
          <div>
            <div
              className="my-2 hover:border border-cyan-400"
              onClick={() => setShowFavorites(!showFavorites)}
            >
              collapse
            </div>
            {show.favoritedBy.map((f) => (
              <FavoriteListItem key={f.id} favorite={f} />
            ))}
          </div>
        ) : (
          <h1>{show.favoritedBy.length} favorites</h1>
        )}
      </div>
      <div
        className="border border-cyan-400 cursor-pointer m-4 w-1/3"
        onClick={() => setShowReviews(!showReviews)}
      >
        {showReviews ? (
          <div>
            <div
              className="my-2 hover:border border-cyan-400"
              onClick={() => setShowReviews(!showReviews)}
            >
              collapse
            </div>
            {show.reviews.map((r) => (
              <div key={r.id}>
                <ReviewListItem review={r} />
              </div>
            ))}
          </div>
        ) : (
          <h1>{show.reviews.length} reviews</h1>
        )}
      </div>
      <div
        className="border border-cyan-400 m-4 w-1/3 cursor-pointer"
        onClick={toggleFavorite}
      >
        {alreadyFavorited ? (
          <h1 className="font-bold">Favorited ❤️</h1>
        ) : (
          <h1 className="font-bold">Click to Favorite </h1>
        )}
      </div>

      {alreadyReviewed ? (
        <Link href={`/review/${userReviewID}`}>
          <div className="border border-cyan-400 m-4 w-1/3">
            <h1 className="font-bold">{"See your review ->"}</h1>
          </div>
        </Link>
      ) : (
        <div className="border border-cyan-400 m-4 w-1/3">
          {showForm ? (
            <div>
              <div
                className="my-2 hover:border cursor-pointer border-cyan-400"
                onClick={() => setShowForm(!showForm)}
              >
                collapse
              </div>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="text" className="m-2 p-2">
                    Review:
                  </label>
                  <input
                    className="bg-black outline text-white"
                    type="text"
                    id="text"
                    name="text"
                    value={formData.text}
                    onChange={handleInputChange}
                  />
                  <br />
                  <br />
                  <label htmlFor="text" className="m-2 p-2">
                    Rating:
                  </label>
                  <input
                    className="bg-black outline text-white"
                    type="number"
                    id="rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  className="my-2 hover:border cursor-pointer border-cyan-400"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          ) : (
            <h1
              className="cursor-pointer"
              onClick={() => setShowForm(!showForm)}
            >
              Add a review
            </h1>
          )}
        </div>
      )}
    </>
  );
}
