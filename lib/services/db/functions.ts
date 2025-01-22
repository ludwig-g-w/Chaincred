import prisma from "./prismaClient";
import { cacheService } from "../cache.service";
import type { Prisma } from "@prisma/client";

export async function getProfileByAddress(
  address: string,
  select?: Prisma.ProfileSelect
) {
  try {
    // Try to get from cache first
    const cachedProfile = cacheService.getProfile(address);
    if (cachedProfile) {
      // If select is specified, filter the cached profile
      if (select) {
        return Object.keys(select).reduce((obj: any, key) => {
          if (select[key as keyof typeof select]) {
            obj[key] = cachedProfile[key as keyof typeof cachedProfile];
          }
          return obj;
        }, {});
      }
      return cachedProfile;
    }

    // If not in cache, fetch from database
    const profile = await prisma.profile.findUnique({
      where: { address },
      select,
    });

    // Cache the full profile if found
    if (profile) {
      // We cache the full profile even if select was specified
      const fullProfile = await prisma.profile.findUnique({
        where: { address },
      });
      if (fullProfile) {
        cacheService.setProfile(address, fullProfile);
      }
    }

    return profile;
  } catch (error) {
    console.error("Error fetching profile", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export type Location = {
  coords?: string;
  name?: string;
};

export async function setOrModifyProfile({
  address,
  title,
  imageUrl,
  description,
  location,
}: {
  address: string;
  title?: string;
  imageUrl?: string;
  description?: string;
  location?: Location;
}) {
  const updateData = {
    title,
    image_url: imageUrl,
    description,
    location_coords: location?.coords,
    address,
    location_name: location?.name,
  };

  try {
    const profile = await prisma.profile.upsert({
      where: { address },
      update: updateData,
      create: updateData,
    });

    // Clear the cache for this profile since it was updated
    cacheService.clearProfileCache(address);

    return profile;
  } catch (error) {
    console.error("Error updating profile", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function getAllProfiles(select?: Prisma.ProfileSelect) {
  try {
    // For getAllProfiles, we don't cache since it's a bulk operation
    const profiles = await prisma.profile.findMany({
      select,
      orderBy: { created_at: "desc" }, // Use the new index for efficient sorting
    });
    return profiles;
  } catch (error) {
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function getProfilesByAddresses(
  addresses: string[],
  select?: Prisma.ProfileSelect
) {
  if (!addresses || addresses.length === 0) {
    return [];
  }

  try {
    // Try to get cached profiles first
    const cachedProfiles = addresses
      .map((addr) => {
        const profile = cacheService.getProfile(addr);
        if (profile && select) {
          // Filter cached profile if select is specified
          return Object.keys(select).reduce((obj: any, key) => {
            if (select[key as keyof typeof select]) {
              obj[key] = profile[key as keyof typeof profile];
            }
            return obj;
          }, {});
        }
        return profile;
      })
      .filter(Boolean);

    // Find addresses that weren't in cache
    const uncachedAddresses = addresses.filter(
      (addr) => !cachedProfiles.find((p) => p?.address === addr)
    );

    if (uncachedAddresses.length === 0) {
      return cachedProfiles;
    }

    // Fetch uncached profiles from database
    const dbProfiles = await prisma.profile.findMany({
      where: {
        address: { in: uncachedAddresses },
      },
      select,
    });

    // Cache the newly fetched profiles (full versions)
    if (uncachedAddresses.length > 0) {
      const fullProfiles = await prisma.profile.findMany({
        where: {
          address: { in: uncachedAddresses },
        },
      });
      fullProfiles.forEach((profile) => {
        if (profile.address) {
          cacheService.setProfile(profile.address, profile);
        }
      });
    }

    // Combine cached and freshly fetched profiles
    return [...cachedProfiles, ...dbProfiles];
  } catch (error) {
    throw error; // Rethrow the error to be handled by the caller
  }
}
