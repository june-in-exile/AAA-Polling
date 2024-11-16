const express = require('express');
const genKeyPair = require('./routes/genKeyPair.js');
const signup = require('./routes/signup.js');

const app = express();
const port = 3000;

app.get('/genKeyPair', (req, res) => {
    const keyPair = genKeyPair();
    console.log("New Key Pair: ", keyPair);
    res.json(keyPair);
});

app.post('/signup', (req, res) => {
    const success = signup();
    console.log("success: ", success);
    res.json({ success: success });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
