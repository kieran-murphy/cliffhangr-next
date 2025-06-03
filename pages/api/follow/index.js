import { getFollows, getFollow, createFollow, deleteFollow } from '@/lib/prisma/follows';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const followID = req.query.id;
    if (followID) {
      try {
        const { follow, error } = await getFollow(followID);
        if (error) throw new Error(error);
        return res.status(200).json({ follow });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    } else {
      try {
        const { follows, count, error } = await getFollows();
        if (error) throw new Error(error);
        return res.status(200).json({ count, follows });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }
  }

  if (req.method === 'POST') {
    try {
      const data = req.body.follow;
      const { follow, error } = await createFollow(data);
      if (error) throw new Error(error);
      return res.status(200).json({ follow });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const data = req.body.followID;
      const { follow, error } = await deleteFollow(data);
      if (error) throw new Error(error);
      return res.status(200).json({ follow });
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
