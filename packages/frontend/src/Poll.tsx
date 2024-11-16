import React, { useCallback } from 'react';
import { usePrivy, useWallets, getEmbeddedConnectedWallet } from '@privy-io/react-auth'
import { Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import useNavigationStore from './FloatingInbox/useNavigationStore';
import { useStartConversation } from "@xmtp/react-sdk";
import useWalletStore from './useWalletStore'; 

export default function Poll() {
    const { user, logout, ready, authenticated } = usePrivy()
    const { wallets } = useWallets();
    const embeddedWallet = getEmbeddedConnectedWallet(wallets)
    const embeddedWalletAddress = embeddedWallet?.address
    const navigate = useNavigate();
    const setEmbeddedWalletAddress = useWalletStore((state) => state.setEmbeddedWalletAddress);
    setEmbeddedWalletAddress(embeddedWalletAddress as any);
    

    if (!user) {
        return <Navigate to="/Privy" replace />
    } else if (!embeddedWalletAddress) {
        return <Navigate to="/createPrivyWallet" replace />
    }

    const handleSendTransaction = async () => {
        navigate("/")
    }


    const deleteUser = async () => {
        try {
            const user_did = user.id.substring(10)
            const response = await fetch(`https://auth.privy.io/api/v1/users/${user_did}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'privy-app-id': import.meta.env.VITE_APP_ID,
                    Authorization: `Basic ${btoa(`${import.meta.env.VITE_APP_ID}:${import.meta.env.VITE_APP_SECRET}`)}`,
                },
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            console.log(`Wallet of user ${user_did} deleted successfully.`);

            // navigate('/createPrivyWallet', { replace: true })
            return <Navigate to="/createPrivyWallet" />
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div style={{ 
            padding: '2rem',
            maxWidth: '800px',
            margin: '0 auto'
        }}>
            <h1 style={{ 
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1rem'
            }}>Poll</h1>
            <p style={{ marginBottom: '1rem' }}>
                Wallet Address: { embeddedWalletAddress }
            </p>
            <button
                disabled={!ready || (ready && !authenticated)}
                onClick={handleSendTransaction}
                style={{
                    backgroundColor: '#22c55e',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.25rem',
                    marginRight: '1rem',
                    cursor: 'pointer'
                }}
                onMouseOver={(e) => {e.currentTarget.style.backgroundColor = '#33b249'}}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#22c55e'}}
            > Poll </button>
            <button
                disabled={!ready || (ready && !authenticated)}
                onClick={deleteUser}
                style={{
                    backgroundColor: '#b23b3b',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.25rem',
                    marginRight: '1rem',
                    cursor: 'pointer'
                }}
                onMouseOver={(e) => {e.currentTarget.style.backgroundColor = '#9c281c'}}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#b23b3b'}}
            > Delete User </button>
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
    )
}