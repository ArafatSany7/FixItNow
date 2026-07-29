import { z } from 'zod';

const createBookingSchema = z.object({
  body: z.object({
    technicianId: z.string({ message: 'technicianId is required' }),
    date: z.string({ message: 'date is required' }),
    timeSlot: z.string({ message: 'timeSlot is required' }),
  }),
});

const changeBookingStatusSchema = z.object({
  body: z.object({
    status: z.enum(['ACCEPTED', 'DECLINED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'], {
      error: 'Status is required and must be a valid BookingStatus'
    }),
  }),
});

export const BookingValidation = {
  createBookingSchema,
  changeBookingStatusSchema,
};
