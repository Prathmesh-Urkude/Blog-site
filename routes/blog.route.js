import express from 'express';
import { addBlogHandler, upload } from '../controllers/blog.controller.js';
import Blog from '../models/blog.model.js';
import Comment from '../models/comment.model.js';

const router = express.Router();

// Add Blog Route
router.route('/add_blog')
.get((req, res) => {
    res.render('add_blog', {user: req.user});
})
.post(upload.single('coverImage'), addBlogHandler);

router.route('/:blog_id')
.get(async (req, res) => {
    const blog = await Blog.findById(req.params.blog_id).populate('createdBy');
    const comments = await Comment.find({blogId: req.params.blog_id}).sort({updatedAt: -1 }).populate('userId');
    res.render('blog', {user: req.user, blog, comments});
});

router.route('/:blog_id/comment')
.post(async (req, res) => {
    await Comment.create({
        content: req.body.content,
        userId: req.user._id,
        blogId: req.params.blog_id
    });
    res.redirect(`/blog/${req.params.blog_id}`);
});

export default router;