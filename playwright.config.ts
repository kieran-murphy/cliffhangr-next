import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const PLAYWRIGHT_HEADLESS = process.env.PLAYWRIGHT_HEADLESS !== 'false';

export default defineConfig({
    testDir: './tests',
    use: {
        colorScheme: 'dark',
        headless: PLAYWRIGHT_HEADLESS,
        baseURL: BASE_URL,
        launchOptions: {
            slowMo: 500,
          },
    },
});