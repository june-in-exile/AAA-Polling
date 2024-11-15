import { genKeyPair } from '../../packages/cli/ts';

export const genKeypair = (req, res) => {
    try {
        const keypair = genKeyPair({ quiet: true });
        res.status(200).json({
            success: true,
            keypair: keypair
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to generate key pair',
            error: error.message
        });
    }
};