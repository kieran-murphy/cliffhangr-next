"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "./layout/navbar";
import { UserProvider } from "@/context/UserProvider";

import type { LayoutProps } from "@/types/common";

const Providers = ({ children }: LayoutProps): React.JSX.Element => {
  return (
    <SessionProvider>
      <UserProvider>
        <Navbar>{children}</Navbar>
      </UserProvider>
    </SessionProvider>
  );
};

export default Providers;
