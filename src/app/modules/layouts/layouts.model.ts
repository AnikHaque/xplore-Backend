import { Schema, model } from 'mongoose';
import { IBannerImage, IBlog, ICategory, ILayout } from './layouts.interface';

const faqSchema = new Schema({
  question: String,
  answer: String,
});
const categorySchema = new Schema<ICategory>({
  title: { type: String },
});
const bannerImageSchema = new Schema<IBannerImage>({
  public_id: { type: String },
  url: { type: String },
});
const layoutSchema = new Schema<ILayout>(
  {
    type: { type: String },
    faq: [faqSchema],
    categories: [categorySchema],
    banner: {
      image: bannerImageSchema,
      title: { type: String },
      subTitle: {
        type: String,
      },
    },
  },

  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    avatar: {
      public_id: {
        type: String,
        // required: true,
      },
      url: {
        type: String,
        // required: true,
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

const Layout = model<ILayout>('Layout', layoutSchema);
export const Blog = model<IBlog>('Blog', blogSchema);
export const FAQ = model('FAQ', faqSchema);
export default Layout;
