import { getUser } from "./auth/[...thirdweb]+api";

export const GET = async (req: Request) => {
  const user = await getUser(req);

  if (!user) {
    return new Response("Not authorized.", {
      status: 401,
    });
  }

  return Response.json({
    message: `This is a secret for ${user.address}.`,
  });
};
