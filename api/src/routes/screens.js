import axios from 'axios';
import express from 'express';

const router = express.Router();

// middleware that is specific to this router
const timeLog = (req, res, next) => {
    console.log('Time: ', Date.now());
    next();
};
router.use(timeLog);

// define the home page route
router.get('/', async (req, res) => {
    try {
        const { data } = await axios.get('http://localhost:8080/assets');
        const rand = pickRandom(data);
        res.json(rand);
    } catch (error) {
        // Handle any errors
        console.error('Error fetching posts:', error.message);
        res.status(500).json({
            error: 'An error occurred while fetching posts',
        });
    }
});

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export default router;
