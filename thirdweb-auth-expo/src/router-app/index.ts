import { Json, ThirdwebAuth as ThirdwebAuthSDK } from "../../core";
import { getUser } from "./helpers/user";
import payloadHandler from "./routes/payload";
import loginHandler from "./routes/login";
import logoutHandler from "./routes/logout";
import userHandler from "./routes/user";
// import switchAccountHandler from "./routes/switch-account";
import { ThirdwebAuthConfig, ThirdwebAuthContext } from "./types";
import { ExpoRequest, ExpoResponse } from "expo-router/server";

export * from "./types";

async function ThirdwebAuthRouter(
  req: ExpoRequest,
  args: { thirdweb: string },
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
    // case "switch-account":
    //   return await switchAccountHandler(req, ctx);
    default:
      return ExpoResponse.json({
        message: "Invalid route for authentication.",
      });
  }
}

export function ThirdwebAuth<
  TData extends Json = Json,
  TSession extends Json = Json
>(cfg: ThirdwebAuthConfig<TData, TSession>) {
  const ctx = {
    ...cfg,
    auth: new ThirdwebAuthSDK(cfg.wallet, cfg.domain),
  };

  return {
    ThirdwebAuthHandler: function (
      req: ExpoRequest,
      params: { thirdweb: string }
    ) {
      return ThirdwebAuthRouter(req, params, ctx as ThirdwebAuthContext);
    },
    getUser: (req: ExpoRequest) => {
      return getUser(req, ctx);
    },
  };
}
