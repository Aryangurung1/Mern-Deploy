import express from "express";
import { getNotices, getNotice, addNotice, deleteNotice } from "../controllers/noticeController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes
router.get("/", authMiddleware, getNotices);
router.get("/:id", authMiddleware, getNotice);
router.post("/add", authMiddleware, addNotice);
router.delete("/:id", authMiddleware, deleteNotice);

export default router;
