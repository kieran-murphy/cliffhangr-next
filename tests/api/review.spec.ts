import { test, expect } from "@playwright/test";

test.describe("Review Related Tests", () => {
  test("GET /api/review", async ({ request }) => {
    const response = await request.get("/api/review");
    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    // Basic checks
    expect(body).toHaveProperty("count");
    expect(body).toHaveProperty("reviews");
    expect(Array.isArray(body.reviews)).toBe(true);

    // Check count matches length of array
    expect(body.count).toBe(body.reviews.length);
  });

  test("GET /api/review/:id", async ({ request }) => {
    // 1. Grab a random review
    const res = await request.get('/api/review')
    const { reviews } = await res.json()
    const randomReview = reviews[Math.floor(Math.random() * reviews.length)]

    // 2. Request that single review by id
    const reviewRequest = await request.get(`/api/review?id=${randomReview.id}`);
    expect(reviewRequest.ok()).toBeTruthy();

    // 3. Make sure the payload matches what we pulled from the list
    const fetched = await reviewRequest.json();
    expect(fetched.review).toMatchObject({
      id: randomReview.id,
      text: randomReview.text,
      rating: randomReview.rating,
    })
  });
});
