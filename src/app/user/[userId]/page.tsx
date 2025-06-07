'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { FaRegCheckSquare } from 'react-icons/fa';
import Image from 'next/image';
import { useUser } from '@/context/UserProvider';
import Favourites from './Favourites';
import ProfileReviews from './ProfileReviews';
import Watchlist from './Watchlist';
import SmallUser from '@/components/SmallUser';
import LoadingSpinner from '@/components/LoadingSpinner';

import type { UserType } from '@/types/user';

type UserParamsType = {
  userId: string;
};

type Tab = 'profile' | 'reviews' | 'watchlist' | 'favourites';

const UserPage = (): React.JSX.Element => {
  const [user, setUser] = useState<UserType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [avgScore, setAvgScore] = useState<number>(0);
  const [isFollower, setIsFollower] = useState<boolean>(false);
  const [isFollowerID, setIsFollowerID] = useState<string | null>(null);
  const [showFollowers, setShowFollowers] = useState<boolean>(false);
  const [showFollowing, setShowFollowing] = useState<boolean>(false);
  const [isUser, setIsUser] = useState<boolean>(false);
  const [tab, setTab] = useState<Tab>('profile');
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newUsername, setNewUsername] = useState<string>('');
  const [newImageUrl, setNewImageUrl] = useState<string>('');

  const { userId } = useParams() as UserParamsType;
  const { userInfo, setUserInfo } = useUser();
  const { data: session } = useSession();
  const sessionUserID = session?.user?.id || null;

  const tabs: Tab[] = ['profile', 'reviews', 'favourites', 'watchlist'];

  const fetchUser = async () => {
    try {
      const res = await fetch(`/api/user?id=${userId}`);
      if (!res.ok) {
        setError(`User "${userId}" not found.`);
        setUser(null);
        return;
      }
      const data = await res.json();
      if (!data.user) {
        setError(`User "${userId}" not found.`);
        setUser(null);
        return;
      }
      setUser(data.user);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch user', err);
      setError('An unexpected error occurred.');
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId, editMode]);

  useEffect(() => {
    if (!user) return;
    if (!userInfo) return;

    const matchingFollow = user.followers.find((f) => f.followerId === sessionUserID);
    setIsFollower(!!matchingFollow);
    setIsFollowerID(matchingFollow?.id || null);

    setIsUser(userInfo.id === userId);

    const totalRating = user.writtenReviews.reduce((sum, r) => sum + r.rating, 0);
    setAvgScore(user.writtenReviews.length ? totalRating / user.writtenReviews.length : 0);
  }, [user, userInfo]);

  useEffect(() => {
    if (editMode && user) {
      setNewUsername(user.username);
      setNewImageUrl(user.imageUrl || '');
    }
  }, [editMode, user]);

  const follow = async () => {
    await fetch('/api/follow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        follow: {
          followerId: sessionUserID,
          followingId: userId,
        },
      }),
    });
    fetchUser();
  };

  const unfollow = async () => {
    await fetch('/api/follow', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ followID: isFollowerID }),
    });
    fetchUser();
  };

  const updateProfile = async () => {
    await fetch('/api/user', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userID: userId,
        data: { username: newUsername, imageUrl: newImageUrl },
      }),
    });
    const res = await fetch(`/api/user?id=${userId}`);
    const updated = await res.json();
    setUserInfo(updated.user);
    setNewUsername(updated.user.username);
    setEditMode(false);
  };

  if (error) {
    return (
      <div className="flex justify-center mt-16">
        <div className="alert shadow-lg w-full max-w-md">
          <div>
            <span className="text-lg font-semibold">🚫 {error}</span>
            <p className="mt-2">Check the URL or go back to the previous page.</p>
          </div>
        </div>
      </div>
    );
  }
  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="w-full flex flex-row place-content-center">
        <div className="avatar my-8 mx-4">
          <div className="w-20 rounded-full ring ring-slate-400 ring-offset-base-100 ring-offset-2">
            <Image
              src={user.imageUrl || '/images/profile.png'}
              alt="profile"
              width={80}
              height={80}
              priority
            />
          </div>
        </div>
        <div className="self-center flex flex-col">
          <h1 className="text-xl font-bold ">{isUser ? userInfo?.username : user.username}</h1>
        </div>
      </div>

      <div className="flex place-content-center tabs tabs-boxed" id="user-tabs">
        {tabs.map((t: Tab) => (
          <a
            key={t}
            id={t}
            className={`tab ${tab === t ? 'tab-active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </a>
        ))}
      </div>

      <div className="w-full md:w-1/2 mx-auto flex place-content-center">
        {tab === 'profile' ? (
          <div className="flex flex-col w-full place-content-center">
            {!editMode ? (
              <>
                {!isUser ? (
                  <div className="flex place-content-center mx-6 mt-6">
                    <button
                      className={`btn w-full ${isFollower ? '' : 'btn-info'}`}
                      onClick={isFollower ? unfollow : follow}
                    >
                      {isFollower ? (
                        <>
                          Following <FaRegCheckSquare className="ml-2" />
                        </>
                      ) : (
                        'Follow +'
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="flex place-content-center mx-6 mt-6">
                    <button className="btn btn-secondary w-full" onClick={() => setEditMode(true)}>
                      Edit my profile
                    </button>
                  </div>
                )}

                <div className="stats stats-vertical shadow text-center m-6 bg-base-200">
                  <div className="stat" onClick={() => setTab('reviews')}>
                    <div className="stat-title">Reviews</div>
                    <div className="stat-value text-success">{user.writtenReviews.length}</div>
                  </div>
                  <div className="stat">
                    <div className="stat-title">Avg Score</div>
                    <div className="stat-value text-success">
                      {user.writtenReviews.length ? avgScore.toFixed(2) : 0}
                    </div>
                  </div>
                  <div className="stat">
                    <div className="stat-title">Following</div>
                    <div
                      className="stat-value text-warning"
                      id="following"
                      onClick={() => setShowFollowing((p) => !p)}
                    >
                      {user.following.length}
                    </div>
                    {showFollowing &&
                      user.following.map((f) => <SmallUser key={f.id} user={f.followedBy} />)}
                  </div>
                  <div className="stat">
                    <div className="stat-title">Followers</div>
                    <div
                      className="stat-value text-secondary"
                      onClick={() => setShowFollowers((p) => !p)}
                    >
                      {user.followers.length}
                    </div>
                    {showFollowers &&
                      user.followers.map((f) => <SmallUser key={f.id} user={f.followed} />)}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col place-content-center mx-6 mt-6">
                <label className="label">Username</label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="input input-secondary my-2"
                />
                <label className="label">Image URL</label>
                <input
                  type="text"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="input input-secondary my-2"
                />
                <button className="btn btn-secondary mt-4" onClick={updateProfile}>
                  Save
                </button>
              </div>
            )}
          </div>
        ) : tab === 'watchlist' ? (
          <Watchlist watchlist={user.watchlistShows} />
        ) : tab === 'favourites' ? (
          <Favourites favourites={user.favoriteShows} />
        ) : (
          <ProfileReviews reviews={user.writtenReviews} />
        )}
      </div>
    </div>
  );
};

export default UserPage;
