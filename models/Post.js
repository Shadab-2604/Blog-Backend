import mongoose from "mongoose"

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    excerpt: {
      type: String,
      trim: true,
    },
    coverImage: {
      type: String,
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

// Create text index for search
postSchema.index({ title: "text", content: "text" })

const Post = mongoose.model("Post", postSchema)

export default Post

