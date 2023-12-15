"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
// const jwtDecode = require("jwt-decode");

import Cookies from "js-cookie"; // Assuming you're using js-cookie

const getUserFromJWTCookie = () => {
  const authToken = Cookies.get("token");
  let decodedToken;
  if (authToken) {
    decodedToken = jwt.decode(authToken);
    // jwt.verify(authToken, process.env.JWT_SECRET);
  }

  if (decodedToken) {
    const username = decodedToken.username;
    return username;
  } else {
    return null;
  }
};

const ProtectedPage = () => {
  const router = useRouter();

  const [user, setUser] = useState("");

  useEffect(() => {
    const user = getUserFromJWTCookie();
    setUser(user);
    if (!user) {
      router.replace("/logintest");
    }
  }, []);

  return <div>Welcome {user}!</div>;
};

export default ProtectedPage;
