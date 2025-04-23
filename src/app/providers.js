"use client";

import { SessionProvider } from "next-auth/react";
import MainLayout from "./layout/main-layout";
import { UserProvider } from "@/context/UserProvider";

export const Providers = ({ children }) => {
  return (
    <SessionProvider>
      <UserProvider>
        <MainLayout>{children}</MainLayout>
      </UserProvider>
    </SessionProvider>
  );
};
