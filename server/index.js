import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler.js';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import jobRouter from './routes/job.route.js';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const port = 3000 || process.env.PORT;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Connection error', err))

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);
app.use(cors());
app.use(fileUpload());
app.use("/static", express.static(path.join(__dirname, "static")));


app.listen(port, () => console.log(`Server is run on port ${port}`));

app.get('/api/get', (req, res) => {
    res.json({ express: 'YOURwww123 EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/job', jobRouter);