import { PrismaClient } from "@prisma/client";
import { _fetch } from "@services/clientApi";
import { createResource } from "@utils/index";

const prisma = new PrismaClient();

export type Profile = {
  // Define the Profile type according to your Prisma model
  id: number;
  title: string;
  image_url: string;
  description: string;
  location_coords: string;
  created_at: Date;
  updated_at: Date;
  address: string;
  location_name: string;
};

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
