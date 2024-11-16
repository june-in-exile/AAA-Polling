import { create } from 'zustand';

// Define the state structure
interface WalletState {
  embeddedWalletAddress: string | null;
  setEmbeddedWalletAddress: (address: string | null) => void;
}

// Create the Zustand store with types
const useWalletStore = create<WalletState>((set) => ({
  embeddedWalletAddress: null, // Initial state
  setEmbeddedWalletAddress: (address) => set({ embeddedWalletAddress: address }),
}));

export default useWalletStore;
