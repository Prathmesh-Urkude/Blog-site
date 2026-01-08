import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const signinHandler = async function (req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
        }
        return res.redirect('/');
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}

const signupHandler = async function (req, res) {
    const { firstname, lastname, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email.' });
        }
        await User.create({ firstname, lastname, email, password });
        return res.redirect('/');
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

export { signinHandler, signupHandler };