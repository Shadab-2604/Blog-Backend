import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Verify JWT token
export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.auth_token

    if (!token) {
      req.isAdmin = false
      return next()
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        req.isAdmin = false
        return next()
      }

      req.isAdmin = decoded.isAdmin
      next()
    })
  } catch (error) {
    req.isAdmin = false
    next()
  }
}

// Require admin access
export const requireAdmin = (req, res, next) => {
  if (!req.isAdmin) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  next()
}

