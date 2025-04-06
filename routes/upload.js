import express from "express"
import { uploadImage } from "../controllers/uploadController.js"
import upload from "../middleware/uploadMiddleware.js"
import { verifyToken, requireAdmin } from "../middleware/authMiddleware.js"

const router = express.Router()

// Apply auth middleware
router.use(verifyToken)

// Upload route (admin only)
router.post("/", requireAdmin, upload.single("image"), uploadImage)

export default router

