import { getReviews, getReview, createReview, deleteReview } from '@/lib/prisma/reviews';
import { getErrorMessage } from '@/utils/error';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const reviewID = req.query.id as string;
    if (reviewID) {
      try {
        const { review, error } = await getReview(reviewID);
        if (error) throw new Error(error);
        return res.status(200).json({ review });
      } catch (error) {
        return res.status(500).json({ error: getErrorMessage(error) });
      }
    } else {
      try {
        const { reviews, count, error } = await getReviews();
        if (error) throw new Error(error);
        return res.status(200).json({ count, reviews });
      } catch (error) {
        return res.status(500).json({ error: getErrorMessage(error) });
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
      return res.status(500).json({ error: getErrorMessage(error) });
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
      return res.status(500).json({ error: getErrorMessage(error) });
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
