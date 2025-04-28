import { test } from '@playwright/test';
import { login } from './utils/login';

test('Basic Login Test', async ({ page }) => {
    await login(page);
});