import { getShows } from "@/lib/prisma/shows";

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

  res.setHeader("Allow", ["GET"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
