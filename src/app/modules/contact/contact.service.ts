/* eslint-disable @typescript-eslint/no-explicit-any */

import { Prisma } from "@prisma/client";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { prisma } from "../../config/db";
import { transporter } from "../../config/mail.config";

const sendEmail = async (payload: Prisma.ContactMessageCreateInput) => {
    const {name, email, message} = payload;

    if(!name || !email || !message) {
        throw new AppError(httpStatus.BAD_REQUEST, "All fields are required");
    }

    const savedMessage = await prisma.contactMessage.create({
        data: {
            name,
            email,
            message
        },
    });

    await transporter.sendMail({
        from: `"${name} <${email}>"`,
        to: process.env.SMTP_USER,
        subject: `New Contact Message from ${name}`,
        html: `
            <h2>New Contact Message</h2>
            <br/>
            <br/>
            <p><strong>Name:</strong>${name}</p>
            <p><strong>Email:</strong>${email}</p>
            <br/>
            <br/>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <hr/>
            <small>Received at: ${new Date().toLocaleString()}</small>
        `
    });

    return savedMessage;
};

const getAllMessages = async (query: Record<string, any>) => {
    const {page = 1, limit= 10, search} = query;

    const pageNum = Number(page);
    const limitNum = Number(limit);

  const filter: Prisma.ContactMessageWhereInput = search
  ? {
      OR: [
        {
          name: {
            contains: String(search),
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: String(search),
            mode: "insensitive",
          },
        },
      ],
    }
  : {};

    const [data, total] = await Promise.all([
        prisma.contactMessage.findMany({
            where: filter,
            orderBy: {createdAt: "desc"},
            skip: (pageNum - 1) * limitNum,
            take: limitNum,
        }),
        prisma.contactMessage.count({where: filter}),
    ]);

    return {
    meta: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPage: Math.ceil(total / limitNum),
    },
    data,
  };
};

const markAsRead = async (id:string) => {
    const exist = await prisma.contactMessage.findUnique({where: {id}});

    if(!exist) {
        throw new AppError(httpStatus.NOT_FOUND, "Message not found.");
    }

    return prisma.contactMessage.update({
        where: {id},
        data: {isRead: true},
    });
};

const deleteMessage = async (id:string) => {
    const exist = await prisma.contactMessage.findUnique({ where : {id}});

     if (!exist) {
        throw new AppError(httpStatus.NOT_FOUND, "Message not found.");
    }

    await prisma.contactMessage.delete({ where : {id}});

    return { message: "Message deleted successfully." };
};

const getUnreadCount = async () => {
    return prisma.contactMessage.count({
        where: {isRead: false}
    });
};

export const ContactServices = {
    sendEmail,
    getAllMessages,
    markAsRead,
    deleteMessage,
    getUnreadCount,
}