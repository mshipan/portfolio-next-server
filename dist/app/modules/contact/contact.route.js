"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactRoutes = void 0;
const express_1 = require("express");
const contact_controller_1 = require("./contact.controller");
const checkAuth_1 = require("../../middlewares/checkAuth");
const router = (0, express_1.Router)();
router.post("/send-mail", contact_controller_1.ContactController.sendEmail);
router.get("/", (0, checkAuth_1.checkAuth)("owner"), contact_controller_1.ContactController.getAllMessages);
router.patch("/:id/read", (0, checkAuth_1.checkAuth)("owner"), contact_controller_1.ContactController.markAsRead);
router.delete("/:id", (0, checkAuth_1.checkAuth)("owner"), contact_controller_1.ContactController.deleteMessage);
router.get("/unread-count", (0, checkAuth_1.checkAuth)("owner"), contact_controller_1.ContactController.getUnreadCount);
exports.ContactRoutes = router;
//# sourceMappingURL=contact.route.js.map