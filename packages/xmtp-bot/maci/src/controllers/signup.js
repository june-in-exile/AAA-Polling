// import { genKeyPair } from '../../packages/cli/ts';

export const signup = (req, res) => {
    try {
        res.status(200).json({
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to signup',
            error: error.message
        });
    }
};