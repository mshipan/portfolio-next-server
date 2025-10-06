import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { DashboardServices } from "./dashboard.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const getDashboardOverview = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardServices.getDashboardOverview();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Dashboard retrieved successfully.",
    data: result,
  });
});

export const DashboardController = {
  getDashboardOverview,
};
