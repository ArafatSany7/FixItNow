import express from 'express';
import { CategoryController } from './category.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidation } from './category.validation';
import { Role } from '@prisma/client';

const router = express.Router();

router.post(
  '/',
  auth(Role.ADMIN),
  validateRequest(CategoryValidation.createCategorySchema),
  CategoryController.createCategory
);

router.get(
  '/',
  CategoryController.getAllCategories
);

export const CategoryRoutes = router;
