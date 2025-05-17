import React from "react";
import Link from "next/link";

import type { User } from "@/types/user";

type SmallUserProps = {
  user: User;
}

const SmallUser = ({ user }: SmallUserProps): React.JSX.Element => {
  return (
    <Link href={`/user/${user.id}`}>      
      <button className="btn btn-active btn-neutral my-2 w-full">
        {user.username}
      </button>
    </Link>
  );
};

export default SmallUser;