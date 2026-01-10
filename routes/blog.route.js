import express from 'express';
import { addBlogHandler, upload } from '../controllers/blog.controller.js';

const router = express.Router();

// Add Blog Route
router.route('/add_blog')
.get((req, res) => {
    res.render('add_blog', {user: req.user});
})
.post(upload.single('coverImage'), addBlogHandler);

export default router;