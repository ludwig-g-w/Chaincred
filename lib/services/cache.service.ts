/**
 * Cache service for storing frequently accessed data
 * Uses node-cache for in-memory caching with TTL support
 */

import NodeCache from "node-cache";
import { Profile } from "@prisma/client";

// Cache durations in seconds
export const CACHE_DURATIONS = {
  PROFILE: 1800, // 30 minutes
  ATTESTATION: 900, // 15 minutes
  GENERAL: 300, // 5 minutes
} as const;

// Cache keys prefixes to avoid collisions
export const CACHE_KEYS = {
  PROFILE: "profile:",
  ATTESTATION: "attestation:",
} as const;

class CacheService {
  private static instance: CacheService;
  private cache: NodeCache;

  private constructor() {
    this.cache = new NodeCache({
      stdTTL: CACHE_DURATIONS.GENERAL,
      checkperiod: 120, // Check for expired keys every 2 minutes
    });
  }

  public static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  // Profile caching
  public getProfile(address: string): Profile | undefined {
    return this.cache.get<Profile>(`${CACHE_KEYS.PROFILE}${address}`);
  }

  public setProfile(address: string, profile: Profile): void {
    this.cache.set(
      `${CACHE_KEYS.PROFILE}${address}`,
      profile,
      CACHE_DURATIONS.PROFILE
    );
  }

  // Generic get/set methods
  public get<T>(key: string): T | undefined {
    return this.cache.get<T>(key);
  }

  public set<T>(key: string, value: T, ttl = CACHE_DURATIONS.GENERAL): void {
    this.cache.set(key, value, ttl);
  }

  // Clear specific cache
  public clearProfileCache(address: string): void {
    this.cache.del(`${CACHE_KEYS.PROFILE}${address}`);
  }

  // Clear all cache
  public clearAll(): void {
    this.cache.flushAll();
  }
}

export const cacheService = CacheService.getInstance();
