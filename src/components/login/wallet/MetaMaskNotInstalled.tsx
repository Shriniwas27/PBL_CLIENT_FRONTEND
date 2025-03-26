
import React from 'react';
import { KeyRound, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const MetaMaskNotInstalled = () => {
  const handleInstallMetaMask = () => {
    window.open('https://metamask.io/download/', '_blank');
  };

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
};

export default MetaMaskNotInstalled;
