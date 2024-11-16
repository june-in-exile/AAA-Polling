import { create } from 'zustand';

interface NavigationState {
  peerAddress: string | null;
  message: string | null;
  setPeerAddress: (peerAddress: string | null) => void;
  setMessage: (message: string | null) => void;
}

const useNavigationStore = create<NavigationState>((set) => ({
  peerAddress: null,
  message: null,
  setPeerAddress: (peerAddress) => set({ peerAddress }),
  setMessage: (message) => set({ message }),
}));

export default useNavigationStore;
