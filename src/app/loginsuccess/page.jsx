"use client";

import { useEffect, useState } from "react";
import { useContextUser } from "@/context/MyContext";

const ProtectedPage = () => {
  const [value, setValue] = useState("");
  const user = useContextUser();
  console.log("loginsuccess", user);

  useEffect(() => {
    setValue("foo");
  }, []);

  useEffect(() => {
    console.log(value);
    console.log(user);
  }, [value]);

  return <div>Welcome! {user}</div>;
};

export default ProtectedPage;
