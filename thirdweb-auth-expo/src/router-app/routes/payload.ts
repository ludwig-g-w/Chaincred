import type { ThirdwebAuthContext } from "../types";
import { PayloadBodySchema } from "../types";

export default async function handler(req: Request, ctx: ThirdwebAuthContext) {
  if (req.method !== "POST") {
    return Response.json(
      { error: "Invalid method. Only POST supported" },
      { status: 405 }
    );
  }
  const body = await req.json();

  const parsedPayload = PayloadBodySchema.safeParse(body);

  if (!parsedPayload.success) {
    return new Response("Please provide an address", {
      status: 400,
    });
  }

  // TODO-NOT_MINE: Add nonce generation + custom expiration + invalid before
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

  return Response.json({
    payload,
  });
}
