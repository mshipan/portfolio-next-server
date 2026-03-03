import { Router } from "express";
import { ContactController } from "./contact.controller";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

router.post("/send-mail", ContactController.sendEmail);
router.get("/", checkAuth("owner"), ContactController.getAllMessages);
router.patch("/:id/read", checkAuth("owner"), ContactController.markAsRead);
router.delete("/:id", checkAuth("owner"), ContactController.deleteMessage);
router.get("/unread-count", checkAuth("owner"), ContactController.getUnreadCount);

export const ContactRoutes = router;