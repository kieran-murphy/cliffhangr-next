import { test, expect } from '../fixtures';

test.describe("Watchlist Related Tests", () => {
  test("GET /api/watchlistshow", async ({ authRequest }) => {
    const response = await authRequest.get("/api/watchlistshow");
    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    // Basic checks
    expect(body).toHaveProperty("count");
    expect(body).toHaveProperty("watchlistShows");
    expect(Array.isArray(body.watchlistShows)).toBe(true);

    // Check count matches length of array
    expect(body.count).toBe(body.watchlistShows.length);
  });

  test("GET /api/watchlistshow/:id", async ({ authRequest }) => {
    // 1. Grab a random watchlistShow
    const res = await authRequest.get('/api/watchlistshow')
    const { watchlistShows } = await res.json()
    const randomWatchlist = watchlistShows[Math.floor(Math.random() * watchlistShows.length)]

    // 2. Request that single watchlistShow by id
    const watchlistRequest = await authRequest.get(`/api/watchlistshow?id=${randomWatchlist.id}`);
    expect(watchlistRequest.ok()).toBeTruthy();

    // 3. Make sure the payload matches what we pulled from the list
    const fetched = await watchlistRequest.json();
    expect(fetched.watchlistShow).toMatchObject({
      id: randomWatchlist.id,
      userId: randomWatchlist.userId,
      showId: randomWatchlist.showId,
      createdAt: randomWatchlist.createdAt,
    })
  });
});
