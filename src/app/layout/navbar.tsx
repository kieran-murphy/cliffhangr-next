'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useUser } from '@/context/UserProvider';
import LoadingSpinner from '@/components/LoadingSpinner';

import type { LayoutProps } from '@/types/common';

const Navbar = ({ children }: LayoutProps): React.JSX.Element => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { userInfo, setUserInfo } = useUser();

  // Redirect to sign-in if unauthenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin');
    }
  }, [status, router]);

  // Fetch user data when session is active
  useEffect(() => {
    async function fetchUser() {
      if (session?.user?.id) {
        try {
          const res = await fetch(`/api/user?id=${session.user.id}`);
          if (!res.ok) throw new Error('Failed to fetch user');
          const { user } = await res.json();
          setUserInfo(user);
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      }
    }
    fetchUser();
  }, [session, setUserInfo]);

  // Show loading state while auth is initializing
  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  return (
    <>
      <nav className="navbar bg-base-300 z-1000">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              {/* menu icon */}
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
                  strokeWidth={2}
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50"
            >
              <li>
                <Link href="/show">Shows 📺</Link>
              </li>
              <li>
                <Link href="/user">Users 🧑</Link>
              </li>
              <li>
                <Link href="/api/auth/signout">Logout 🖥️</Link>
              </li>
            </ul>
          </div>
          <Link href="/">
            <button className="btn btn-ghost normal-case text-xl">cliffhangr</button>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            <li>
              <Link href="/show">Shows 📺</Link>
            </li>
            <li>
              <Link href="/user">Users 🧑</Link>
            </li>
            <li>
              <Link href="/api/auth/signout">Logout 🖥️</Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          {userInfo?.username && (
            <Link href={`/user/${userInfo.id}`}>
              <button className="btn">{userInfo.username}</button>
            </Link>
          )}
        </div>
      </nav>
      <main>{children}</main>
    </>
  );
};

export default Navbar;
