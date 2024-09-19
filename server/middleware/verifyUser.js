import jwt from 'jsonwebtoken';

export const verifyUserToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token) {
        const err = new Error("You are not allowed to edit this user");
        err.statusCode = 403;
        return next(err);  
    } 

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return next(err);

        req.user = user;
        next();
    })
}