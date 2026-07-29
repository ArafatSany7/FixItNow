import { z } from 'zod';

const createCategorySchema = z.object({
  body: z.object({
    title: z.string({ message: 'Title is required' }),
    description: z.string({ message: 'Description is required' }),
  }),
});

export const CategoryValidation = {
  createCategorySchema,
};
