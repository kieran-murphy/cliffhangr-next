import React, { useState, useEffect } from "react";
import Link from "next/link";

const SmallUser = ({ user }) => {

  return (
    <Link href={`/user/${user.id}`}>
      <button className="btn btn-active btn-neutral my-2 w-full">
        {user.username}
      </button>
    </Link>
  );
};

export default SmallUser;
