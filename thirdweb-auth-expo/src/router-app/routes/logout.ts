import { ExpoRequest, ExpoResponse } from "expo-router/server";
import { getToken, getUser } from "../helpers/user";
import type { ThirdwebAuthContext } from "../types";

export default async function handler(
  req: ExpoRequest,
  ctx: ThirdwebAuthContext
) {
  if (req.method !== "POST") {
    return Response.json(
      { error: "Invalid method. Only POST supported" },
      { status: 405 }
    );
  }
  const token = getToken(req);
  if (!token) {
    return new ExpoResponse("No logged in user to logout", {
      status: 400,
    });
  }

  if (ctx.callbacks?.onLogout) {
    const user = await getUser(req, ctx);
    if (user) {
      await ctx.callbacks.onLogout(user, req);
    }
  }

  return ExpoResponse.json({ message: "Successfully logged out" });
}
