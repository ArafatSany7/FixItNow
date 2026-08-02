import prisma from '../../../shared/prisma';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';

const getMyProfile = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      technicianProfile: true,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const { password, ...userData } = user;
  return userData;
};

const updateMyProfile = async (email: string, payload: any) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const updatedUser = await prisma.user.update({
    where: { email },
    data: payload,
  });

  const { password, ...userData } = updatedUser;
  return userData;
};

const getAllUsers = async (filters: any, options: any) => {
  const { search, ...filterData } = filters;
  const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = options;
  const skip = (page - 1) * limit;

  const andConditions: any[] = [
    { role: { in: ['CUSTOMER', 'TECHNICIAN'] } }
  ];

  if (search) {
    andConditions.push({
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ],
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: { equals: filterData[key] },
      })),
    });
  }

  const whereConditions = { AND: andConditions };

  const users = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: Number(limit),
    orderBy: {
      [sortBy]: sortOrder,
    },
  });
  
  const total = await prisma.user.count({ where: whereConditions });

  const result = users.map(user => {
    const { password, ...userData } = user;
    return userData;
  });

  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
    },
    data: result,
  };
};

const changeUserStatus = async (id: string, isBanned: boolean) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { isBanned },
  });

  const { password, ...userData } = updatedUser;
  return userData;
};

const getAdminStats = async () => {
  const totalUsers = await prisma.user.count({ where: { role: 'CUSTOMER' } });
  const totalTechnicians = await prisma.user.count({ where: { role: 'TECHNICIAN' } });
  const totalBookings = await prisma.booking.count();
  
  const paymentStats = await prisma.payment.aggregate({
    _sum: { amount: true },
    where: { status: 'PAID' }
  });

  return {
    totalUsers,
    totalTechnicians,
    totalBookings,
    totalRevenue: paymentStats._sum.amount || 0,
  };
};

export const UserService = {
  getMyProfile,
  updateMyProfile,
  getAllUsers,
  changeUserStatus,
  getAdminStats,
};
