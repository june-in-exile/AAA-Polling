import express from 'express';
import getKeyPair from './routes/getKeyPair.js';

const app = express();
const port = 3000;

app.get('/getKeyPair', (req, res) => {
    const keyPair = getKeyPair();
    console.log("New Key Pair: ", keyPair);
    res.json(keyPair);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
