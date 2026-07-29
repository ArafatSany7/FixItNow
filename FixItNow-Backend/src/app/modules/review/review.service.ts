import prisma from '../../../shared/prisma';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';

const createReview = async (userEmail: string, payload: any) => {
  const customer = await prisma.user.findUnique({ where: { email: userEmail } });

  if (!customer || customer.role !== 'CUSTOMER') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Only customers can leave reviews');
  }

  const booking = await prisma.booking.findUnique({
    where: { id: payload.bookingId },
  });

  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  if (booking.customerId !== customer.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized to review this booking');
  }

  if (booking.status !== 'COMPLETED') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You can only leave a review after the job is COMPLETED');
  }

  // Check if review already exists
  const existingReview = await prisma.review.findUnique({
    where: { bookingId: booking.id },
  });

  if (existingReview) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You have already reviewed this booking');
  }

  const result = await prisma.review.create({
    data: {
      bookingId: booking.id,
      customerId: customer.id,
      technicianId: booking.technicianId,
      rating: payload.rating,
      comment: payload.comment,
    },
  });

  return result;
};

export const ReviewService = {
  createReview,
  getReviewsByTechnicianId: async (technicianId: string) => {
    const result = await prisma.review.findMany({
      where: { technicianId },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            profileImg: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    return result;
  }
};
