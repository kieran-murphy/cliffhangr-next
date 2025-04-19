"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

import Rating from "@/components/Rating";
import ReviewConfirmation from "@/components/ReviewConfirmation";
import ShowReviewList from "./ShowReviewList";
import LoadingSpinner from "@/components/LoadingSpinner";

import {
  ImClock,
  ImPencil,
  ImPlay,
  ImHeart,
  ImHeartBroken,
} from "react-icons/im";

export default function ShowClient({ show, showId }) {
  const [loading, setLoading] = useState(true);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [avgScore, setAvgScore] = useState(0.0);
  const [alreadyFavorited, setAlreadyFavorited] = useState(false);
  const [alreadyInWatchlist, setAlreadyInWatchlist] = useState(false);
  const [userFavID, setUserFavID] = useState(null);
  const [userWatchlistID, setUserWatchlistID] = useState(null);
  const [reviewScore, setReviewScore] = useState(0);
  const [reviewComment, setReviewComment] = useState("");

  const { data: session } = useSession(); // Also get status to check loading state

  const user = session?.user || null; // Directly access user from session
  const userID = session?.user?.id || null; // Directly access ID from session

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const checkReviewStatus = () => {
    if (show) {
      if (userID) {
        const matchingReview = show.reviews.find(
          (element) => element.userId === userID
        );
        if (matchingReview) {
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
          setUserFavID(matchingFav.id);
          setAlreadyFavorited(true);
        } else {
          setAlreadyFavorited(false);
        }
      }
    }
  };

  const checkWatchlistStatus = () => {
    if (show) {
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

  const getAvgScore = (reviews) => {
    let avg = reviews.reduce((r, c) => r + c.rating, 0) / reviews.length;
    avg = avg.toFixed(2);
    setAvgScore(avg);
  };

  const addReview = async (text, reviewScore, show, user) => {
    const review = {
      userId: user.id,
      username: user.name,
      showId: show.id,
      title: show.title,
      rating: reviewScore,
      text: text,
    };
    // console.log(review);
    const RequestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        review: review,
      }),
    };
    await fetch(`/api/review`, RequestOptions)
      .then(async (res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text);
          });
        } else {
          return res.json();
        }
      })
      .catch((err) => {
        console.log("caught it!", err);
      });
  };

  const handleReviewChange = (event) => {
    setReviewComment(event.target.value);
  };


  if (!show) return <p>No show found!</p>;

  return (
    <div>
      <div className="min-h-60 flex justify-center m-4">
        <Image
          className="rounded-lg"
          src={show.image}
          alt={show.title}
          width={500}
          height={200}
        />
      </div>
      <div className="w-full md:w-1/2 mx-auto">
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

              {alreadyReviewed ? (
                <></>
              ) : (
                <label
                  htmlFor="my-modal"
                  className="btn btn-success w-full mt-4 gap-2"
                >
                  <ImPencil />
                  Write a Review
                </label>
              )}

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
              <Rating
                reviewScore={reviewScore}
                setReviewScore={setReviewScore}
              />

              <label
                className="btn btn-success mt-4"
                htmlFor="my-modal"
                onClick={async () => {
                  await addReview(reviewComment, reviewScore, show, user);
                  setReviewComment("");
                  setReviewScore(0);
                  window.location.reload();
                }}
              >
                Create
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
