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
