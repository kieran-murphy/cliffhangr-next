import { APIRequestContext } from '@playwright/test';

export async function getRandomUser(request: APIRequestContext) {
    const res = await request.get('/api/user');
    if (!res.ok()) throw new Error(`API returned ${res.status()}`);
    const { users } = await res.json();
  
    const candidates = users.filter(u => u.username !== 'testuser');
    if (candidates.length === 0) throw new Error('No non-testuser accounts');
  
    return candidates[Math.floor(Math.random() * candidates.length)].username;
  }