import {
  THIRDWEB_AUTH_ACTIVE_ACCOUNT_COOKIE,
  THIRDWEB_AUTH_TOKEN_COOKIE_PREFIX,
} from "../../../constants";
import type { GenerateOptionsWithOptionalDomain } from "../../../core";
import type { ThirdwebAuthContext } from "../types";
import { LoginPayloadBodySchema } from "../types";
import { serialize } from "cookie";
import { ExpoRequest, ExpoResponse } from "expo-router/server";

export async function POST(req: ExpoRequest, ctx: ThirdwebAuthContext) {
  const body = await req.json();
  const parsedPayload = LoginPayloadBodySchema.safeParse(body);

  // Get signed login payload from the frontend
  if (!parsedPayload.success) {
    return new ExpoResponse("Please provide an address", {
      status: 400,
    });
    // return res.status(400).json({ error: "Invalid login payload" });
  }

  const payload = parsedPayload.data.payload;

  const validateNonce = async (nonce: string) => {
    if (ctx.authOptions?.validateNonce) {
      await ctx.authOptions?.validateNonce(nonce);
    }
  };

  const getSession = async (address: string) => {
    if (ctx.callbacks?.onLogin) {
      return ctx.callbacks.onLogin(address, req);
    }
  };

  const expirationTime = ctx.authOptions?.tokenDurationInSeconds
    ? new Date(Date.now() + 1000 * ctx.authOptions.tokenDurationInSeconds)
    : undefined;

  const generateOptions: GenerateOptionsWithOptionalDomain = {
    verifyOptions: {
      statement: ctx.authOptions?.statement,
      uri: ctx.authOptions?.uri,
      version: ctx.authOptions?.version,
      chainId: ctx.authOptions?.chainId,
      validateNonce,
      resources: ctx.authOptions?.resources,
    },
    expirationTime,
    session: getSession,
  };

  let token: string;
  try {
    // Generate an access token with the SDK using the signed payload
    token = await ctx.auth.generate(payload, generateOptions);
  } catch (err: any) {
    if (err.message) {
      return new ExpoResponse(err.message, {
        status: 400,
      });
    } else if (typeof err === "string") {
      return new ExpoResponse(err, {
        status: 400,
      });
    } else {
      return new ExpoResponse("Invalid login payload", {
        status: 400,
      });
    }
  }

  if (ctx.callbacks?.onToken) {
    await ctx.callbacks.onToken(token, req);
  }

  const {
    payload: { exp },
  } = ctx.auth.parseToken(token);

  return new ExpoResponse(JSON.stringify({ token }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": JSON.stringify([
        serialize(
          `${THIRDWEB_AUTH_TOKEN_COOKIE_PREFIX}_${payload.payload.address}`,
          token,
          {
            domain: ctx.cookieOptions?.domain,
            path: ctx.cookieOptions?.path || "/",
            sameSite: ctx.cookieOptions?.sameSite || "none",
            expires: new Date(exp * 1000),
            httpOnly: true,
            secure: ctx.cookieOptions?.secure || true,
          }
        ),
        serialize(
          THIRDWEB_AUTH_ACTIVE_ACCOUNT_COOKIE,
          payload.payload.address,
          {
            domain: ctx.cookieOptions?.domain,
            path: ctx.cookieOptions?.path || "/",
            sameSite: ctx.cookieOptions?.sameSite || "none",
            expires: new Date(exp * 1000),
            httpOnly: true,
            secure: ctx.cookieOptions?.secure || true,
          }
        ),
      ]),
    },
  });
}
