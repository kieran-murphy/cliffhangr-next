import {
  getFavoriteShows,
  getFavoriteShow,
  createFavoriteShow,
  deleteFavoriteShow,
} from '@/lib/prisma/favoriteShows';
import { getErrorMessage } from '@/utils/error';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const favoriteShowID = req.query.id as string;
    if (favoriteShowID) {
      try {
        const { favoriteShow, error } = await getFavoriteShow(favoriteShowID);
        if (error) throw new Error(error);
        return res.status(200).json({ favoriteShow });
      } catch (error) {
        return res.status(500).json({ error: getErrorMessage(error) });
      }
    } else {
      try {
        const { favoriteShows, count, error } = await getFavoriteShows();
        if (error) throw new Error(error);
        return res.status(200).json({ count, favoriteShows });
      } catch (error) {
        return res.status(500).json({ error: getErrorMessage(error) });
      }
    }
  }

  if (req.method === 'POST') {
    try {
      const data = req.body.favoriteShow;
      const { favoriteShow, error } = await createFavoriteShow(data);
      if (error) throw new Error(error);
      return res.status(200).json({ favoriteShow });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: getErrorMessage(error) });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const data = req.body.favoriteShowID;
      const { favoriteShow, error } = await deleteFavoriteShow(data);
      if (error) throw new Error(error);
      return res.status(200).json({ favoriteShow });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: getErrorMessage(error) });
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
