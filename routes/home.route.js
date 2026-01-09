import express from 'express';

const router = express.Router();

// Home Route
router.route('/')
.get((req, res) => {
    res.render('home', { user: req.user });
});

export default router;