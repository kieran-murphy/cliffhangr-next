"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const user = session?.user || null;

  if (user) {
    return (
      <div className="flex flex-col p-4 sm:p-8">
        <h1 className="text-lg m-8 text-center">Welcome to cliffhangr!</h1>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href={`/show`}>
            <label
              htmlFor="my-modal"
              className="btn btn-primary w-full sm:w-auto mt-4 gap-2"
            >
              See Shows
            </label>
          </Link>
          <Link href={`/user`}>
            <label
              htmlFor="my-modal"
              className="btn btn-secondary w-full sm:w-auto mt-4 gap-2"
            >
              See Users
            </label>
          </Link>
          <Link href={`/user/${user.id}`}>
            <label
              htmlFor="my-modal"
              className="btn btn-accent w-full sm:w-auto mt-4 gap-2"
            >
              My Profile
            </label>
          </Link>
        </div>
      </div>
    );
  }

  return <div>Please log in to see the content.</div>;
}
