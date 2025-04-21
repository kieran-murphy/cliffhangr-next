import prisma from "@/lib/prisma";
import ShowClient from "./ShowClient";

export default async function Page({ params }) {
  const show = await prisma.show.findUnique({
    where: { id: params.showId },
    include: {
      reviews: {
        include: {
          reactOnReviews: true,
          user: true,
        }
      },
      favoritedBy: true,
      watchListedBy: true,
    },
  });

  return <ShowClient show={show} showId={params.showId} />;
}