"use client";

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

const ProtectedPage = () => {
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

  return <div>Welcome {user}!</div>;
};

export default ProtectedPage;
