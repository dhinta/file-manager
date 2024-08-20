import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import userRouter from './routes/users.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
const requestForbidden = (_, res) => {
    res.status(403).json({
        message: 'Forbidden access',
    });
};

app.get('/', requestForbidden);
app.get('/api', requestForbidden);

app.use('/api/users', userRouter);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
