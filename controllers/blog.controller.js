import Blog from "../models/blog.model.js";
import multer from "multer";
import path from "path";
import fs from "fs/promises";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dirPath = path.join("public", "uploads", String(req.user._id));
        fs.mkdir(dirPath, { recursive: true })
            .then(() => {
                cb(null, path.resolve(dirPath));
            })
            .catch(err => {
                cb(err);
            });;
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename)
    }
})

const upload = multer({ storage: storage })

const addBlogHandler = async function (req, res) {
    const { title, content } = req.body;
    const coverImage = req.file ? `/uploads/${req.user._id}/${req.file.filename}` : null;
    try {
        const blog = await Blog.create({
            title,
            content,
            coverImage,
            createdBy: req.user._id
        });
        return res.redirect('/blog/${blog._id');
    }
    catch (error) {
        res.status(500).render('add_blog', { error: error.message });
    }
};

export { addBlogHandler, upload };
