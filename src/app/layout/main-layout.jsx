"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const getUserFromJWTCookie = async () => {
  const authToken = Cookies.get("token");
  const response = await fetch("/api/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: authToken }),
  });
  const responseData = await response.json();
  const username = responseData.username;
  if (username) {
    return username;
  }
};

const MainLayout = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState("");

  useEffect(() => {
    (async () => {
      const user = await getUserFromJWTCookie();
      setUser(user);
      if (!user) {
        router.replace("/logintest");
      }
    })();
  }, [router]);

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
          <li className="hover:bg-gray-700 rounded-md p-2">
            <Link href="/loginsuccess">
              <h1 className="text-xl font-semibold">{user}</h1>
            </Link>
          </li>
          {/* Add other navigation links here */}
        </ul>
      </nav>
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
