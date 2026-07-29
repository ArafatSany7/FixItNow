import express from 'express';
import { ReviewController } from './review.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewValidation } from './review.validation';
import { Role } from '@prisma/client';

const router = express.Router();

router.post(
  '/',
  auth(Role.CUSTOMER),
  validateRequest(ReviewValidation.createReviewSchema),
  ReviewController.createReview
);

export const ReviewRoutes = router;
