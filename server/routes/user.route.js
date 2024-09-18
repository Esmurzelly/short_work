import express from 'express';
import { deleteUser, editUser } from '../controller/user.controller.js';
import { verifyUserToken } from '../middleware/verifyUser.js';

const router = express.Router();

router.post('/edit/:id', verifyUserToken, editUser);
router.post('/delete/:id', verifyUserToken, deleteUser);

export default router;