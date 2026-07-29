import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { Role } from '@prisma/client';

const router = express.Router();

router.get(
  '/profile',
  auth(Role.ADMIN, Role.CUSTOMER, Role.TECHNICIAN),
  UserController.getMyProfile
);

router.patch(
  '/profile',
  auth(Role.ADMIN, Role.CUSTOMER, Role.TECHNICIAN),
  validateRequest(UserValidation.updateProfileSchema),
  UserController.updateMyProfile
);

router.get(
  '/',
  auth(Role.ADMIN),
  UserController.getAllUsers
);

router.patch(
  '/:id/status',
  auth(Role.ADMIN),
  validateRequest(UserValidation.changeStatusSchema),
  UserController.changeUserStatus
);

router.get(
  '/admin/stats',
  auth(Role.ADMIN),
  UserController.getAdminStats
);

export const UserRoutes = router;
