import { validateLogin } from "@/lib/prisma/login";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const data = req.body.login;
      const { token, error } = await validateLogin(data);
      if (error) throw new Error(error);
      return res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["POST"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
