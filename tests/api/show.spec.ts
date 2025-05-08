import { test, expect } from "@playwright/test";

test.describe("Show Related Tests", () => {
  test("GET /api/show", async ({ request }) => {
    const response = await request.get("/api/show");
    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    // Basic checks
    expect(body).toHaveProperty("count");
    expect(body).toHaveProperty("shows");
    expect(Array.isArray(body.shows)).toBe(true);

    // Check count matches length of array
    expect(body.count).toBe(body.shows.length);
  });

  test("GET /api/show/:id", async ({ request }) => {
    // 1. Grab a random show
    const res = await request.get('/api/show')
    const { shows } = await res.json()
    const randomShow = shows[Math.floor(Math.random() * shows.length)]

    // 2. Request that single show by id
    const showRequest = await request.get(`/api/show?id=${randomShow.id}`);
    expect(showRequest.ok()).toBeTruthy();

    // 3. Make sure the payload matches what we pulled from the list
    const fetched = await showRequest.json();
    expect(fetched.show).toMatchObject({
      id: randomShow.id,
      title: randomShow.title,
      year: randomShow.year,
    })
  });
});
