
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, RotateCw } from 'lucide-react';
import { toast } from 'sonner';

interface ConnectWalletProps {
  onWalletConnected: (address: string) => void;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ onWalletConnected }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
      
      onWalletConnected(formatAddress(accounts[0]));
      toast.success('Wallet connected successfully');
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      setErrorMessage(error.message || 'Failed to connect wallet');
      toast.error('Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

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
};

export default ConnectWallet;
