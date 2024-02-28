import { Json, ThirdwebAuth as ThirdwebAuthSDK } from "../../core";
import { getUser } from "./helpers/user";
import { POST as payloadHandler } from "./routes/payload";
import { POST as loginHandler } from "./routes/login";
import { POST as logoutHandler } from "./routes/logout";
import { GET as userHandler } from "./routes/user";
import { POST as switchAccountHandler } from "./routes/switch-account";
import { ThirdwebAuthConfig, ThirdwebAuthContext } from "./types";
import { ExpoRequest, ExpoResponse } from "expo-router/server";

export * from "./types";

async function ThirdwebAuthRouter(
  req: ExpoRequest,
  args: any[],
  ctx: ThirdwebAuthContext
) {
  const action = args?.thirdweb;

  switch (action) {
    case "payload":
      return await payloadHandler(req, ctx);
    case "login":
      return await loginHandler(req, ctx);
    case "user":
      return await userHandler(req, ctx);
    case "logout":
      return await logoutHandler(req, ctx);
    case "switch-account":
      return await switchAccountHandler(req, ctx);
    default:
      return ExpoResponse.json({
        message: "Invalid route for authentication.",
      });
  }
}

export function ThirdwebAuth(cfg) {
  const ctx = {
    ...cfg,
    auth: new ThirdwebAuthSDK(cfg.wallet, cfg.domain),
  };

  return {
    ThirdwebAuthHandler: function (req, mon) {
      return ThirdwebAuthRouter(req, mon, ctx as ThirdwebAuthContext);
    },
    getUser: (req) => {
      return getUser<TData, TSession>(req, ctx);
    },
  };
}
