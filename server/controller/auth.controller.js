import User from '../model/user.model.js';
import bcrypt from 'bcrypt';
import errorHandler from '../middleware/errorHandler.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { name, email, password, age, role, jobs, avatar } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        age,
        role,
        jobs,
        avatar
    });

    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        next(error)
    };
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, "User is not found"))
        const validPassword = await bcrypt.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'Wrong credentials'));

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

        res
            .cookie("access_token", token, { 
                httpOnly: true,
                maxAge: 25 * 60 * 60 * 1000
            })
            .status(200)
            .json(validUser);
    } catch (error) {
        next(error)
    };
};

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

            res
                .cookie('access_token', token, { 
                    httpOnly: true,
                    maxAge: 25 * 60 * 60 * 1000
                })
                .status(200)
                .json(user);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

            const newUser = new User({
                name: req.body.name.split(" ").join(" ").toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                role: "user",
                avatar: req.body.avatar
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(newUser);
        }
    } catch (error) {
        next(error)
    }
};

export const signout = (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json("User has been logged out");
    } catch (error) {
        next(error)
    }
}