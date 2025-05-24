import React from "react";
import Link from "next/link";

import type { UserType } from "@/types/user";

type SmallUserProps = {
  user: Pick<UserType, "id" | "username">;
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