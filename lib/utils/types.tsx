import { Profile } from "@prisma/client";
export { Profile };
export { Attestation } from "@lib/trpc-server/routers/_app";

export type AttestItem = { title: string; description: string };
export type ReviewItem = { message: string; review: number };

export const isAttestItem = (
  item: AttestItem | ReviewItem
): item is AttestItem => {
  return (item as AttestItem).description !== undefined;
};
export const isReviewItem = (
  item?: AttestItem | ReviewItem | null
): item is ReviewItem => {
  return (item as ReviewItem).review !== undefined;
};

export const isProfile = (attester: string | Profile): attester is Profile => {
  return !!(attester as Profile).address;
};
