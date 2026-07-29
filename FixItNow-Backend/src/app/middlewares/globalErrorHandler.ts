import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import ApiError from '../errors/ApiError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorDetails: any = err;

  if (err instanceof ZodError) {
    statusCode = 400;
    message = 'Validation Error';
    errorDetails = err.issues.map((issue) => ({
      field: issue.path[issue.path.length - 1],
      message: issue.message,
    }));
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    message = err?.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorDetails,
  });
};

export default globalErrorHandler;
