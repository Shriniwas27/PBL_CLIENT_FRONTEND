
import { useState, useEffect } from 'react';

interface MetaMaskState {
  hasMetaMask: boolean;
  walletConnected: boolean;
  walletAddress: string;
  checkIfWalletIsConnected: () => Promise<void>;
}

// Define ethereum interface for the window object
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (request: { method: string, params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (event: string, callback: (...args: any[]) => void) => void;
      selectedAddress?: string;
    };
  }
}

const useMetaMask = (): MetaMaskState => {
  const [hasMetaMask, setHasMetaMask] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const formatAddress = (address: string) => {
    return address.slice(0, 6) + '...' + address.slice(-4);
  };

  const checkIfWalletIsConnected = async () => {
    try {
      // Check if we have access to accounts
      const accounts = await window.ethereum!.request({ method: 'eth_accounts' });
      
      if (accounts.length > 0) {
        setWalletConnected(true);
        setWalletAddress(formatAddress(accounts[0]));
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
    }
  };

  useEffect(() => {
    // Check if MetaMask is installed
    if (window.ethereum?.isMetaMask) {
      setHasMetaMask(true);
      
      // Check if already connected
      checkIfWalletIsConnected();
    }
    
    // Set up event listeners
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected their wallet
        setWalletConnected(false);
        setWalletAddress('');
      } else {
        setWalletConnected(true);
        setWalletAddress(formatAddress(accounts[0]));
      }
    };
    
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }
    
    return () => {
      // Clean up event listeners
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  return {
    hasMetaMask,
    walletConnected,
    walletAddress,
    checkIfWalletIsConnected
  };
};

export default useMetaMask;
