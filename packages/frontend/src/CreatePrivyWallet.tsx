import { usePrivy, useWallets, getEmbeddedConnectedWallet } from '@privy-io/react-auth'
import { Navigate } from 'react-router-dom'


export default function CreatePrivyWallet() {
    const { user, logout, ready, authenticated, createWallet } = usePrivy();
    const { wallets } = useWallets();
    const embeddedWallet = getEmbeddedConnectedWallet(wallets)
    const embeddedWalletAddress = embeddedWallet?.address
    console.log("EmbeddedWallet: ", embeddedWalletAddress)
  
    // Redirect to home if user is not logged in
    if (embeddedWalletAddress) {
      return <Navigate to="/poll" replace />
    } else if (!user) {
      return <Navigate to="/" replace />
    }
  
    return (
      <div style={{ padding: '1rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          You are logged in!
        </h1>
        <p style={{ marginBottom: '1rem' }}>Create a Wallet to Join the Poll</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button 
            disabled={!(ready && authenticated)} 
            onClick={createWallet}
            style={{
              backgroundColor: '#22c55e',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.25rem',
              cursor: (ready && authenticated) ? 'pointer' : 'not-allowed',
              opacity: (ready && authenticated) ? 1 : 0.5
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#33b249'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#22c55e'}
          >
            Create a wallet
          </button>
          <button
            disabled={!ready || (ready && !authenticated)}
            onClick={logout} 
            style={{
              backgroundColor: '#b23b3b',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#9c281c'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#b23b3b'}
          >
            Logout
          </button>
        </div>
      </div>
    )
}