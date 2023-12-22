export type AttestItem = { title: string; description: string };
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
  title: string;
  updated_at: string;
}
