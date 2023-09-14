import { getShows, createShow, deleteShow } from "@/lib/prisma/shows";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { shows, error } = await getShows();
      if (error) throw new Error(error);
      return res.status(200).json({ shows });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "POST") {
    try {
      const data = req.body.show;
      const { show, error } = await createShow(data);
      if (error) throw new Error(error);
      return res.status(200).json({ show });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      const data = req.body.showID;
      const { show, error } = await deleteShow(data);
      if (error) throw new Error(error);
      return res.status(200).json({ show });
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  }

  res.setHeader("Allow", ["GET", "POST", "DELETE"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
