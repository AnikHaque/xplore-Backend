import { Blog } from "@prisma/client";
import prisma from "../../instance/prisma";

const createBlog = async (payload: Blog): Promise<Blog> => {
  const result = await prisma.blog.create({
    data: payload,
  });

  return result;
};

const getAllBlog = async (): Promise<Blog[]> => {
  const result = await prisma.blog.findMany();
  return result;
};

const getSingleBlog = async (id: string): Promise<Blog | null> => {
  const result = await prisma.blog.findFirst({
    where: {
      id,
    },
  });

  return result;
};

const updateBlog = async (
  id: string,
  payload: Partial<Blog>
): Promise<Blog> => {
  const result = await prisma.blog.update({
    where: { id },
    data: payload,
  });

  return result;
};

const deleteBlog = async (id: string): Promise<Blog> => {
  const result = await prisma.blog.delete({
    where: { id },
  });

  return result;
};

export const BlogServices = {
  createBlog,
  getAllBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
