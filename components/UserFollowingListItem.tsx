"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useUserById } from "@/hooks/useUserById";

import type { Follow } from "@/types/follow";

type UserFollowingListItemProps = {
  follow: Follow;
};

const UserFollowingListItem = ({ follow }: UserFollowingListItemProps): React.JSX.Element => {
  const { user, loading, error } = useUserById(follow.followerId);

  if (loading) return <p></p>;
  if (error || !user) return <p>Error: {error?.message ?? "User not found"}</p>;

  return (
    <Link href={`/user/${user.id}`}>
      <div className="my-2 hover:border border-cyan-400">
        <h1 className="text-bold">{user.username}</h1>
      </div>
    </Link>
  );
};

export default UserFollowingListItem;
