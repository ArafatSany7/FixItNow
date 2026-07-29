
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { ReviewService } from './review.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.createReview(req.user.email, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review submitted successfully',
    data: result,
  });
});

const getReviewsByTechnicianId = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getReviewsByTechnicianId(req.params.technicianId as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews retrieved successfully',
    data: result,
  });
});

export const ReviewController = {
  createReview,
  getReviewsByTechnicianId,
};
