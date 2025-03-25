
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Wallet, RotateCw, ArrowRight, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const WalletLoginForm = () => {
  const navigate = useNavigate();
  const [walletConnected, setWalletConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleConnectWallet = () => {
    // Simulate connecting to MetaMask
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setWalletConnected(true);
      toast.success('Wallet connected successfully');
    }, 2000);
  };

  const handleWalletLogin = () => {
    // Simulate wallet authentication
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      toast.success('Authentication successful');
      navigate('/candidates');
    }, 2000);
  };

  if (!walletConnected) {
    return (
      <div className="p-6 border border-dashed border-primary/40 rounded-lg bg-primary/5 text-center">
        <Wallet className="h-12 w-12 text-primary/60 mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">Connect Your Wallet</h3>
        <p className="text-sm text-foreground/70 mb-4">
          You'll need MetaMask wallet to authenticate and sign your vote transactions securely.
        </p>
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
          <p className="text-sm text-green-700">0x71c...93a4</p>
        </div>
      </div>
      
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
