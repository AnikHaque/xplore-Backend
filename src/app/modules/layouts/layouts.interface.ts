import { Document } from 'mongoose';

export type IFaqItem = {
  question: string;
  answer: string;
} & Document;
export type ICategory = {
  title: string;
} & Document;
export type IBannerImage = {
  public_id: string;
  url: string;
} & Document;
export type ILayout = {
  type: string;
  faq: IFaqItem[];
  categories: ICategory[];
  banner: {
    image: IBannerImage;
    title: string;
    subTitle: string;
  };
} & Document;
export type IBlog = {
  title: string;
  description: string;
  avatar: {
    public_id?: string;
    url?: string;
  };
};
export type IBlogFilters = {
  searchTerm?: string;
  title?: string;
};
