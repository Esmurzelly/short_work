import express from 'express';
import { verifyUserToken } from '../middleware/verifyUser.js';
import { createJob, getAllJobs } from '../controller/job.controller.js';

const router = express.Router();

router.post('/create', verifyUserToken, createJob);
router.get('/getAllJobs', getAllJobs);
// router.post('/get/:id', createJob);
// router.post('/update/:id', verifyUserToken, createJob);
// router.post('/delete/:id', verifyUserToken, createJob);

export default router;