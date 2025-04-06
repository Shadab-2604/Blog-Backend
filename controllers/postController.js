import Post from "../models/Post.js"

// Get all posts (published for public, all for admin)
export const getPosts = async (req, res) => {
  try {
    const isAdmin = req.isAdmin
    const query = isAdmin ? {} : { published: true }

    const posts = await Post.find(query).sort({ createdAt: -1 })
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }

    // Check if post is published or user is admin
    if (!post.published && !req.isAdmin) {
      return res.status(403).json({ message: "Access denied" })
    }

    res.status(200).json(post)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get post by slug
export const getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })

    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }

    // Check if post is published or user is admin
    if (!post.published && !req.isAdmin) {
      return res.status(403).json({ message: "Access denied" })
    }

    res.status(200).json(post)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Create new post
export const createPost = async (req, res) => {
  try {
    // Check if slug already exists
    const existingPost = await Post.findOne({ slug: req.body.slug })
    if (existingPost) {
      return res.status(400).json({ message: "Slug already exists" })
    }

    const newPost = new Post(req.body)
    const savedPost = await newPost.save()
    res.status(201).json(savedPost)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Update post
export const updatePost = async (req, res) => {
  try {
    // Check if slug already exists (if slug is being updated)
    if (req.body.slug) {
      const existingPost = await Post.findOne({
        slug: req.body.slug,
        _id: { $ne: req.params.id },
      })

      if (existingPost) {
        return res.status(400).json({ message: "Slug already exists" })
      }
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" })
    }

    res.status(200).json(updatedPost)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Delete post
export const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id)

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" })
    }

    res.status(200).json({ message: "Post deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

