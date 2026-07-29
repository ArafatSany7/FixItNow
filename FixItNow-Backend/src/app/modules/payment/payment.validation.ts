import { z } from 'zod';

const initPaymentSchema = z.object({
  body: z.object({
    bookingId: z.string({ message: 'bookingId is required' }),
  }),
});

export const PaymentValidation = {
  initPaymentSchema,
};
