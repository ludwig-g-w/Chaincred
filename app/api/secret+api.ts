import { getUser } from "./auth/[...thirdweb]+api";
import { ExpoRequest, ExpoResponse } from "expo-router/server";

export const GET = async (req: ExpoRequest) => {
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
