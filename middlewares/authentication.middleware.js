import { verifyToken } from "../services/authentication.service.js";

function isAuthenticated(cookieName) {
    return (req, res, next) => {
        const token = req.cookies?.[cookieName];
        if(!token) {
            return next();
        }
        try {
            const payload = verifyToken(token);
            req.user = payload;
        }
        catch (error) {
            res.clearCookie(cookieName);
        }
        return next();
    }
}

export { isAuthenticated };