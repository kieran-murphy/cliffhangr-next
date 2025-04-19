import prisma from "@/lib/prisma";
import UserClientPage from "./UserClientPage";

export default async function Page({ params }) {
  const user = await prisma.user.findUnique({
    where: { id: params.userId },
    include: {
      writtenReviews: true,
      favoriteShows: true,
      watchlistShows: true,
      followers: true,
      following: true,
    },
  });

  return <UserClientPage user={user} userId={params.userId} />;
}
