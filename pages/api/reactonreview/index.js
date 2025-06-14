import {
  getReactOnReviews,
  getReactOnReview,
  createReactOnReview,
  deleteReactOnReview,
} from '@/lib/prisma/reactOnReviews';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const reactOnReviewID = req.query.id;
    if (reactOnReviewID) {
      try {
        const { reactOnReview, error } = await getReactOnReview(reactOnReviewID);
        if (error) throw new Error(error);
        return res.status(200).json({ reactOnReview });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    } else {
      try {
        const { reactOnReviews, count, error } = await getReactOnReviews();
        if (error) throw new Error(error);
        return res.status(200).json({ count, reactOnReviews });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }
  }

  if (req.method === 'POST') {
    try {
      const data = req.body.reactOnReview;
      const { reactOnReview, error } = await createReactOnReview(data);
      if (error) throw new Error(error);
      return res.status(200).json({ reactOnReview });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const data = req.body.reactOnReviewID;
      const { reactOnReview, error } = await deleteReactOnReview(data);
      if (error) throw new Error(error);
      return res.status(200).json({ reactOnReview });
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
