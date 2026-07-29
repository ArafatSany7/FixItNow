import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../../config';
import prisma from '../../../shared/prisma';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';

const registerUser = async (payload: any) => {
  const isEmailExist = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (isEmailExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exists!');
  }

  // Hash password
  payload.password = await bcrypt.hash(payload.password, 12);

  const newUser = await prisma.user.create({
    data: payload,
  });

  const { password, ...result } = newUser;
  return result;
};



const loginUser = async (payload: any) => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  if (user.isBanned) {
    throw new ApiError(httpStatus.FORBIDDEN, 'This user is banned!');
  }

  const isPasswordMatched = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid password!');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(jwtPayload, config.jwt.secret as string, {
    expiresIn: config.jwt.expires_in as any,
  });

  const { password, ...userData } = user;

  return {
    token,
    user: userData,
  };
};

export const AuthService = {
  registerUser,
  loginUser,
};
