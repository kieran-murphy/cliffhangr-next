import React, { useEffect } from "react";
import "../src/app/globals.css";
import { useSession } from "next-auth/react"; // Import useSession
import { useRouter } from "next/router"; // Import useRouter
import LoadingSpinner from "@/components/LoadingSpinner";

const PagesLayout = ({ children }) => {
  const { data: session, status } = useSession(); // Also get status to check loading state
  const router = useRouter(); // Use useRouter hook for redirection

  useEffect(() => {
    // Redirect to sign in page if not signed in and session loading is completed
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  // Optional: You can also show loading state while checking session
  if (status === "loading") {
    return <LoadingSpinner />; // Or any other loading indicator
  }

  return (
    <div className="text-center m-8">
      <main>{children}</main>
    </div>
  );
};

export default PagesLayout;
