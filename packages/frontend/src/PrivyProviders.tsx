import { PrivyProvider } from '@privy-io/react-auth';
import { base, baseGoerli, mainnet, sepolia, polygon, polygonMumbai } from 'viem/chains';

export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <PrivyProvider 
      appId="cm39nllvt0005bug7y0dx7taf"
      config={{
        "appearance": {
          "accentColor": "#A7C080",
          "theme": "#222224",
          "showWalletLoginFirst": false,
          "logo": "https://your-logo-url",
          "walletChainType": "ethereum-only",
        },
        "loginMethods": [
          "email",
          "wallet"
        ],
        "fundingMethodConfig": {
          "moonpay": {
            "useSandbox": true
          }
        },
        "embeddedWallets": {
          "createOnLogin": "users-without-wallets",
          "requireUserPasswordOnCreate": false
        },
        "mfa": {
          "noPromptOnMfaRequired": false
        }
      }}
      >
      {children}
    </PrivyProvider>
  );
}