import { test, expect } from '../fixtures';

test.describe("User Related Tests", () => {
  test("GET /api/user", async ({ authRequest }) => {
    const response = await authRequest.get("/api/user");
    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    // Basic checks
    expect(body).toHaveProperty("count");
    expect(body).toHaveProperty("users");
    expect(Array.isArray(body.users)).toBe(true);

    // Check count matches length of array
    expect(body.count).toBe(body.users.length);
  });

  test("GET /api/user/:id", async ({ authRequest }) => {
    // 1. Grab a random user
    const res = await authRequest.get('/api/user')
    const { users } = await res.json()
    const randomUser = users[Math.floor(Math.random() * users.length)]

    // 2. Request that single user by id
    const userRequest = await authRequest.get(`/api/user?id=${randomUser.id}`);
    expect(userRequest.ok()).toBeTruthy();

    // 3. Make sure the payload matches what we pulled from the list
    const fetched = await userRequest.json();
    expect(fetched.user).toMatchObject({
      id: randomUser.id,
      username: randomUser.username,
      email: randomUser.email,
    })
  });
});
