import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();
const port = 3000 || process.env.PORT;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Connection error', err))

const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(port, () => console.log(`Server is run on port ${port}`));

// app.get('/', (req, res) => { //Строка 9
//     res.json({ express: 'YOURwww123 EXPRESS BACKEND IS CONNECTED TO REACT' });
// });