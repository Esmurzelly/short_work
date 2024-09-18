import errorHandler from "./errorHandler.js";
import jwt from 'jsonwebtoken';

export const verifyUserToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token) return errorHandler();

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return next(errorHandler());

        req.user = user;
        next();
    })
}