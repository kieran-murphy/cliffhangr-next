import prisma from "@/lib/prisma";
import ShowClient from "./ShowClient";

type ShowPageProps = {
  params: {
    showId: string;
  };
}

const ShowPage = async ({ params }: ShowPageProps): Promise<React.JSX.Element> => {
  const show = await prisma.show.findUnique({
  where: { id: params.showId },
  include: {
    reviews: {
      include: {
        user: true,
        show: true,
        reactOnReviews: {
          include: { user: true },
        },
        CommentOnReview: {
          include: { user: true },
        },
      },
    },
    favoritedBy: true,
    watchListedBy: true,
  },
});


  if (!show) {
    throw new Error(`Show with id=${params.showId} not found`);
  }

  return <ShowClient show={show} />;
}

export default ShowPage;