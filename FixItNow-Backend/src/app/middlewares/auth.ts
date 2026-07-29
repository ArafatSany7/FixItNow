import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../errors/ApiError';
import catchAsync from '../../shared/catchAsync';
import prisma from '../../shared/prisma';

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    let verifiedUser;
    try {
      verifiedUser = jwt.verify(token, config.jwt.secret as string) as JwtPayload;
    } catch (error) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token!');
    }

    const { email, role } = verifiedUser;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
    }

    if (user.isBanned) {
      throw new ApiError(httpStatus.FORBIDDEN, 'This user is banned!');
    }

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden access!');
    }

    req.user = verifiedUser;
    next();
  });
};

export default auth;
