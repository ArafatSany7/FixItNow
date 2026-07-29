import prisma from '../../../shared/prisma';
import { ServiceCategory } from '@prisma/client';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';

const createCategory = async (payload: ServiceCategory) => {
  const isExist = await prisma.serviceCategory.findUnique({
    where: { title: payload.title },
  });

  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category title already exists!');
  }

  const result = await prisma.serviceCategory.create({
    data: payload,
  });
  return result;
};

const getAllCategories = async () => {
  const result = await prisma.serviceCategory.findMany();
  return result;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
};
