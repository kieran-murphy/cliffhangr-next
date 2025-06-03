import { test, expect } from '../fixtures';

test.describe('Follow Related Tests', () => {
  test('GET /api/follow', async ({ authRequest }) => {
    const response = await authRequest.get('/api/follow');
    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    // Basic checks
    expect(body).toHaveProperty('count');
    expect(body).toHaveProperty('follows');
    expect(Array.isArray(body.follows)).toBe(true);

    // Check count matches length of array
    expect(body.count).toBe(body.follows.length);
  });

  test('GET /api/follow/:id', async ({ authRequest }) => {
    // 1. Grab a random follow
    const res = await authRequest.get('/api/follow');
    const { follows } = await res.json();
    const randomFollow = follows[Math.floor(Math.random() * follows.length)];

    // 2. Request that single follow by id
    const followRequest = await authRequest.get(`/api/follow?id=${randomFollow.id}`);
    expect(followRequest.ok()).toBeTruthy();

    // 3. Make sure the payload matches what we pulled from the list
    const fetched = await followRequest.json();
    expect(fetched.follow).toMatchObject({
      id: randomFollow.id,
      followingId: randomFollow.followingId,
      followerId: randomFollow.followerId,
    });
  });
});
