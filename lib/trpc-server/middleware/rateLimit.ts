/**
 * Rate limiting middleware for tRPC routes
 * Uses a simple in-memory store with cleanup
 */

import { TRPCError } from "@trpc/server";
import { initTRPC } from "@trpc/server";
import type { Context } from "../context";

const t = initTRPC.context<Context>().create();

// In-memory store for rate limiting
type RateLimitStore = {
  [key: string]: {
    count: number;
    resetTime: number;
  };
};

const store: RateLimitStore = {};

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach((key) => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}, 5 * 60 * 1000);

// Rate limit configuration
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 100; // 100 requests per window

export const rateLimit = t.middleware(async ({ ctx, next }) => {
  // Skip rate limiting if context is not valid or doesn't have JWT
  if (!ctx.valid || !("parsedJWT" in ctx)) {
    return next();
  }

  // The sub field in the JWT contains the wallet address
  const address = ctx.parsedJWT.sub;
  if (!address) {
    return next();
  }

  const now = Date.now();

  // Initialize or reset if window has passed
  if (!store[address] || store[address].resetTime < now) {
    store[address] = {
      count: 0,
      resetTime: now + WINDOW_MS,
    };
  }

  // Increment request count
  store[address].count++;

  // Check if over limit
  if (store[address].count > MAX_REQUESTS) {
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: `Rate limit exceeded. Try again in ${Math.ceil(
        (store[address].resetTime - now) / 1000 / 60
      )} minutes.`,
    });
  }

  // Continue to next middleware/procedure
  return next();
});
