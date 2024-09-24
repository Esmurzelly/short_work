import express from 'express';
import { verifyUserToken } from '../middleware/verifyUser.js';
import { createJob, deleteJob, getAllJobs, getJobById, updateJob } from '../controller/job.controller.js';

const router = express.Router();

router.post('/create', verifyUserToken, createJob);
router.get('/getAllJobs', getAllJobs);
router.get('/get/:id', getJobById);
router.post('/update/:id', verifyUserToken, updateJob);
router.post('/delete/:id', verifyUserToken, deleteJob); 

export default router;