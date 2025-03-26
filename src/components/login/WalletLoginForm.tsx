
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Wallet, RotateCw, ArrowRight, CheckCircle, AlertCircle, KeyRound } from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (request: { method: string, params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (event: string, callback: (...args: any[]) => void) => void;
      // Add selectedAddress as an optional property
      selectedAddress?: string;
    };
  }
}

const WalletLoginForm = () => {
  const navigate = useNavigate();
  const [walletConnected, setWalletConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [hasMetaMask, setHasMetaMask] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
        toast.error('Wallet disconnected');
      } else {
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
  
  const formatAddress = (address: string) => {
    return address.slice(0, 6) + '...' + address.slice(-4);
  };

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    setErrorMessage('');
    
    try {
      // Request account access
      const accounts = await window.ethereum!.request({ 
        method: 'eth_requestAccounts' 
      });
      
      setWalletConnected(true);
      setWalletAddress(formatAddress(accounts[0]));
      toast.success('Wallet connected successfully');
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      setErrorMessage(error.message || 'Failed to connect wallet');
      toast.error('Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleInstallMetaMask = () => {
    window.open('https://metamask.io/download/', '_blank');
  };

  const handleWalletLogin = async () => {
    // Simulate wallet authentication with signature
    setIsVerifying(true);
    setErrorMessage('');
    
    try {
      // Get the connected accounts
      const accounts = await window.ethereum!.request({ 
        method: 'eth_accounts' 
      });
      
      if (accounts.length === 0) {
        throw new Error('No accounts connected. Please connect your wallet first.');
      }
      
      // Store user wallet address in sessionStorage for use in voting
      sessionStorage.setItem('walletAddress', accounts[0]);
      
      // Success
      toast.success('Authentication successful');
      setIsVerifying(false);
      navigate('/candidates');
    } catch (error: any) {
      console.error("Error during wallet login:", error);
      setErrorMessage(error.message || 'Failed to complete authentication');
      toast.error('Authentication failed');
      setIsVerifying(false);
    }
  };

  // If MetaMask is not installed
  if (!hasMetaMask) {
    return (
      <div className="space-y-4">
        <Alert className="border-amber-200 bg-amber-50">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertTitle>MetaMask Required</AlertTitle>
          <AlertDescription>
            You need to install the MetaMask browser extension to use this login method and to sign your votes.
          </AlertDescription>
        </Alert>
        
        <Button 
          onClick={handleInstallMetaMask} 
          className="w-full"
        >
          <KeyRound className="mr-2 h-4 w-4" />
          Install MetaMask
        </Button>
      </div>
    );
  }

  if (!walletConnected) {
    return (
      <div className="p-6 border border-dashed border-primary/40 rounded-lg bg-primary/5 text-center">
        <Wallet className="h-12 w-12 text-primary/60 mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">Connect Your Wallet</h3>
        <p className="text-sm text-foreground/70 mb-4">
          You'll need MetaMask wallet to authenticate and sign your vote transactions securely on the blockchain.
        </p>
        
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {errorMessage}
          </div>
        )}
        
        <Button
          onClick={handleConnectWallet}
          disabled={isConnecting}
          className="w-full"
        >
          {isConnecting ? (
            <>
              <RotateCw className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <Wallet className="mr-2 h-4 w-4" />
              Connect MetaMask
            </>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="p-4 border border-green-200 rounded-lg bg-green-50 flex items-center gap-3">
        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
        <div>
          <p className="font-medium text-green-800">Wallet Connected</p>
          <p className="text-sm text-green-700">{walletAddress}</p>
        </div>
      </div>
      
      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {errorMessage}
        </div>
      )}
      
      <Button
        className="w-full"
        onClick={handleWalletLogin}
        disabled={isVerifying}
      >
        {isVerifying ? (
          <>
            <RotateCw className="mr-2 h-4 w-4 animate-spin" />
            Authenticating...
          </>
        ) : (
          <>
            Proceed to Voting
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
};

export default WalletLoginForm;
