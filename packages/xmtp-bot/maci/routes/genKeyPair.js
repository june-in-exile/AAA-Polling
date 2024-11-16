const cli = require('maci-cli');

module.exports = function genKeyPair() {
    const keyPair = cli.genKeyPair({ seed: false });
    return keyPair;
}