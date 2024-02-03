"use client";

import { useSession } from "next-auth/react";

export const UserText = () => {
  const { data: session } = useSession();
  const username = session?.user?.name || null;
  console.log("Client Session", session);
  return username;
};
