import express from 'express';
import { BookingController } from './booking.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookingValidation } from './booking.validation';
import { Role } from '@prisma/client';

const router = express.Router();

router.post(
  '/',
  auth(Role.CUSTOMER),
  validateRequest(BookingValidation.createBookingSchema),
  BookingController.createBooking
);

router.get(
  '/my-bookings',
  auth(Role.CUSTOMER),
  BookingController.getCustomerBookings
);

router.get(
  '/incoming-bookings',
  auth(Role.TECHNICIAN),
  BookingController.getTechnicianBookings
);

router.patch(
  '/:id/status',
  auth(Role.TECHNICIAN),
  validateRequest(BookingValidation.changeBookingStatusSchema),
  BookingController.changeBookingStatus
);

router.patch(
  '/:id/cancel',
  auth(Role.CUSTOMER),
  BookingController.cancelBooking
);

router.get(
  '/',
  auth(Role.ADMIN),
  BookingController.getAllBookings
);

export const BookingRoutes = router;
