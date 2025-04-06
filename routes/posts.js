import express from "express"
import {
  getPosts,
  getPostById,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js"
import { verifyToken, requireAdmin } from "../middleware/authMiddleware.js"

const router = express.Router()

// Apply auth middleware to all routes
router.use(verifyToken)

// Public routes (with conditional access based on isAdmin)
router.get("/", getPosts)
router.get("/:id", getPostById)
router.get("/slug/:slug", getPostBySlug)

// Admin-only routes
router.post("/", requireAdmin, createPost)
router.put("/:id", requireAdmin, updatePost)
router.delete("/:id", requireAdmin, deletePost)

export default router

