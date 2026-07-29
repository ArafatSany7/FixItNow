import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { TechnicianService } from './technician.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await TechnicianService.createProfile(req.user.email, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Technician profile created successfully',
    data: result,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await TechnicianService.updateProfile(req.user.email, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Technician profile updated successfully',
    data: result,
  });
});

const getAllTechnicians = catchAsync(async (req: Request, res: Response) => {
  const result = await TechnicianService.getAllTechnicians(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Technicians retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleTechnician = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TechnicianService.getSingleTechnician(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Technician profile retrieved successfully',
    data: result,
  });
});

export const TechnicianController = {
  createProfile,
  updateProfile,
  getAllTechnicians,
  getSingleTechnician,
};
