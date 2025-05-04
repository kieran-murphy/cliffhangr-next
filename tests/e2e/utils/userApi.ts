import { APIRequestContext } from "@playwright/test";
import { testUser } from "../data/testuser";

export async function getRandomUser(request: APIRequestContext) {
  const res = await request.get("/api/user");
  if (!res.ok()) throw new Error(`API returned ${res.status()}`);
  const { users } = await res.json();

  const candidates = users.filter((u) => u.username !== "testuser");
  if (candidates.length === 0) throw new Error("No non-testuser accounts");

  return candidates[Math.floor(Math.random() * candidates.length)].username;
}

export async function getTestUserId(request: APIRequestContext) {
  const res = await request.get(`/api/user?search=${testUser.username}`);
  if (!res.ok()) throw new Error(`API returned ${res.status()}`);
  const { users } = await res.json();
  if (users.length > 1) throw new Error("More than one user found");
  const testUserId = users[0].id;
  return testUserId;
}

export async function getTestUserFollowing(request: APIRequestContext) {
  const testUserId = await getTestUserId(request);
  const res = await request.get(`/api/user?id=${testUserId}`);
  if (!res.ok()) throw new Error(`API returned ${res.status()}`);
  const { user } = await res.json();
  return user.following;
}

export async function getTestUserFavourites(request: APIRequestContext) {
  const testUserId = await getTestUserId(request);
  const res = await request.get(`/api/user?id=${testUserId}`);
  if (!res.ok()) throw new Error(`API returned ${res.status()}`);
  const { user } = await res.json();
  return user.favoriteShows;
}

export async function getTestUserWatchlist(request: APIRequestContext) {
  const testUserId = await getTestUserId(request);
  const res = await request.get(`/api/user?id=${testUserId}`);
  if (!res.ok()) throw new Error(`API returned ${res.status()}`);
  const { user } = await res.json();
  return user.watchlistShows;
}

export async function getTestUserReviews(request: APIRequestContext) {
  const testUserId = await getTestUserId(request);
  const res = await request.get(`/api/user?id=${testUserId}`);
  if (!res.ok()) throw new Error(`API returned ${res.status()}`);
  const { user } = await res.json();
  return user.writtenReviews;
}

export async function getRandomUserToFollow(request: APIRequestContext) {
  const res = await request.get("/api/user");
  if (!res.ok()) throw new Error(`API returned ${res.status()}`);
  const { users } = await res.json();
  const following = await getTestUserFollowing(request);
  const candidates = users.filter(
    (u) => u.username !== "testuser" && !following.includes(u.id)
  );
  return candidates[Math.floor(Math.random() * candidates.length)].username;
}

export async function getRandomUserToUnfollow(request: APIRequestContext) {
  const following = await getTestUserFollowing(request);
  return following[Math.floor(Math.random() * following.length)].followedBy.username;
}

export async function getRandomShowToFavourite(request: APIRequestContext) {
  const res = await request.get("/api/show");
  if (!res.ok()) throw new Error(`API returned ${res.status()}`);
  const { shows } = await res.json();
  const favs = await getTestUserFavourites(request);
  const candidates = shows.filter((s) => !favs.includes(s.id));
  return candidates[Math.floor(Math.random() * candidates.length)].title;
}

export async function getRandomShowToUnfavourite(request: APIRequestContext) {
  const favs = await getTestUserFavourites(request);
  return favs[Math.floor(Math.random() * favs.length)].show.title;
}

export async function getRandomShowToWatchlist(request: APIRequestContext) {
  const res = await request.get("/api/show");
  if (!res.ok()) throw new Error(`API returned ${res.status()}`);
  const { shows } = await res.json();
  const watchlistEntries = await getTestUserWatchlist(request);
  const watchlistIds = watchlistEntries.map(entry => entry.showId);
  const candidates = shows.filter(s => !watchlistIds.includes(s.id));
  const pick = candidates[Math.floor(Math.random() * candidates.length)];
  return pick.title;
}

export async function getRandomShowToUnwatchlist(request: APIRequestContext) {
  const watchlist = await getTestUserWatchlist(request);
  return watchlist[Math.floor(Math.random() * watchlist.length)].show.title;
}

export async function getRandomShowToReview(request: APIRequestContext) {
  const res = await request.get("/api/show");
  if (!res.ok()) throw new Error(`API returned ${res.status()}`);
  const { shows } = await res.json();
  const reviews = await getTestUserReviews(request);
  const reviewedIds = new Set(reviews.map(r => r.showId));
  const candidates = shows.filter(s => !reviewedIds.has(s.id));
  return candidates[Math.floor(Math.random() * candidates.length)].title;
}