import express from "express"
import { login, logout, checkAuth } from "../controllers/authController.js"
import { verifyToken } from "../middleware/authMiddleware.js"

const router = express.Router()

// Login and logout routes
router.post("/login", login)
router.post("/logout", logout)

// Check auth status
router.get("/check", verifyToken, checkAuth)

export default router

