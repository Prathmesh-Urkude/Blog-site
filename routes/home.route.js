import express from 'express';
import Blog from '../models/blog.model.js';

const router = express.Router();

// Home Route
router.route('/')
.get(async (req, res) => {
    const allBlogs = await Blog.find({}).sort({ createdAt: -1});
    res.render('home', { user: req.user, blogs: allBlogs });
});

export default router;