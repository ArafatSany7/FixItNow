import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import ApiError from '../../errors/ApiError';
import { PaymentService } from './payment.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createPayment = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.createPayment(req.user.email, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment intent created successfully',
    data: result,
  });
});

const confirmPayment = catchAsync(async (req: Request, res: Response) => {
  const tran_id = req.query.tran_id || req.body.tran_id;

  let action = req.query.action as string;
  if (!action && req.body.status) {
    if (req.body.status === 'VALID') action = 'success';
    else if (req.body.status === 'FAILED') action = 'fail';
    else if (req.body.status === 'CANCELLED') action = 'cancel';
  }

  if (!tran_id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Transaction ID is missing. Please provide ?tran_id=YOUR_TXN_ID in the URL');
  }

  const frontendUrl = (req.query.frontendUrl as string) || 'https://fixit-now-service.vercel.app';
  const result = await PaymentService.confirmPayment(tran_id as string, action || 'success', frontendUrl);
  res.send(result);
});

const getPaymentHistory = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.getPaymentHistory(req.user.email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment history retrieved successfully',
    data: result,
  });
});

const getPaymentDetails = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PaymentService.getPaymentDetails(id as string, req.user.email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment details retrieved successfully',
    data: result,
  });
});

export const PaymentController = {
  createPayment,
  confirmPayment,
  getPaymentHistory,
  getPaymentDetails,
};
