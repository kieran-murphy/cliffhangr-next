import { test, expect } from "@playwright/test";

test.describe("Comment Related Tests", () => {
  test("GET /api/commentonreview", async ({ request }) => {
    const response = await request.get("/api/commentonreview");
    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    // Basic checks
    expect(body).toHaveProperty("count");
    expect(body).toHaveProperty("commentOnReviews");
    expect(Array.isArray(body.commentOnReviews)).toBe(true);

    // Check count matches length of array
    expect(body.count).toBe(body.commentOnReviews.length);
  });

  test("GET /api/commentonreview/:id", async ({ request }) => {
    // 1. Grab a random comment
    const res = await request.get('/api/commentonreview')
    const { commentOnReviews: comments } = await res.json()
    const randomComment = comments[Math.floor(Math.random() * comments.length)]

    // 2. Request that single comment by id
    const commentRequest = await request.get(`/api/commentonreview?id=${randomComment.id}`);
    expect(commentRequest.ok()).toBeTruthy();

    // 3. Make sure the payload matches what we pulled from the list
    const fetched = await commentRequest.json();
    expect(fetched.commentOnReview).toMatchObject({
      id: randomComment.id,
      text: randomComment.text,
      userId: randomComment.userId,
      reviewId: randomComment.reviewId,
      createdAt: randomComment.createdAt,
    })
  });
});
