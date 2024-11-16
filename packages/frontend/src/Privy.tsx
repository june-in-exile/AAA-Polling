import './App.css';
import { usePrivy, useWallets, getEmbeddedConnectedWallet } from '@privy-io/react-auth';
import { Navigate } from 'react-router-dom';
import useWalletStore from './useWalletStore';

export default function Privy() {
  const { login, user } = usePrivy();
  const { wallets } = useWallets();
  const setEmbeddedWalletAddress = useWalletStore((state) => state.setEmbeddedWalletAddress);
  const embeddedWallet = getEmbeddedConnectedWallet(wallets);
  const embeddedWalletAddress = embeddedWallet?.address;

  // Store the wallet address in Zustand
  if (embeddedWalletAddress) {
    setEmbeddedWalletAddress(embeddedWalletAddress);
  }

  console.log("EmbeddedWallet: ", embeddedWalletAddress);

  if (embeddedWalletAddress) {
    return <Navigate to="/poll" replace />;
  } else if (user) {
    return <Navigate to="/createPrivyWallet" replace />;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <div style={{ marginBottom: '2rem' }}>
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
          }}
        >
          AAA Polling
        </h1>
        <p
          style={{
            color: '#666',
            fontSize: '1.1rem',
          }}
        >
          Anonymous, Anti-Collusion, AI-resistant Polling System
        </p>
      </div>
      <button
        onClick={login}
        style={{
          backgroundColor: '#0088ff',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.25rem',
          cursor: 'pointer',
          fontSize: '1.1rem',
          border: 'none',
          transition: 'background-color 0.2s',
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#0088ff')}
      >
        Login
      </button>
    </div>
  );
}
