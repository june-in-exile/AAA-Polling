const express = require('express');
const genKeyPair = require('./routes/genKeyPair.js');
const signup = require('./routes/signup.js');
const vote = require('./routes/vote.js');
const tally = require('./routes/tally.js');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/genKeyPair', (req, res) => {
    const keyPair = genKeyPair();
    console.log("New Key Pair: ", keyPair);
    res.json(keyPair);
});

app.post('/signup', async (req, res) => {
    const success = await signup(req.body["publicKey"]);
    console.log("success: ", success);
    res.json({ success: success });
});

app.post('/vote', async (req, res) => {
    console.log('req: ', req.body);
    const success = await vote(req.body.publicKey, req.body.privateKey, req.body.option);
    console.log("success: ", success);
    res.json({ success: success });
});

app.get('/tally', async (req, res) => {
    const url = await tally();
    console.log("tally: ", url);
    res.json({ tally: url });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
