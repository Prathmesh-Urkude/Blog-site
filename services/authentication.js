import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;

function generateToken(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    return token;
}

function verifyToken(token) {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
}

export { generateToken, verifyToken };