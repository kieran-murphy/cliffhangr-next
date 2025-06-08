'use client';

import React, { useEffect, useState, ChangeEvent } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { ImClock, ImPencil, ImPlay, ImHeart, ImHeartBroken } from 'react-icons/im';
import Rating from '@/components/Rating';
import ReviewConfirmation from '@/components/ReviewConfirmation';
import LoadingSpinner from '@/components/LoadingSpinner';
import ShowReviewList from './ShowReviewList';

import type { ShowType } from '@/types/show';

type ShowClientProps = {
  show: ShowType;
};

const ShowClient = ({ show }: ShowClientProps): React.JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true);
  const [alreadyReviewed, setAlreadyReviewed] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [avgScore, setAvgScore] = useState<string>('0.0');
  const [alreadyFavorited, setAlreadyFavorited] = useState<boolean>(false);
  const [alreadyInWatchlist, setAlreadyInWatchlist] = useState<boolean>(false);
  const [userFavID, setUserFavID] = useState<string | null>(null);
  const [userWatchlistID, setUserWatchlistID] = useState<string | null>(null);
  const [reviewScore, setReviewScore] = useState<number>(0);
  const [reviewComment, setReviewComment] = useState<string>('');

  const { data: session, status } = useSession();
  const sessionUserID = session?.user?.id || null;

  useEffect(() => {
    if (status !== 'loading' && show) {
      setLoading(false);
    }
  }, [status, show]);

  useEffect(() => {
    checkReviewStatus();
    checkFavStatus();
    checkWatchlistStatus();
  }, [show, sessionUserID]);

  useEffect(() => {
    if (show?.reviews?.length) {
      const avg = (
        show.reviews.reduce((sum, review) => sum + review.rating, 0) / show.reviews.length
      ).toFixed(2);
      setAvgScore(avg);
    }
  }, [show]);

  const checkReviewStatus = () => {
    if (show) {
      if (sessionUserID) {
        const matchingReview = show.reviews.find((element) => element.userId === sessionUserID);
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
      if (sessionUserID) {
        const matchingFav = show.favoritedBy.find((element) => element.userId === sessionUserID);
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
      if (sessionUserID) {
        const matchingWatchlist = show.watchListedBy.find(
          (element) => element.userId === sessionUserID
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
        const response = await fetch('/api/favoriteshow', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ favoriteShowID: userFavID }),
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('There was an error deleting the favorite', error);
        alert('There was an error deleting the favorite');
      }
    } else {
      try {
        const response = await fetch('/api/favoriteshow', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            favoriteShow: {
              showId: show.id,
              userId: sessionUserID,
            },
          }),
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('There was an error submitting the favorite', error);
        alert('There was an error submitting the favorite');
      }
    }
    window.location.reload();
  };

  const toggleWatchlist = async () => {
    if (alreadyInWatchlist) {
      try {
        const response = await fetch('/api/watchlistshow', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ WatchlistShowID: userWatchlistID }),
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('There was an error updating the watchlist', error);
        alert('There was an error updating the watchlist');
      }
    } else {
      try {
        const response = await fetch('/api/watchlistshow', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            watchlistShow: {
              showId: show.id,
              userId: sessionUserID,
            },
          }),
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('There was an error updating the watchlist', error);
        alert('There was an error updating the watchlist');
      }
    }
    window.location.reload();
  };

  const addReview = async (text: string, reviewScore: number, show: ShowType) => {
    const review = {
      userId: sessionUserID,
      showId: show.id,
      title: show.title,
      rating: reviewScore,
      text: text,
    };
    // console.log(review);
    const RequestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
        console.log('caught it!', err);
      });
  };

  const handleReviewChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setReviewComment(event.target.value);
  };

  if (!show) return <p>No show found!</p>;

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="min-h-60 flex justify-center m-4">
        <Image
          className="rounded-lg"
          src={show.image}
          alt={show.title}
          width={500}
          height={200}
          priority
        />
      </div>
      <div className="w-full md:w-1/2 mx-auto">
        <div className="mx-6">
          <div className="my-4 flex flex-row place-content-between">
            <div>
              <h1 className="font-bold text-3xl">{show.title}</h1>
              <h1 className="font-light text-lg">
                {show.seasons} season
                {show.seasons > 1 ? 's' : ''}
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
          {/* <p className=" my-8 italic font-light">{show.desc}</p> */}
          <div className="flex w-full place-content-center ">
            <div className="flex flex-col w-full place-content-between">
              {show.reviews.length > 0 ? (
                <h1 className="font-light text-lg text-center">{avgScore} out of 5 stars ⭐</h1>
              ) : null}

              {alreadyReviewed ? (
                <></>
              ) : (
                <label htmlFor="my-modal" className="btn btn-success w-full mt-4 gap-2">
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
          {show.reviews ? <ShowReviewList sessionUserID={sessionUserID} show={show} /> : null}
        </div>

        {confirm ? <ReviewConfirmation setConfirm={setConfirm} /> : null}

        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box relative">
            <label htmlFor="my-modal" className="btn btn-sm btn-circle absolute right-2 top-2">
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
              <Rating reviewScore={reviewScore} setReviewScore={setReviewScore} />

              <label
                className="btn btn-success mt-4"
                htmlFor="my-modal"
                onClick={async () => {
                  await addReview(reviewComment, reviewScore, show);
                  setReviewComment('');
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
};

export default ShowClient;
