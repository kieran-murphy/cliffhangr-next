"use client";

import { SessionProvider } from "next-auth/react";
import MainLayout from "./layout/main-layout";

export const Providers = ({ children }) => {
  return (
    <SessionProvider>
      <MainLayout>{children}</MainLayout>
    </SessionProvider>
  );
};
