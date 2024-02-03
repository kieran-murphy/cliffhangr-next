"use client";

import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter
import { useSession } from "next-auth/react"; // Import useSession
import { useEffect } from "react"; // Import useEffect

const MainLayout = ({ children }) => {
  const { data: session, status } = useSession(); // Also get status to check loading state
  const router = useRouter(); // Use useRouter hook for redirection

  useEffect(() => {
    // Redirect to sign in page if not signed in and session loading is completed
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  // Optional: You can also show loading state while checking session
  if (status === "loading") {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  const username = session?.user?.name || ""; // Directly access username from session

  return (
    <>
      <nav className="bg-gray-800 text-white p-4">
        <ul className="flex justify-center space-x-4">
          <li className="hover:bg-gray-700 rounded-md p-2">
            <Link href="/show">
              <h1 className="text-xl font-semibold">Shows</h1>
            </Link>
          </li>
          <li className="hover:bg-gray-700 rounded-md p-2">
            <Link href="/user">
              <h1 className="text-xl font-semibold">Users</h1>
            </Link>
          </li>

          {username ? (
            <>
              <li className="hover:bg-gray-700 rounded-md p-2">
                <Link href="/loginsuccess">
                  <h1 className="text-xl font-semibold">
                    <pre>{username}</pre>
                  </h1>
                </Link>
              </li>
              <li className="hover:bg-gray-700 rounded-md p-2">
                <Link href="/api/auth/signout">
                  <h1 className="text-xl font-semibold">Sign Out</h1>
                </Link>
              </li>
            </>
          ) : (
            <li className="hover:bg-gray-700 rounded-md p-2">
              <Link href="/api/auth/signin">
                <h1 className="text-xl font-semibold">Sign In</h1>
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
