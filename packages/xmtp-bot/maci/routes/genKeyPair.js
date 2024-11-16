
import cli from 'maci-cli';

export default function genKeyPair() {
    const keyPair = cli.genKeyPair({ seed: false });
    return keyPair;
}