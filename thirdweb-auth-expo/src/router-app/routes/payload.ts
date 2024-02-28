import type { ThirdwebAuthContext } from "../types";
import { PayloadBodySchema } from "../types";
import { ExpoRequest, ExpoResponse } from "expo-router/server";

export async function POST(req: ExpoRequest, ctx: ThirdwebAuthContext) {
  const body = await req.json();
  console.log({ request: body });

  const parsedPayload = PayloadBodySchema.safeParse(body);
  console.log(parsedPayload?.error);

  if (!parsedPayload.success) {
    return new ExpoResponse("Please provide an address", {
      status: 400,
    });
  }

  // TODO: Add nonce generation + custom expiration + invalid before
  const payload = await ctx.auth.payload({
    address: parsedPayload.data.address,
    statement: ctx.authOptions?.statement,
    uri: ctx.authOptions?.uri,
    version: ctx.authOptions?.version,
    chainId: parsedPayload.data.chainId || ctx.authOptions?.chainId,
    resources: ctx.authOptions?.resources,
    expirationTime: ctx.authOptions?.loginPayloadDurationInSeconds
      ? new Date(
          Date.now() + 1000 * ctx.authOptions.loginPayloadDurationInSeconds
        )
      : undefined,
  });

  return ExpoResponse.json({
    payload,
  });
}
