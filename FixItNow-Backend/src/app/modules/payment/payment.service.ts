import prisma from '../../../shared/prisma';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
// @ts-ignore
import SSLCommerzPayment from 'sslcommerz-lts';
import config from '../../../config';
import crypto from 'crypto';

const createPayment = async (userEmail: string, payload: any) => {
  const customer = await prisma.user.findUnique({ where: { email: userEmail } });
  
  if (!customer || customer.role !== 'CUSTOMER') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Only customers can initiate payment');
  }

  const booking = await prisma.booking.findUnique({
    where: { id: payload.bookingId },
    include: {
      technician: { include: { technicianProfile: true } },
    }
  });

  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  if (booking.customerId !== customer.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized to pay for this booking');
  }

  // Assigment Requirement: Only create payment for ACCEPTED bookings
  if (booking.status !== 'ACCEPTED') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You can only pay for a booking after the technician has ACCEPTED it.');
  }

  const existingPayment = await prisma.payment.findUnique({
    where: { bookingId: booking.id }
  });

  if (existingPayment && existingPayment.status === 'PAID') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Booking is already paid');
  }

  const transactionId = `TXN-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
  const amount = booking.technician.technicianProfile?.pricing || 100;

  if (existingPayment) {
    await prisma.payment.update({
      where: { id: existingPayment.id },
      data: { transactionId, status: 'PENDING' }
    });
  } else {
    await prisma.payment.create({
      data: {
        bookingId: booking.id,
        amount,
        transactionId,
      }
    });
  }

  const data = {
    total_amount: amount,
    currency: 'BDT',
    tran_id: transactionId,
    success_url: `${config.ssl.app_url}/api/payments/confirm?action=success&tran_id=${transactionId}`,
    fail_url: `${config.ssl.app_url}/api/payments/confirm?action=fail&tran_id=${transactionId}`,
    cancel_url: `${config.ssl.app_url}/api/payments/confirm?action=cancel&tran_id=${transactionId}`,
    ipn_url: `${config.ssl.app_url}/api/payments/confirm?action=ipn&tran_id=${transactionId}`,
    shipping_method: 'Courier',
    product_name: 'Service Booking',
    product_category: 'Service',
    product_profile: 'general',
    cus_name: customer.name,
    cus_email: customer.email,
    cus_add1: customer.address || 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: customer.contactNo || '01711111111',
    cus_fax: '01711111111',
    ship_name: customer.name,
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  };

  const sslcz = new SSLCommerzPayment(config.ssl.store_id || 'test', config.ssl.store_pass || 'test', config.ssl.is_live);
  
  return new Promise((resolve, reject) => {
    sslcz.init(data).then((apiResponse: any) => {
      let GatewayPageURL = apiResponse.GatewayPageURL;
      resolve({ url: GatewayPageURL });
    }).catch((err: any) => {
      reject(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to initialize payment'));
    });
  });
};

const confirmPayment = async (tranId: string, action: string) => {
  const payment = await prisma.payment.findUnique({ where: { transactionId: tranId } });
  if (!payment) throw new ApiError(httpStatus.NOT_FOUND, 'Payment not found');

  let status = 'PENDING';
  let message = 'Payment status unknown';
  let color = 'black';

  if (action === 'success') {
    status = 'PAID';
    message = 'Payment Successful!';
    color = 'green';
  } else if (action === 'fail') {
    status = 'FAILED';
    message = 'Payment Failed!';
    color = 'red';
  } else if (action === 'cancel') {
    status = 'CANCELLED';
    message = 'Payment Cancelled!';
    color = 'orange';
  }

  if (status !== 'PENDING') {
    await prisma.payment.update({
      where: { transactionId: tranId },
      data: { status: status as any }
    });
  }
  
  return `
    <html>
      <head><title>Payment Status</title></head>
      <body>
        <h1 style="color: ${color};">${message}</h1>
        <p>Your transaction ID is: ${tranId}</p>
        <p>You can close this window now.</p>
      </body>
    </html>
  `;
};

const getPaymentHistory = async (userEmail: string) => {
  const customer = await prisma.user.findUnique({ where: { email: userEmail } });
  
  if (!customer || customer.role !== 'CUSTOMER') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Only customers can view payment history');
  }

  const result = await prisma.payment.findMany({
    where: { booking: { customerId: customer.id } },
    include: {
      booking: {
        include: { technician: { select: { id: true, name: true, contactNo: true } } }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return result;
};

const getPaymentDetails = async (id: string, userEmail: string) => {
  const customer = await prisma.user.findUnique({ where: { email: userEmail } });
  
  if (!customer || customer.role !== 'CUSTOMER') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Only customers can view payment details');
  }

  const result = await prisma.payment.findUnique({
    where: { id },
    include: {
      booking: {
        include: { technician: { select: { id: true, name: true, contactNo: true } } }
      }
    },
  });

  if (!result || result.booking.customerId !== customer.id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Payment not found or access denied');
  }

  return result;
};

export const PaymentService = {
  createPayment,
  confirmPayment,
  getPaymentHistory,
  getPaymentDetails,
};
