export interface Accommodation {
  id?: number;
  name: string;
  description: string;
  location: string;
  amenities: string[];
  photos: string;
  minGuests: number;
  maxGuests: number;
  type: 'STUDIO' | 'ROOM' | 'APARTMENT';
  approved?: boolean;
}
