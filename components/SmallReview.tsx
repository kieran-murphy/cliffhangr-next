import React from 'react';
import Link from 'next/link';

import type { ShowType } from '@/types/show';

type SmallReviewProps = {
  show: Pick<ShowType, 'id' | 'title'>;
};

const SmallReview = ({ show }: SmallReviewProps): React.JSX.Element => {
  return (
    <Link href={`/show/${show.id}`}>
      <button className="btn btn-active btn-neutral my-2 w-full">{show.title}</button>
    </Link>
  );
};

export default SmallReview;
