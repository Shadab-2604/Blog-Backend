import { v2 as cloudinary } from "cloudinary"
import dotenv from "dotenv"

dotenv.config()

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Upload image to Cloudinary
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" })
    }

    // Convert buffer to base64
    const fileStr = req.file.buffer.toString("base64")
    const fileType = req.file.mimetype

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(`data:${fileType};base64,${fileStr}`, {
      folder: "blog_platform",
      resource_type: "auto",
    })

    res.status(200).json({
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
    })
  } catch (error) {
    console.error("Upload error:", error)
    res.status(500).json({ message: "Upload failed" })
  }
}

