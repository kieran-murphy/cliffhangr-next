"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import FavoriteListItem from "@/components/ShowFavoriteListItem";
import Rating from "@/components/Rating";
import ReviewListItem from "@/components/ReviewListItem";
import ReviewConfirmation from "@/components/ReviewConfirmation";
import ShowReviewList from "@/components/ShowReviewList";

import {
  ImStarEmpty,
  ImStarFull,
  ImClock,
  ImPencil,
  ImPlay,
  ImHeart,
  ImHeartBroken,
} from "react-icons/im";

export default function Home({ params }) {
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [avgScore, setAvgScore] = useState(0.0);
  const [alreadyFavorited, setAlreadyFavorited] = useState(false);
  const [alreadyInWatchlist, setAlreadyInWatchlist] = useState(false);
  const [userReviewID, setUserReviewID] = useState(null);
  const [userFavID, setUserFavID] = useState(null);
  const [userWatchlistID, setUserWatchlistID] = useState(null);
  const [reviewScore, setReviewScore] = useState(0);
  const [reviewComment, setReviewComment] = useState("");

  const { data: session } = useSession(); // Also get status to check loading state
  const router = useRouter();

  const showId = params.showId;
  const user = session?.user || null; // Directly access user from session
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
    checkWatchlistStatus();
  }, [show, userID]);

  useEffect(() => {
    if (show) {
      getAvgScore(show.reviews, setAvgScore);
    }
  }, [show]);

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

  const checkWatchlistStatus = () => {
    if (show) {
      console.log("this is a show", show);
      if (userID) {
        const matchingWatchlist = show.watchListedBy.find(
          (element) => element.userId === userID
        );
        if (matchingWatchlist) {
          setUserWatchlistID(matchingWatchlist.id); // This will print the matching review object
          setAlreadyInWatchlist(true);
        } else {
          setAlreadyInWatchlist(false);
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

  const toggleWatchlist = async () => {
    if (alreadyInWatchlist) {
      try {
        const response = await fetch("/api/watchlistShow", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ WatchlistShowID: userWatchlistID }),
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("There was an error deleting the favorite", error);
        alert("There was an error deleting the favorite");
      }
    } else {
      try {
        const response = await fetch("/api/watchlistShow", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            watchlistShow: {
              showId: showId,
              userId: userID,
            },
          }),
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("There was an error updating the watchlist", error);
        alert("There was an error updating the watchlist");
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

  const getAvgScore = (reviews) => {
    let avg = reviews.reduce((r, c) => r + c.rating, 0) / reviews.length;
    avg = avg.toFixed(2);
    setAvgScore(avg);
  };

  const addReview = (text, reviewScore, show, user) => {
    // let reviewTime = new Date().toLocaleDateString();
    // const review = {
    //   userId: user._id,
    //   username: user.name,
    //   showId: show._id,
    //   title: show.title,
    //   score: reviewScore,
    //   text: text,
    //   reacts: [],
    //   comments: [],
    //   time: reviewTime,
    // };
    // // console.log(review);
    // const RequestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     review: review,
    //   }),
    // };
    // fetch(`/reviews/add`, RequestOptions)
    //   .then((res) => {
    //     if (!res.ok) {
    //       return res.text().then((text) => {
    //         throw new Error(text);
    //       });
    //     } else {
    //       return res.json();
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("caught it!", err);
    //   });
    // alert(text);
  };

  const handleReviewChange = (event) => {
    setReviewComment(event.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!show) return <p>No show found!</p>;

  return (
    <div>
      <div className="min-h-60">
        <Image src={show.image} alt={show.title} width={500} height={200} />
      </div>

      <div className="mx-6">
        <div className="my-4 flex flex-row place-content-between">
          <div>
            <h1 className="font-bold text-3xl">{show.title}</h1>
            <h1 className="font-light text-lg">
              {show.seasons} season
              {show.seasons > 1 ? "s" : ""}
            </h1>
          </div>
          <div className="flex flex-col text-center">
            <h1 className="font-bold text-2xl">2006</h1>
            <a
              href={`https://www.youtube.com/results?sp=mAEA&search_query=${show.title}+trailer`}
            >
              <button className="btn btn-sm btn-info gap-2">
                <div className="flex flex-row">
                  <ImPlay className="mr-1" />
                  Trailer
                </div>
              </button>
            </a>
          </div>
        </div>
        <p className=" my-8 italic font-light">{show.desc}</p>
        <div className="flex w-full place-content-center ">
          <div className="flex flex-col w-full place-content-between">
            {show.reviews.length > 0 ? (
              <h1 className="font-light text-lg text-center">
                {avgScore} out of 5 stars ⭐
              </h1>
            ) : null}

            <label
              htmlFor="my-modal"
              className="btn btn-success w-full mt-4 gap-2"
            >
              <ImPencil />
              Write a Review
            </label>

            <button
              className="btn btn-primary gap-2 mt-3 font-bold"
              onClick={() => {
                toggleFavorite();
                setLoading(true);
              }}
            >
              {alreadyFavorited ? (
                <>
                  <h1>
                    <ImHeartBroken />
                  </h1>
                  Unfavorite
                </>
              ) : (
                <>
                  <h1>
                    <ImHeart />
                  </h1>
                  Favorite
                </>
              )}
            </button>
            <button
              className="btn gap-2 mt-3 font-bold"
              onClick={() => {
                toggleWatchlist();
                setLoading(true);
              }}
            >
              {alreadyInWatchlist ? (
                <>
                  <h1>
                    <ImClock />
                  </h1>
                  Remove from watchlist
                </>
              ) : (
                <>
                  <h1>
                    <ImClock />
                  </h1>
                  Add to watchlist
                </>
              )}
            </button>
          </div>
        </div>

        {show.reviews ? <ShowReviewList user={user} show={show} /> : null}
      </div>

      {confirm ? <ReviewConfirmation setConfirm={setConfirm} /> : null}

      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-2xl font-bold text-center">Create Review</h3>
          <div className="flex flex-col place-content-between">
            <h3 className="mt-4">Review:</h3>
            <textarea
              value={reviewComment}
              onChange={handleReviewChange}
              className="textarea textarea-primary"
              placeholder="Your review here"
            ></textarea>

            <h3 className="mt-4">Rating:</h3>
            <Rating setReviewScore={setReviewScore} />

            <label
              className="btn btn-success mt-4"
              htmlFor="my-modal"
              onClick={() => {
                addReview(reviewComment, reviewScore, show, user);
                setReviewComment("");
                setReviewScore(0);
                setLoading(true);
              }}
            >
              Create
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
