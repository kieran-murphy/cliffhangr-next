import prisma from '@/lib/prisma';
import ShowClient from './ShowClient';
import NotFoundMessage from '@/components/NotFoundMessage';

type ShowPageProps = {
  params: {
    showId: string;
  };
};

const ShowPage = async ({ params }: ShowPageProps): Promise<React.JSX.Element> => {
  const { showId } = await params;
  const show = await prisma.show.findUnique({
    where: { id: showId },
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
    const errorMsg = `Show with id="${showId}" not found.`
    return <NotFoundMessage error={errorMsg} />
  }

  return <ShowClient show={show} />;
};

export default ShowPage;
