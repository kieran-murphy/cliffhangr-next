import {
  getCommentOnReviews,
  getCommentOnReview,
  createCommentOnReview,
  updateCommentOnReview,
  deleteCommentOnReview,
} from '@/lib/prisma/commentOnReviews';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const commentOnReviewID = req.query.id;
    if (commentOnReviewID) {
      try {
        const { commentOnReview, error } = await getCommentOnReview(commentOnReviewID);
        if (error) throw new Error(error);
        return res.status(200).json({ commentOnReview });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    } else {
      try {
        const { commentOnReviews, count, error } = await getCommentOnReviews();
        if (error) throw new Error(error);
        return res.status(200).json({ count, commentOnReviews });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }
  }

  if (req.method === 'POST') {
    try {
      const data = req.body.commentOnReview;
      const { commentOnReview, error } = await createCommentOnReview(data);
      if (error) throw new Error(error);
      return res.status(200).json({ commentOnReview });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'PUT') {
    try {
      const commentOnReviewID = req.query.id; // Assuming the ID is in the query
      const data = req.body; // Assuming the updated data is in the body
      const { commentOnReview, error } = await updateCommentOnReview(commentOnReviewID, data);
      if (error) throw new Error(error);
      return res.status(200).json({ commentOnReview });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const data = req.body.commentOnReviewID;
      const { commentOnReview, error } = await deleteCommentOnReview(data);
      if (error) throw new Error(error);
      return res.status(200).json({ commentOnReview });
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
