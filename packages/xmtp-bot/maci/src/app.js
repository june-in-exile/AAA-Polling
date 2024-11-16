import express from 'express';
import getKeyPair from './routes/getKeyPair.js';

const app = express();
const port = 3000;

// 定義 GET 路由 - 在 /genKeyPair 上呼叫 genKeyPair
app.get('/getKeyPair', (req, res) => {
    const keyPair = getKeyPair();
    console.log("Get Key Pair: ", keyPair);
    res.json({ keyPair: keyPair });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});