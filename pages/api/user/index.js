import { getUsers, createUser, deleteUser } from "@/lib/prisma/users";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { users, error } = await getUsers();
      if (error) throw new Error(error);
      return res.status(200).json({ users });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "POST") {
    try {
      const data = req.body.user;
      const { user, error } = await createUser(data);
      if (error) throw new Error(error);
      return res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      const data = req.body.userID;
      const { user, error } = await deleteUser(data);
      if (error) throw new Error(error);
      return res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  }

  res.setHeader("Allow", ["GET", "POST", "DELETE"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
