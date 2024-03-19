import { Profile } from "@prisma/client";
export { Attestation } from "@lib/trpc-server/routers/_app";

export type AttestItem = { title: string; description: string };
export type ReviewItem = { comment: string; rating: number };

export const isAttestItem = (
  item: AttestItem | ReviewItem
): item is AttestItem => {
  return (item as AttestItem).description !== undefined;
};
export const isReviewItem = (
  item: AttestItem | ReviewItem
): item is ReviewItem => {
  return (item as ReviewItem).rating !== undefined;
};

export const isProfile = (attester: string | Profile): attester is Profile => {
  return !!(attester as Profile).address;
};
