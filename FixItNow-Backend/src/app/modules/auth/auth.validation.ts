import { z } from 'zod';

const registerUserSchema = z.object({
  body: z.object({
    name: z.string({ message: 'Name is required' }),
    email: z.string({ message: 'Email is required' }).email('Invalid email address'),
    password: z.string({ message: 'Password is required' }).min(6, 'Password must be at least 6 characters long'),
    role: z.enum(['CUSTOMER', 'TECHNICIAN'], { message: 'Role is required and must be valid' }),
    contactNo: z.string().optional(),
    address: z.string().optional(),
    profileImg: z.string().optional(),
  }),
});

const loginUserSchema = z.object({
  body: z.object({
    email: z.string({ message: 'Email is required' }).email('Invalid email address'),
    password: z.string({ message: 'Password is required' }),
  }),
});

export const AuthValidation = {
  registerUserSchema,
  loginUserSchema,
};
