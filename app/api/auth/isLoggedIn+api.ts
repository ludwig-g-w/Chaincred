import { thirdwebAuth } from "@lib/services/thirdwebAuth";

export function getToken(req: Request): string | undefined {
  const authHeader = req.headers.get("authorization");
  if (authHeader) {
    const authorizationHeader = authHeader.split(" ");
    if (authorizationHeader?.length === 2) {
      return authorizationHeader[1];
    }
  }
}

export async function GET(req: Request) {
  const jwt = getToken(req);
  if (!jwt) {
    return Response.json(false);
  }

  const authResult = await thirdwebAuth.verifyJWT({ jwt });

  return Response.json(authResult.valid);
}
