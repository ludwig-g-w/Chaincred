import { PrismaClient, Profile } from "@prisma/client";

export const prisma = new PrismaClient();

export async function getProfileByAddress(address: string) {
  try {
    const profile = await prisma.profile.findUnique({
      where: { address },
    });
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
    return profile;
  } catch (error) {
    console.error("Error updating profile", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function getAllProfiles() {
  try {
    const profiles = await prisma.profile.findMany();
    return profiles;
  } catch (error) {
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function getProfilesByAddresses(addresses: string[]) {
  if (!addresses || addresses.length === 0) {
    return [];
  }

  try {
    const profiles = await prisma.profile.findMany({
      where: {
        address: { in: addresses },
      },
    });
    return profiles;
  } catch (error) {
    throw error; // Rethrow the error to be handled by the caller
  }
}
