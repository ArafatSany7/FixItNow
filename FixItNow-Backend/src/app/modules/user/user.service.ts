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

const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    where: {
      role: {
        in: ['CUSTOMER', 'TECHNICIAN'],
      },
    },
  });
  
  const result = users.map(user => {
    const { password, ...userData } = user;
    return userData;
  });

  return result;
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

export const UserService = {
  getMyProfile,
  updateMyProfile,
  getAllUsers,
  changeUserStatus,
};
