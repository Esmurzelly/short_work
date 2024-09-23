import express from 'express';
import { deleteAvatar, deleteUser, editUser, findUserByUserRef, uploadAvatar } from '../controller/user.controller.js';
import { verifyUserToken } from '../middleware/verifyUser.js';

const router = express.Router();

router.post('/edit/:id', verifyUserToken, editUser);
router.post('/delete/:id', verifyUserToken, deleteUser);
router.get('/getOwner/:id', findUserByUserRef);
router.post('/avatar', verifyUserToken, uploadAvatar);
router.delete('/avatar', verifyUserToken, deleteAvatar);

export default router;