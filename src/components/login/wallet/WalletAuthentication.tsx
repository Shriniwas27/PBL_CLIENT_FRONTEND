
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCw, ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface WalletAuthenticationProps {
  walletAddress: string;
}

const WalletAuthentication: React.FC<WalletAuthenticationProps> = ({ walletAddress }) => {
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
      
      // Store user wallet address and auth info in sessionStorage
      sessionStorage.setItem('walletAddress', accounts[0]);
      sessionStorage.setItem('authMethod', 'wallet');
      sessionStorage.setItem('isAuthenticated', 'true');
      
      // Mock voter information - in a real app, this would come from the backend
      // based on the wallet address
      sessionStorage.setItem('voterName', 'John Smith');
      sessionStorage.setItem('voterId', 'ABC1234567');
      sessionStorage.setItem('constituency', 'North District');
      
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

export default WalletAuthentication;
