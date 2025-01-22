import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";
import { rateLimit } from "./middleware/rateLimit";

const t = initTRPC.context<Context>().create();

export const protectedProcedure = t.procedure
  .use(async function isAuthed(opts) {
    const { ctx } = opts;
    if (!ctx.valid) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return opts.next({
      ctx: {
        auth: ctx,
      },
    });
  })
  .use(rateLimit); // Apply rate limiting to all protected procedures

// Base router and procedure helpers
export const router = t.router;
export const openProcedure = t.procedure;
