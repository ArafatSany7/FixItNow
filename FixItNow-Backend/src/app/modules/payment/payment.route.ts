import express from 'express';
import { PaymentController } from './payment.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { PaymentValidation } from './payment.validation';
import { Role } from '@prisma/client';

const router = express.Router();

router.post(
  '/create',
  auth(Role.CUSTOMER),
  validateRequest(PaymentValidation.initPaymentSchema),
  PaymentController.createPayment
);

// We will use query params to determine success/fail for SSLCommerz callback
router.post(
  '/confirm',
  PaymentController.confirmPayment
);

router.get(
  '/',
  auth(Role.CUSTOMER),
  PaymentController.getPaymentHistory
);

router.get(
  '/:id',
  auth(Role.CUSTOMER),
  PaymentController.getPaymentDetails
);

export const PaymentRoutes = router;
