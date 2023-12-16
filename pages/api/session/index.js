import { validateSession } from "@/lib/prisma/session";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const token = req.body.token;
      const {
        body: { username, error },
      } = await validateSession(token);
      if (error) throw new Error(error);
      return res.status(200).json({ username });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["POST"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
