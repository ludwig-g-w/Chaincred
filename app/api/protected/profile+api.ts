import { getProfileByAddress, setOrModifyProfile } from "@services/db/prisma";
import { getUser } from "../auth/[...thirdweb]+api";
import { ExpoRequest, ExpoResponse } from "expo-router/server";

export const GET = async (req: ExpoRequest) => {
  const user = await getUser(req);

  if (!user) {
    return new ExpoResponse("Not authorized.", {
      status: 401,
    });
  }
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");
  if (!address) return new ExpoResponse("address is empty", { status: 400 });
  try {
    const profile = await getProfileByAddress(address);
    if (!profile) return new ExpoResponse("no profile found", { status: 400 });
    return ExpoResponse.json(profile);
  } catch (error) {}
};

export const POST = async (req: ExpoRequest) => {
  const user = await getUser(req);

  if (!user) {
    return new ExpoResponse("Not authorized.", {
      status: 401,
    });
  }
  const body = await req.json();
  if (!body) return new ExpoResponse("object is empty", { status: 400 });
  try {
    const profile = await setOrModifyProfile(body);
    return ExpoResponse.json(profile);
  } catch (error) {}
};
