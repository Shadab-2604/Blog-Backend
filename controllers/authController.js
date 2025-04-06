import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

// Admin credentials from environment variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Login
export const login = (req, res) => {
  try {
    const { username, password } = req.body

    // Validate credentials
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // Create JWT token
    const token = jwt.sign({ username, isAdmin: true }, JWT_SECRET, { expiresIn: "24h" })

    // Set cookie
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    })

    res.status(200).json({ message: "Login successful" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Logout
export const logout = (req, res) => {
  try {
    // Clear cookie
    res.clearCookie("auth_token")
    res.status(200).json({ message: "Logout successful" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Check authentication status
export const checkAuth = (req, res) => {
  try {
    // Auth middleware will set req.isAdmin if authenticated
    res.status(200).json({ authenticated: !!req.isAdmin })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

