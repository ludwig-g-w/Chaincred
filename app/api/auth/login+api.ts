import { thirdwebAuth } from "@lib/services/thirdwebAuth";
import { VerifyLoginPayloadParams } from "thirdweb/auth";

export async function POST(req: Request) {
  const payload: VerifyLoginPayloadParams = await req.json();

  const verifiedPayload = await thirdwebAuth.verifyPayload(payload);

  if (verifiedPayload.valid) {
    const jwt = await thirdwebAuth.generateJWT({
      payload: verifiedPayload.payload,
    });
    return Response.json({ token: jwt });
  }

  return new Response("Failed to login", { status: 400 });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const address = url.searchParams.get("address");
  const chainId = url.searchParams.get("chainId");

  if (!address) {
    return new Response("address required", {
      status: 400,
    });
  }

  return Response.json(
    await thirdwebAuth.generatePayload({
      address,
      chainId: chainId ? parseInt(chainId) : undefined,
    })
  );
}
