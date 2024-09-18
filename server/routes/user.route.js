import express from 'express';
import { editUser } from '../controller/user.controller.js';
import { verifyUserToken } from '../middleware/verifyUser.js';

const router = express.Router();

router.post('/edit/:id', verifyUserToken, editUser);

export default router;