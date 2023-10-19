export type IRoom = {
  title: string;
  thumbnail: {
    public_id?: string;
    url?: string;
  };
  facilities: Array<{ title: string }>;
  category: 'delux' | 'delux king' | 'delux twin';
  bedSize?: number;
  pricing?: number;
  roomSize?: string;
  description?: string;
};
export type ICategoryFilters = {
  searchTerm?: string;
  category?: string;
};
