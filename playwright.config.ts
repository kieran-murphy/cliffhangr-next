import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default defineConfig({
    testDir: './tests',
    use: {
        baseURL: BASE_URL,
    },
});