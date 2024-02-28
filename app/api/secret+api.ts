import { getUser } from "./auth/[...thirdweb]+api";
import { ExpoRequest, ExpoResponse } from "expo-router/server";

const handler = async (req: ExpoRequest) => {
  const user = await getUser(req);

  if (!user) {
    return new ExpoResponse("Not authorized.", {
      status: 401,
    });
  }

  return ExpoResponse.json({
    message: `This is a secret for ${user.address}.`,
  });
};

export default handler;
