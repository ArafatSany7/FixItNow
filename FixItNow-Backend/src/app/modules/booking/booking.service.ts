import prisma from '../../../shared/prisma';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import { BookingStatus } from '@prisma/client';

const createBooking = async (userEmail: string, payload: any) => {
  const customer = await prisma.user.findUnique({ where: { email: userEmail } });
  
  if (!customer || customer.role !== 'CUSTOMER') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Only customers can book a service');
  }

  const technician = await prisma.user.findUnique({
    where: { id: payload.technicianId, role: 'TECHNICIAN' },
  });

  if (!technician) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Technician not found');
  }

  const existingBooking = await prisma.booking.findFirst({
    where: {
      technicianId: payload.technicianId,
      date: new Date(payload.date),
      timeSlot: payload.timeSlot,
      status: {
        notIn: [BookingStatus.CANCELLED, BookingStatus.DECLINED]
      }
    }
  });

  if (existingBooking) {
    throw new ApiError(httpStatus.CONFLICT, 'This time slot is already booked for the selected technician');
  }

  const result = await prisma.booking.create({
    data: {
      customerId: customer.id,
      technicianId: payload.technicianId,
      date: new Date(payload.date),
      timeSlot: payload.timeSlot,
    },
    include: {
      customer: { select: { id: true, name: true, email: true, contactNo: true } },
      technician: { select: { id: true, name: true, email: true, contactNo: true } },
    },
  });

  return result;
};

const getCustomerBookings = async (userEmail: string) => {
  const customer = await prisma.user.findUnique({ where: { email: userEmail } });

  if (!customer || customer.role !== 'CUSTOMER') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Only customers can view their bookings');
  }

  const result = await prisma.booking.findMany({
    where: { customerId: customer.id },
    include: {
      technician: {
        select: {
          id: true,
          name: true,
          email: true,
          contactNo: true,
        },
      },
      payment: true,
      review: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return result;
};

const getTechnicianBookings = async (userEmail: string) => {
  const technician = await prisma.user.findUnique({ where: { email: userEmail } });

  if (!technician || technician.role !== 'TECHNICIAN') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Only technicians can view incoming bookings');
  }

  const result = await prisma.booking.findMany({
    where: { technicianId: technician.id },
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
          contactNo: true,
          address: true,
        },
      },
      payment: true,
      review: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return result;
};

const changeBookingStatus = async (userEmail: string, bookingId: string, status: any) => {
  const technician = await prisma.user.findUnique({ where: { email: userEmail } });

  if (!technician || technician.role !== 'TECHNICIAN') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Only technicians can update booking status');
  }

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });

  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  if (booking.technicianId !== technician.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized to update this booking');
  }

  const result = await prisma.booking.update({
    where: { id: bookingId },
    data: { status },
  });

  return result;
};

const cancelBooking = async (userEmail: string, bookingId: string) => {
  const customer = await prisma.user.findUnique({ where: { email: userEmail } });

  if (!customer || customer.role !== 'CUSTOMER') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Only customers can cancel their bookings');
  }

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });

  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  if (booking.customerId !== customer.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized to cancel this booking');
  }

  if (booking.status !== BookingStatus.PENDING && booking.status !== BookingStatus.ACCEPTED) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You can only cancel PENDING or ACCEPTED bookings');
  }

  const result = await prisma.booking.update({
    where: { id: bookingId },
    data: { status: BookingStatus.CANCELLED },
  });

  return result;
};

const getAllBookings = async () => {
  const result = await prisma.booking.findMany({
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
          contactNo: true,
        },
      },
      technician: {
        select: {
          id: true,
          name: true,
          email: true,
          contactNo: true,
        },
      },
      service: {
        select: {
          id: true,
          title: true,
        },
      },
      payment: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return result;
};

export const BookingService = {
  createBooking,
  getCustomerBookings,
  getTechnicianBookings,
  changeBookingStatus,
  cancelBooking,
  getAllBookings,
};
