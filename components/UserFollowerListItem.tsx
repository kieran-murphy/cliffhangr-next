'use client';

import React from 'react';
import Link from 'next/link';
import { useUserById } from '@/hooks/useUserById';

import type { FollowType } from '@/types/follow';

type UserFollowerListItemProps = {
  follow: FollowType;
};

const UserFollowerListItem = ({ follow }: UserFollowerListItemProps): React.JSX.Element => {
  const { user, loading, error } = useUserById(follow.followerId);

  if (loading) return <p></p>;
  if (error || !user) return <p>Error: {error?.message ?? 'User not found'}</p>;

  return (
    <Link href={`/user/${user.id}`}>
      <div className="my-2 hover:border border-cyan-400">
        <h1 className="text-bold">{user.username}</h1>
      </div>
    </Link>
  );
};

export default UserFollowerListItem;
