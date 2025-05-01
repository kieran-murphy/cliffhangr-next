import { test } from '@playwright/test';
import { login } from './utils/utils';

test('Basic Login Test', async ({ page }) => {
    await login(page);
});