import express from 'express';
import { signinHandler, signupHandler } from '../controllers/user.controller.js';

const router = express.Router();

// Signin Route
router.route('/signin')
.get((req, res) => {
    res.render('signin');
})
.post(signinHandler);

// Signup Route
router.route('/signup')
.get((req, res) => {
    res.render('signup');
})
.post(signupHandler);

// Logout Route
router.route('/signout')
.get((req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});


export default router;