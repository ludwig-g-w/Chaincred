import { getUser } from "./auth/[...thirdweb]";
import { ExpoRequest, ExpoResponse } from "expo-router/server";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getUser(req);

  if (!user) {
    return res.status(401).json({
      message: "Not authorized.",
    });
  }

  return res.status(200).json({
    message: `This is a secret for ${user.address}.`,
  });
};

export default handler;
