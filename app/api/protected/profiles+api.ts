import { getAllProfiles, getProfilesByAddresses } from "@services/db/prisma";
import { ExpoRequest, ExpoResponse } from "expo-router/server";
import { getUser } from "../auth/[...thirdweb]+api";

export const GET = async (req: ExpoRequest) => {
  const user = await getUser(req);

  if (!user) {
    return new ExpoResponse("Not authorized.", {
      status: 401,
    });
  }
  const { searchParams } = new URL(req.url);
  const addresses = searchParams.get("addresses");

  const profiles = addresses
    ? await getProfilesByAddresses(JSON.parse(addresses) as string[])
    : await getAllProfiles();

  return ExpoResponse.json(profiles);
};
