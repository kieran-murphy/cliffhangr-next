import { test, expect } from '../fixtures';

test.describe("Favorite Related Tests", () => {
  test("GET /api/favoriteshow", async ({ authRequest }) => {
    const response = await authRequest.get("/api/favoriteshow");
    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    // Basic checks
    expect(body).toHaveProperty("count");
    expect(body).toHaveProperty("favoriteShows");
    expect(Array.isArray(body.favoriteShows)).toBe(true);

    // Check count matches length of array
    expect(body.count).toBe(body.favoriteShows.length);
  });

  test("GET /api/favoriteshow/:id", async ({ authRequest }) => {
    // 1. Grab a random favorite
    const res = await authRequest.get('/api/favoriteshow')
    const { favoriteShows } = await res.json()
    const randomFavorite = favoriteShows[Math.floor(Math.random() * favoriteShows.length)]

    // 2. Request that single favorite by id
    const favoriteRequest = await authRequest.get(`/api/favoriteshow?id=${randomFavorite.id}`);
    expect(favoriteRequest.ok()).toBeTruthy();

    // 3. Make sure the payload matches what we pulled from the list
    const fetched = await favoriteRequest.json();
    expect(fetched.favoriteShow).toMatchObject({
      id: randomFavorite.id,
      userId: randomFavorite.userId,
      showId: randomFavorite.showId,
      createdAt: randomFavorite.createdAt,
    })
  });
});
