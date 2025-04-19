import Link from "next/link";

const SmallReview = ({ show }) => {
  if (!show) return null;

  return (
    <Link href={`/show/${show.id}`}>
      <button className="btn btn-active btn-neutral my-2 w-full">
        {show.title}
      </button>
    </Link>
  );
};

export default SmallReview;
