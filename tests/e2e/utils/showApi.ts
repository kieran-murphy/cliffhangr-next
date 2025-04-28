import { APIRequestContext } from '@playwright/test';

export async function getRandomShow(request: APIRequestContext) {
    const res = await request.get('/api/show');
    if (!res.ok()) throw new Error(`API returned ${res.status()}`);
    const { shows } = await res.json();

    return shows[Math.floor(Math.random() * shows.length)].title;
  }