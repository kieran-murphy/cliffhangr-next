import Link from "next/link";

const ShowListItem = ({ show }) => {
  return (
    <Link href={`/show/${show.id}`}>
      <div className="border border-cyan-400 cursor-pointer m-4 w-1/3">
        <h1 className="text-bold">{show.title}</h1>
      </div>
    </Link>
  );
};

export default ShowListItem;
