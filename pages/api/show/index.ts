import {
  getShows,
  getShow,
  searchShowsByName,
  createShow,
  updateShow,
  deleteShow,
} from '@/lib/prisma/shows';
import { getErrorMessage } from '@/utils/error';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const showID = req.query.id as string;
    const search = req.query.search as string;
    if (showID) {
      try {
        const { show, error } = await getShow(showID);
        if (error) throw new Error(error);
        return res.status(200).json({ show });
      } catch (error) {
        return res.status(500).json({ error: getErrorMessage(error) });
      }
    }
    if (search) {
      try {
        const { shows, count, error } = await searchShowsByName(search);
        if (error) throw new Error(error);
        return res.status(200).json({ count, shows });
      } catch (error) {
        return res.status(500).json({ error: getErrorMessage(error) });
      }
    } else {
      try {
        const { shows, count, error } = await getShows();
        if (error) throw new Error(error);
        return res.status(200).json({ count, shows });
      } catch (error) {
        return res.status(500).json({ error: getErrorMessage(error) });
      }
    }
  }

  if (req.method === 'POST') {
    try {
      const data = req.body.show;
      const { show, error } = await createShow(data);
      if (error) throw new Error(error);
      return res.status(200).json({ show });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: getErrorMessage(error) });
    }
  }

  if (req.method === 'PATCH') {
    const { showID, data } = req.body;

    if (!showID) {
      return res.status(400).json({ error: 'showID is required.' });
    }

    try {
      const { show, error } = await updateShow(showID, data);
      if (error) throw new Error(error);
      return res.status(200).json({ show });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: getErrorMessage(error) });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const data = req.body.showID;
      const { show, error } = await deleteShow(data);
      if (error) throw new Error(error);
      return res.status(200).json({ show });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: getErrorMessage(error) });
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
