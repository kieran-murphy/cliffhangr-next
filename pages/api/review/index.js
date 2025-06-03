import { getReviews, getReview, createReview, deleteReview } from '@/lib/prisma/reviews';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const reviewID = req.query.id;
    if (reviewID) {
      try {
        const { review, error } = await getReview(reviewID);
        if (error) throw new Error(error);
        return res.status(200).json({ review });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    } else {
      try {
        const { reviews, count, error } = await getReviews();
        if (error) throw new Error(error);
        return res.status(200).json({ count, reviews });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }
  }

  if (req.method === 'POST') {
    try {
      const data = req.body.review;
      const { review, error } = await createReview(data);
      if (error) throw new Error(error);
      return res.status(200).json({ review });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const data = req.body.reviewID;
      const { review, error } = await deleteReview(data);
      if (error) throw new Error(error);
      return res.status(200).json({ review });
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
