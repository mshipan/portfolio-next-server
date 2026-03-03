import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { ContactServices } from "./contact.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const sendEmail = catchAsync(async (req: Request, res: Response) => {
    const result = await ContactServices.sendEmail(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Message sent successfully",
        data: result,
    });
});

const getAllMessages = catchAsync(async (req: Request, res: Response) => {
    const result = await ContactServices.getAllMessages(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Messages retrieved successfully",
        data: result,
    });
});

const markAsRead = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    
    const result = await ContactServices.markAsRead(id);
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Marked as read",
        data: result,
    });
});

const deleteMessage = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    
    const result = await ContactServices.deleteMessage(id);
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: result.message,
        data: null,
    });
});

const getUnreadCount = catchAsync(async (_req: Request, res: Response) => {
    const count = await ContactServices.getUnreadCount();
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Unread count fetched",
        data: { count },
    });
});

export const ContactController = {
    sendEmail,
    getAllMessages,
    markAsRead,
    deleteMessage,
    getUnreadCount,
};