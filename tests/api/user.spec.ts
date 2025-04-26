import { test, expect } from '@playwright/test';

test('GET /api/user', async ({ request }) => {
    const response = await request.get('http://localhost:3000/api/user');
    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    // Basic checks
    expect(body).toHaveProperty('count');
    expect(body).toHaveProperty('users');
    expect(Array.isArray(body.users)).toBe(true);

    // Check count matches length of array
    expect(body.count).toBe(body.users.length);
});