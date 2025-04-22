import prisma from "@/lib/prisma";
import UserClientPage from "./UserClientPage";

export default async function Page({ params }) {
  const user = await prisma.user.findUnique({
    where: { id: params.userId },
    include: {
      writtenReviews: {
        include: { show: true },
      },
      favoriteShows: {
        include: { show: true },
      },
      watchlistShows: {
        include: { show: true },
      },
      followers: {
        select: {
          followed: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
      following: {
        select: {
          followedBy: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
      
    },
  });
  

  return <UserClientPage user={user} userId={params.userId} />;
}
