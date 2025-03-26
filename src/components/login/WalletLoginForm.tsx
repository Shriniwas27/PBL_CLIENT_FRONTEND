
import React from 'react';
import useMetaMask from './wallet/useMetaMask';
import MetaMaskNotInstalled from './wallet/MetaMaskNotInstalled';
import ConnectWallet from './wallet/ConnectWallet';
import WalletAuthentication from './wallet/WalletAuthentication';

const WalletLoginForm = () => {
  const { hasMetaMask, walletConnected, walletAddress, checkIfWalletIsConnected } = useMetaMask();

  const handleWalletConnected = (address: string) => {
    // After wallet is connected, refresh the connection state
    checkIfWalletIsConnected();
  };

  // If MetaMask is not installed
  if (!hasMetaMask) {
    return <MetaMaskNotInstalled />;
  }

  // If wallet is not connected yet
  if (!walletConnected) {
    return <ConnectWallet onWalletConnected={handleWalletConnected} />;
  }

  // Wallet is connected, proceed to authentication
  return <WalletAuthentication walletAddress={walletAddress} />;
};

export default WalletLoginForm;
