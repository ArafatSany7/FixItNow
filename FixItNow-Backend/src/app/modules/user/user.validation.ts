import { z } from 'zod';

const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
    profileImg: z.string().optional(),
  }),
});

const changeStatusSchema = z.object({
  body: z.object({
    isBanned: z.boolean({ message: 'isBanned field is required' }),
  }),
});

export const UserValidation = {
  updateProfileSchema,
  changeStatusSchema,
};
