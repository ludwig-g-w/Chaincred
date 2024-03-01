import {
  THIRDWEB_AUTH_ACTIVE_ACCOUNT_COOKIE,
  THIRDWEB_AUTH_TOKEN_COOKIE_PREFIX,
} from "../../../constants";
import { Json } from "../../../core";
import { ThirdwebAuthContext, ThirdwebAuthUser } from "../types";
import { ExpoRequest } from "expo-router/server";

// UNUSED
export function getCookie(
  req: ExpoRequest,
  cookie: string
): string | undefined {
  return req?.cookies[cookie];
}
// UNUSED
export function getActiveCookie(req: ExpoRequest): string | undefined {
  if (!req?.cookies) {
    return undefined;
  }

  const activeAccount = getCookie(req, THIRDWEB_AUTH_ACTIVE_ACCOUNT_COOKIE);
  if (activeAccount) {
    return `${THIRDWEB_AUTH_TOKEN_COOKIE_PREFIX}_${activeAccount}`;
  }

  // If active account is not present, then use the old default
  return THIRDWEB_AUTH_TOKEN_COOKIE_PREFIX;
}

/**
 * @internal
 * @param req
 * @returns
 */
export function getToken(req: ExpoRequest): string | undefined {
  const authHeader = req.headers.get("authorization");
  if (authHeader) {
    const authorizationHeader = authHeader.split(" ");
    if (authorizationHeader?.length === 2) {
      return authorizationHeader[1];
    }
  }

  // not relevant for React Native
  // if (!req?.cookies) {
  //   return undefined;
  // }

  const activeCookie = getActiveCookie(req);
  if (!activeCookie) {
    return undefined;
  }

  return getCookie(req, activeCookie);
}

export async function getUser<
  TData extends Json = Json,
  TSession extends Json = Json
>(
  req: ExpoRequest,
  ctx: ThirdwebAuthContext<TData, TSession>
): Promise<ThirdwebAuthUser<TData, TSession> | null> {
  const token = getToken(req);

  if (!token) {
    console.error("Error: No auth token found");
    return null;
  }

  let authenticatedUser: ThirdwebAuthUser<TData, TSession>;
  try {
    authenticatedUser = await ctx.auth.authenticate<TSession>(token, {
      validateTokenId: async (tokenId: string) => {
        if (ctx.authOptions?.validateTokenId) {
          await ctx.authOptions?.validateTokenId(tokenId);
        }
      },
    });
  } catch (err) {
    console.error(`Authenticate Error: ${(err as Error)?.message}`);
    return null;
  }

  if (!ctx.callbacks?.onUser) {
    return authenticatedUser;
  }

  const data = await ctx.callbacks.onUser(authenticatedUser, req);
  if (!data) {
    return authenticatedUser;
  }

  return { ...authenticatedUser, data: data };
}
