"use client";

import React from "react";
import Link from "next/link";
import { useShowById } from "@/hooks/useShowById";

import type { Favorite } from "@/types/favorite";

type UserFavoriteListItemProps = {favorite: Favorite};

const UserFavoriteListItem = ({ favorite }: UserFavoriteListItemProps): React.JSX.Element => {
  const { show, loading, error } = useShowById(favorite.showId);

  if (loading) return <p></p>;
  if (error || !show) return <p>Error: {error?.message ?? "Show not found"}</p>;

  return (
    <Link href={`/show/${show.id}`}>
      <div className="my-2 hover:border border-cyan-400">
        <h1 className="text-bold">{show.title} ❤️</h1>
      </div>
    </Link>
  );
};

export default UserFavoriteListItem;
