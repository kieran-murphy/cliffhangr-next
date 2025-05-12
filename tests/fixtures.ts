import { test as base, type APIRequestContext } from '@playwright/test';
import { testUser } from './e2e/data/testuser';

export const test = base.extend<{ authRequest: APIRequestContext }> ({
    request: async ({ playwright }, use) => {
        const ctx = await playwright.request.newContext({
            extraHTTPHeaders: { accept: 'application/json' },
        });
        await use(ctx);
        await ctx.dispose();
    },

    authRequest: async ({ request }, use) => {
        const { csrfToken } = await request
            .get('/api/auth/csrf')
            .then(r => r.json());
        const loginRes = await request.post('/api/auth/callback/credentials', {
            form: { csrfToken, email: testUser.email, password: testUser.password },
        });
        if (!loginRes.ok()) {
            throw new Error('Login failed: ' + (await loginRes.text()));
        }
        await use(request);
    },
});

export const expect = test.expect;
