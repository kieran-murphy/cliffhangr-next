import React from "react";
import Link from "next/link";

import type { User } from "@/types/user";

export interface UserListItemProps {
  user: User
}

const UserListItem = ({ user }: UserListItemProps): React.JSX.Element => {
  return (
    <Link href={`/user/${user.id}`}>
      <button className="btn btn-active btn-neutral my-2 w-full">
        {user.username}
      </button>
    </Link>
  );
};

export default UserListItem;
