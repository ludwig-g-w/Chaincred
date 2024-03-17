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
export interface ProfileListItem {
  title: string;
  count: number;
  id: string;
  address: string;
  description: string;
  locationCoords: string;
  imageUrl: string;
}

export interface Profile {
  address: string;
  created_at: string;
  description: string;
  id: number;
  image_url: string;
  location_coords: string;
  location_name: string;
  title: string;
  updated_at: string;
}
