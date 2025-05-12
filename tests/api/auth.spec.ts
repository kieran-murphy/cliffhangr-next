import { test, expect } from '../fixtures';

test('GET /api/user without auth returns 401 JSON', async ({ request }) => {
  const res = await request.get('/api/user')
  expect(res.status()).toBe(401)

  const body = await res.json()
  expect(body).toEqual({ error: 'Unauthorized' })
})

test('GET /api/user with authRequest returns 200 and JSON users', async ({ authRequest }) => {
  const res = await authRequest.get('/api/user')
  expect(res.status()).toBe(200)

  const { users } = await res.json()
  expect(Array.isArray(users)).toBe(true)
})