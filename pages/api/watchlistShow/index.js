import {
  getWatchlistShows,
  getWatchlistShow,
  createWatchlistShow,
  deleteWatchlistShow,
} from "@/lib/prisma/watchlistShows";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const WatchlistShowID = req.query.id;
    if (WatchlistShowID) {
      try {
        const { WatchlistShow, error } = await getWatchlistShow(
          WatchlistShowID
        );
        if (error) throw new Error(error);
        return res.status(200).json({ WatchlistShow });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    } else {
      try {
        const { watchlistShows, count, error } = await getWatchlistShows();
        if (error) throw new Error(error);
        return res.status(200).json({ count, watchlistShows });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }
  }

  if (req.method === "POST") {
    try {
      const data = req.body.watchlistShow;
      const { watchlistShow, error } = await createWatchlistShow(data);
      if (error) throw new Error(error);
      return res.status(200).json({ watchlistShow });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      const data = req.body.WatchlistShowID;
      const { watchlistShow, error } = await deleteWatchlistShow(data);
      if (error) throw new Error(error);
      return res.status(200).json({ watchlistShow });
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  }

  res.setHeader("Allow", ["GET", "POST", "DELETE"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
