import React from "react";
import Link from "next/link";

import type { Show } from "@/types/show";

type SmallReviewProps = {
  show: Show;
}

const SmallReview = ({ show }: SmallReviewProps): React.JSX.Element => {
  return (
    <Link href={`/show/${show.id}`}>      
      <button className="btn btn-active btn-neutral my-2 w-full">
        {show.title}
      </button>
    </Link>
  );
};

export default SmallReview;
