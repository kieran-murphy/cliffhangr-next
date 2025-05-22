"use client";

import { SessionProvider } from "next-auth/react";
import MainLayout from "./layout/main-layout";
import { UserProvider } from "@/context/UserProvider";

import type { LayoutProps } from "@/types/common";

const Providers = ({ children }: LayoutProps): React.JSX.Element => {
  return (
    <SessionProvider>
      <UserProvider>
        <MainLayout>{children}</MainLayout>
      </UserProvider>
    </SessionProvider>
  );
};

export default Providers;
