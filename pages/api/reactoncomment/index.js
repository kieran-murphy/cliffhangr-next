import {
  getReactOnComments,
  createReactOnComment,
  deleteReactOnComment,
} from "@/lib/prisma/reactOnComments";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { reactOnComments, error } = await getReactOnComments();
      if (error) throw new Error(error);
      return res.status(200).json({ reactOnComments });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "POST") {
    try {
      const data = req.body.reactOnComment;
      const { reactOnComment, error } = await createReactOnComment(data);
      if (error) throw new Error(error);
      return res.status(200).json({ reactOnComment });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      const data = req.body.reactOnCommentID;
      const { reactOnComment, error } = await deleteReactOnComment(data);
      if (error) throw new Error(error);
      return res.status(200).json({ reactOnComment });
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  }

  res.setHeader("Allow", ["GET", "POST", "DELETE"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
