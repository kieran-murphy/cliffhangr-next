"use client";

import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { MyProvider } from "@/context/MyContext";

export default function RootLayout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState("");

  const authToken = Cookies.get("token");

  const getUserFromJWTCookie = async () => {
    const response = await fetch("/api/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: authToken }),
    });
    const responseData = await response.json();
    const username = responseData.username;
    console.log("getUserFromJWTCookie", username);
    if (username) {
      return username;
    } else {
      console.log("error in getUserFromJWTCookie");
    }
  };

  useEffect(() => {
    (async () => {
      await getUserFromJWTCookie().then((JWTuser) => {
        console.log("JWTuser", JWTuser);
        // console.log("before-user", user);
        setUser(JWTuser);
        // console.log("after-user", user);
        if (!JWTuser) {
          router.replace("/logintest");
        }
      });
    })();
  }, [router, authToken]);

  useEffect(() => {
    console.log("after-user", user);
  }, [user]);

  return (
    <MyProvider value={{ value: user, setValue: setUser }}>
      <html lang="en">
        <body>
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
            </ul>
          </nav>
          <main>{children}</main>
        </body>
      </html>
    </MyProvider>
  );
}
