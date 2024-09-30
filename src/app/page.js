"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const user = session?.user || null;

  if (user) {
    return (
      <div>
        <h1 className="text-lg m-8">Welcome to cliffhangr!</h1>
        <div className="mx-6 pt-10">
          <Link href={`/show`}>
            <label
              htmlFor="my-modal"
              className="btn btn-primary w-full mt-4 gap-2"
            >
              See Shows
            </label>
          </Link>
          <Link href={`/user`}>
            <label
              htmlFor="my-modal"
              className="btn btn-secondary w-full mt-4 gap-2"
            >
              See Users
            </label>
          </Link>
          <Link href={`/user/${user.id}`}>
            <label
              htmlFor="my-modal"
              className="btn btn-success w-full mt-4 gap-2"
            >
              See My Page
            </label>
          </Link>
        </div>
      </div>
    );
  }
}
