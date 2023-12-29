"use client";

import { useContextUser } from "@/context/MyContext";

const ProtectedPage = () => {
  const user = useContextUser();
  console.log("loginsuccess", user);

  return <div>Welcome! {user}</div>;
};

export default ProtectedPage;
