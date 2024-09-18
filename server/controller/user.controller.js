import User from '../model/user.model.js';
import errorHandler from '../middleware/errorHandler.js';
import bcrypt from 'bcryptjs';

export const editUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        const err = new Error("You are not allowed to edit this user");
        err.statusCode = 403; // Устанавливаем HTTP-код ошибки
        return next(err); // Передаем ошибку в middleware для обработки
    }

    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        };

        // const userId = req.body.id;
        // const { name, email, password, avatar, role } = req.body;
        // console.log(userId);

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
                role: req.body.role
            }
        }, { new: true });

        res.status(201).json(updatedUser);
    } catch (error) {
        next(error);
        console.log(error)
    }
}