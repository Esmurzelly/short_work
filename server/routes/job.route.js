import express from 'express';
import { verifyUserToken } from '../middleware/verifyUser.js';
import { createJob } from '../controller/job.controller.js';

const router = express.Router();

router.post('/create', verifyUserToken, createJob);

export default router;