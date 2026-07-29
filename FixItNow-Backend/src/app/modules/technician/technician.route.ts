import express from 'express';
import { TechnicianController } from './technician.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { TechnicianValidation } from './technician.validation';
import { Role } from '@prisma/client';

const router = express.Router();

router.post(
  '/profile',
  auth(Role.TECHNICIAN),
  validateRequest(TechnicianValidation.createProfileSchema),
  TechnicianController.createProfile
);

router.patch(
  '/profile',
  auth(Role.TECHNICIAN),
  validateRequest(TechnicianValidation.updateProfileSchema),
  TechnicianController.updateProfile
);

router.get(
  '/',
  TechnicianController.getAllTechnicians
);

router.get(
  '/:id',
  TechnicianController.getSingleTechnician
);

export const TechnicianRoutes = router;
