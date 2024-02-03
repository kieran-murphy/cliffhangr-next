"use client";

import { useSession } from "next-auth/react";

const ProtectedPage = () => {
  const { data: session } = useSession(); // Use useSession hook to get session data
  const username = session?.user?.name || ""; // Directly access username from session

  return <div>Welcome! {username}</div>;
};

export default ProtectedPage;
