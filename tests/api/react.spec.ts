import { test, expect } from '../fixtures';

test.describe('React Related Tests', () => {
  test('GET /api/reactonreview', async ({ authRequest }) => {
    const response = await authRequest.get('/api/reactonreview');
    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    // Basic checks
    expect(body).toHaveProperty('count');
    expect(body).toHaveProperty('reactOnReviews');
    expect(Array.isArray(body.reactOnReviews)).toBe(true);

    // Check count matches length of array
    expect(body.count).toBe(body.reactOnReviews.length);
  });

  test('GET /api/reactonreview/:id', async ({ authRequest }) => {
    // 1. Grab a random react
    const res = await authRequest.get('/api/reactonreview');
    const { reactOnReviews: reacts } = await res.json();
    const randomreact = reacts[Math.floor(Math.random() * reacts.length)];

    // 2. Request that single react by id
    const reactRequest = await authRequest.get(`/api/reactonreview?id=${randomreact.id}`);
    expect(reactRequest.ok()).toBeTruthy();

    // 3. Make sure the payload matches what we pulled from the list
    const fetched = await reactRequest.json();
    expect(fetched.reactOnReview).toMatchObject({
      id: randomreact.id,
      react: randomreact.react,
      userId: randomreact.userId,
      reviewId: randomreact.reviewId,
      createdAt: randomreact.createdAt,
    });
  });
});
