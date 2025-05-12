import { test, expect } from '../fixtures';

test('GET /api/user without auth should not return JSON users', async ({ request }) => {
    const res = await request.get('/api/user');
    await expect(res.json()).rejects.toThrow();
});

test('GET /api/user with auth returns 200 and JSON users', async ({ authRequest }) => {
    const res = await authRequest.get('/api/user');
    expect(res.status()).toBe(200);
    const { users } = await res.json();
    expect(Array.isArray(users)).toBe(true);
});
