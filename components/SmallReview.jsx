import { useEffect, useState } from "react";
import Link from "next/link";

const SmallReview = ({ showId }) => {
  const [show, setShow] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/show?id=${showId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setShow(data.show);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (showId) {
      fetchData();
    }
  }, [showId]);

  if (loading) return <></>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Link href={`/show/${show.id}`}>
      <button className="btn btn-active btn-neutral my-2 w-full">
        {show.title}
      </button>
    </Link>
  );
};

export default SmallReview;
