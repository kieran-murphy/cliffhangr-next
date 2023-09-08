import { getReviews } from "@/lib/prisma/reviews";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { reviews, error } = await getReviews();
      if (error) throw new Error(error);
      return res.status(200).json({ reviews });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // if (req.method === "POST") {
  //   try {
  //     const data = req.body.review;
  //     const { review, error } = await createReview(data);
  //     const tvShowWithReviews = await prisma.tvShow.findMany({
  //       where: { id: req.body.review.showID },
  //       // include: { reviews: true }, // Include the associated reviews
  //     });

  //     console.log("TV Show with reviews:", tvShowWithReviews);
  //     return res.status(200).json({ review });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).json({ error: error.message });
  //   }
  //   finally {
  //     await prisma.$disconnect();
  //   }
  // }

  // if (req.method === "DELETE") {
  //   try {
  //     const data = req.body.reviewID;
  //     await deleteReview(data);
  //     return res.status(200).json({ message: "Review deleted successfully" });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).json();
  //   }
  // }

  res.setHeader("Allow", ["GET"]);
  // res.setHeader("Allow", ["GET", "POST", "DELETE"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
