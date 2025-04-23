"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useUser } from "@/context/UserProvider";

const MainLayout = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { userInfo, setUserInfo } = useUser();

  useEffect(() => {
    // Redirect to sign in page if not signed in and session loading is completed
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchUsername = async () => {
      if (session) {
        try {
          const response = await fetch(`/api/user?id=${session.user.id}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setUserInfo(data.user);
        } catch (error) {
          console.error("Failed to fetch username:", error);
        }
      }
    };

    fetchUsername();
  }, [session]);


  if (status === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <>
      <nav className="navbar bg-base-300 z-1000">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex="0" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex="0"
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50"
            >
              <Link href={`/show`}>
                <li>
                  <div>Shows 📺</div>
                </li>
              </Link>

              <Link href={`/user`}>
                <li>
                  <div>Users 🧑</div>
                </li>
              </Link>

              <Link href={`/api/auth/signout`}>
                <li>
                  <div>Logout 🖥️</div>
                </li>
              </Link>
            </ul>
          </div>
          <Link href={`/`}>
            <button className="btn btn-ghost normal-case text-xl">
              cliffhangr
            </button>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            <Link href={`/show`}>
              <li>
                <div>Shows 📺</div>
              </li>
            </Link>

            <Link href={`/user`}>
              <li>
                <div>Users 🧑</div>
              </li>
            </Link>

            <Link href={`/api/auth/signout`}>
              <li>
                <div>Logout 🖥️</div>
              </li>
            </Link>
          </ul>
        </div>
        <div className="navbar-end">
          {userInfo?.username &&
            <Link href={`/user/${userInfo?.id}`}>
              <button className="btn">{userInfo?.username}</button>
            </Link>
          }
        </div>
      </nav>
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
