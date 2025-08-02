import {
  getUsers,
  getUser,
  searchUsersByName,
  createUser,
  updateUser,
  deleteUser,
} from '@/lib/prisma/users';
import { getErrorMessage } from '@/utils/error';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const userID = req.query.id as string;
    const search = req.query.search as string;
    if (userID) {
      try {
        const { user, error } = await getUser(userID);
        if (error) throw new Error(error);
        return res.status(200).json({ user });
      } catch (error) {
        return res.status(500).json({ error: getErrorMessage(error) });
      }
    }
    if (search) {
      try {
        const { users, count, error } = await searchUsersByName(search);
        if (error) throw new Error(error);
        return res.status(200).json({ count, users });
      } catch (error) {
        return res.status(500).json({ error: getErrorMessage(error) });
      }
    } else {
      try {
        const { users, count, error } = await getUsers();
        if (error) throw new Error(error);
        return res.status(200).json({ count, users });
      } catch (error) {
        return res.status(500).json({ error: getErrorMessage(error) });
      }
    }
  }

  if (req.method === 'POST') {
    try {
      const data = req.body.user;
      const { user, error } = await createUser(data);
      if (error) throw new Error(error);
      return res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: getErrorMessage(error) });
    }
  }

  if (req.method === 'PATCH') {
    const { userID, data } = req.body;

    if (!userID) {
      return res.status(400).json({ error: 'userID is required.' });
    }

    try {
      const { user, error } = await updateUser(userID, data);
      if (error) throw new Error(error);
      return res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: getErrorMessage(error) });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const data = req.body.userID;
      const { user, error } = await deleteUser(data);
      if (error) throw new Error(error);
      return res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: getErrorMessage(error) });
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
