import prisma from '../../../shared/prisma';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';

const createProfile = async (email: string, payload: any) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || user.role !== 'TECHNICIAN') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Only technicians can create a profile');
  }

  const existingProfile = await prisma.technicianProfile.findUnique({
    where: { userId: user.id },
  });

  if (existingProfile) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Technician profile already exists for this user');
  }

  const result = await prisma.technicianProfile.create({
    data: {
      userId: user.id,
      ...payload,
    },
    include: {
      category: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          contactNo: true,
          address: true,
          profileImg: true,
        },
      },
    },
  });

  return result;
};

const updateProfile = async (email: string, payload: any) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { technicianProfile: true },
  });

  if (!user || user.role !== 'TECHNICIAN' || !user.technicianProfile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Technician profile not found');
  }

  const result = await prisma.technicianProfile.update({
    where: { id: user.technicianProfile.id },
    data: payload,
    include: {
      category: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          contactNo: true,
          address: true,
          profileImg: true,
        },
      },
    },
  });

  return result;
};

const getAllTechnicians = async (query: any) => {
  const { searchTerm, categoryId, minPrice, maxPrice, page = 1, limit = 10, sortBy, sortOrder } = query;

  const skip = (Number(page) - 1) * Number(limit);

  const andConditions: any[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: [
        { skills: { has: searchTerm } },
        { user: { name: { contains: searchTerm, mode: 'insensitive' } } },
        { user: { address: { contains: searchTerm, mode: 'insensitive' } } },
      ],
    });
  }

  if (categoryId) {
    andConditions.push({ categoryId });
  }

  if (minPrice || maxPrice) {
    andConditions.push({
      pricing: {
        ...(minPrice && { gte: Number(minPrice) }),
        ...(maxPrice && { lte: Number(maxPrice) }),
      },
    });
  }

  const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.technicianProfile.findMany({
    where: whereConditions,
    skip,
    take: Number(limit),
    orderBy: sortBy && sortOrder ? { [sortBy as string]: sortOrder } : { createdAt: 'desc' },
    include: {
      category: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          contactNo: true,
          address: true,
          profileImg: true,
          reviewsReceived: {
            select: {
              rating: true,
            },
          },
        },
      },
    },
  });

  const total = await prisma.technicianProfile.count({
    where: whereConditions,
  });

  const dataWithRatings = result.map((profile) => {
    const reviews = profile.user.reviewsReceived || [];
    const reviewCount = reviews.length;
    const averageRating =
      reviewCount > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount
        : 0;

    const { reviewsReceived, ...userWithoutReviews } = profile.user as any;

    return {
      ...profile,
      user: userWithoutReviews,
      averageRating: Number(averageRating.toFixed(1)),
      reviewCount,
    };
  });

  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
    },
    data: dataWithRatings,
  };
};

const getSingleTechnician = async (id: string) => {
  const result = await prisma.technicianProfile.findUnique({
    where: { id },
    include: {
      category: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          contactNo: true,
          address: true,
          profileImg: true,
        },
      },
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Technician profile not found');
  }

  return result;
};

export const TechnicianService = {
  createProfile,
  updateProfile,
  getAllTechnicians,
  getSingleTechnician,
};
