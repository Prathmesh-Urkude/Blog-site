import User from "../models/user.model.js";
import { generateToken } from "../services/authentication.service.js";
import bcrypt from "bcrypt";

const signinHandler = async function (req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).render('signin', { error: 'User not found.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).render('signin', { error: 'Wrong password.' });
        }
        const token = generateToken(user);
        
        return res.cookie('token', token).redirect('/');
    } catch (error) {
        res.status(500).render('signin', { error: 'Invalid credentials' });
    }
}

const signupHandler = async function (req, res) {
    const { firstname, lastname, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).render('signup', { error: 'User already exists with this email.' });
        }
        await User.create({ firstname, lastname, email, password });
        return res.status(201).redirect('/user/signin');
    } catch (error) {
        res.status(500).render('signup', { message: 'Internal server error', error });
    }
};

export { signinHandler, signupHandler };