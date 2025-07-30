"use client";

import { useAccount, useConnect, useDisconnect, useBalance, useSignMessage, useSwitchChain } from "wagmi";
import { Button } from "./ui/button";
import { useState, useEffect, useRef } from "react";
import { bsc } from "wagmi/chains";

// Extend Window interface for MetaMask
declare global {
  interface Window {
    ethereum?: any;
  }
}

export function WalletConnect() {
  const { address, isConnected, chainId } = useAccount();
  const { connectors, connect, isPending, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const { signMessage } = useSignMessage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  const [signingError, setSigningError] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Get BNB balance on BSC network
  const { data: bnbBalance, isLoading: balanceLoading } = useBalance({
    address,
    chainId: bsc.id,
    query: {
      enabled: isConnected && isSigned,
    }
  });

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatBalance = (balance: bigint, decimals: number, symbol: string) => {
    const formatted = (Number(balance) / Math.pow(10, decimals)).toFixed(4);
    return `${formatted} ${symbol}`;
  };

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isMenuOpen]);

  // Reset signing state when wallet disconnects or changes
  useEffect(() => {
    if (!isConnected) {
      setIsSigned(false);
      setSignature(null);
      setSigningError(null);
    }
  }, [isConnected, address]);

  const handleSignMessage = async () => {
    if (!address) return;

    const message = `Sign to verify your address: ${address}\n\nTimestamp: ${new Date().toISOString()}`;
    
    try {
      setSigningError(null);
      const result = await signMessage({ message });
      setSignature(result);
      setIsSigned(true);
      console.log('Message signed successfully:', result);
    } catch (error: any) {
      console.error('Signing failed:', error);
      setSigningError(error.message || 'Signing failed');
      if (error.message?.includes('User rejected')) {
        setSigningError('You rejected the signing request');
      }
    }
  };

  const switchToBSC = async () => {
    try {
      await switchChain({ chainId: bsc.id });
    } catch (error) {
      console.error('Failed to switch to BSC:', error);
    }
  };

  const handleConnect = async (connector: any) => {
    console.log(
      "Attempting to connect with connector:",
      connector.name,
      connector.id
    );

    try {
      // Check if MetaMask is available
      if (connector.name === "MetaMask" && typeof window !== "undefined") {
        if (!window.ethereum) {
          alert(
            "MetaMask is not installed. Please install MetaMask extension."
          );
          return;
        }
      }

      const result = await connect({ connector });
      console.log("Connection successful:", result);
      setIsMenuOpen(false);
    } catch (err: any) {
      console.error("Failed to connect:", err);

      // Handle specific error types
      if (err.message?.includes("User rejected")) {
        console.log("User rejected the connection request");
      } else if (err.message?.includes("No provider")) {
        alert(
          "Wallet not found. Please make sure your wallet extension is installed and enabled."
        );
      } else {
        alert(`Connection failed: ${err.message || "Unknown error"}`);
      }
    }
  };

  if (isConnected) {
    return (
      <div className="relative" ref={menuRef}>
        <Button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`h-8 md:h-10 px-3 md:px-4 py-1 md:py-2 font-medium text-xs md:text-sm ${
            isSigned 
              ? 'bg-primary text-black hover:bg-primary-hover' 
              : 'bg-yellow-600 text-white hover:bg-yellow-700'
          }`}
        >
          {isSigned && bnbBalance ? (
            `${formatBalance(bnbBalance.value, bnbBalance.decimals, bnbBalance.symbol)}`
          ) : (
            formatAddress(address as string)
          )}
        </Button>

        {isMenuOpen && (
          <div className="absolute right-0 top-12 z-20 min-w-[320px] bg-black/90 border border-[#47fc28]/20 rounded-lg shadow-lg p-4">
            <div className="space-y-3">
              {/* Address */}
              <div>
                <p className="text-gray-300 text-xs mb-1">Address:</p>
                <p className="text-white text-xs break-all">{address}</p>
              </div>

              {/* Network Status */}
              <div>
                <p className="text-gray-300 text-xs mb-1">Current Network:</p>
                <div className="flex items-center justify-between">
                  <p className="text-white text-xs">
                    {chainId === bsc.id ? 'BSC Mainnet' : 
                     chainId === 1 ? 'Ethereum Mainnet' : 
                     chainId === 11155111 ? 'Sepolia Testnet' : 
                     `Chain ID: ${chainId}`}
                  </p>
                  {chainId !== bsc.id && (
                    <Button 
                      onClick={switchToBSC}
                      className="text-xs bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 h-auto ml-2"
                    >
                      Switch to BSC
                    </Button>
                  )}
                </div>
              </div>

              {/* Verification Status */}
              {!isSigned ? (
                <div>
                  <p className="text-gray-300 text-xs mb-2">Verification Required:</p>
                  <Button 
                    onClick={handleSignMessage}
                    className="w-full bg-[#47fc28] text-black hover:bg-[#3be01f] text-sm mb-2"
                  >
                    Sign to Verify Address
                  </Button>
                  {signingError && (
                    <p className="text-red-400 text-xs">{signingError}</p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-green-400 text-sm">Address Verified ✓</p>
                  </div>

                  {/* BNB Balance */}
                  <div>
                    <p className="text-gray-300 text-xs mb-1">BNB Balance (BSC):</p>
                    {balanceLoading ? (
                      <p className="text-sm text-gray-400">Loading...</p>
                    ) : bnbBalance ? (
                      <p className="text-lg font-bold text-[#47fc28]">
                        {formatBalance(bnbBalance.value, bnbBalance.decimals, bnbBalance.symbol)}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-400">Unable to fetch balance</p>
                    )}
                  </div>

                  {/* Signature (truncated) */}
                  {signature && (
                    <div>
                      <p className="text-gray-300 text-xs mb-1">Signature:</p>
                      <p className="text-xs break-all text-gray-400">{signature.slice(0, 50)}...</p>
                    </div>
                  )}
                </div>
              )}

              {/* Disconnect Button */}
              <Button
                onClick={() => {
                  disconnect();
                  setIsMenuOpen(false);
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white text-sm"
              >
                Disconnect
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <Button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        disabled={isPending}
        className="h-8 md:h-10 px-3 md:px-4 py-1 md:py-2 bg-primary text-black hover:bg-primary-hover font-medium text-xs md:text-sm disabled:opacity-50"
      >
        {isPending ? "Connecting..." : "Connect Wallet"}
      </Button>

      {isMenuOpen && (
        <div className="absolute right-0 top-12 z-20 min-w-[200px] bg-black/90 border border-[#47fc28]/20 rounded-lg shadow-lg p-2">
          <div className="px-3 py-2 text-gray-400 text-xs border-b border-gray-700 mb-2">
            Choose Wallet
          </div>
          {error && (
            <div className="px-3 py-2 text-red-500 text-xs mb-2">
              {error.message}
            </div>
          )}
          <div className="space-y-1">
            {connectors.map((connector) => (
              <Button
                key={connector.uid}
                onClick={() => {
                  console.log('connectorconnectorconnectorconnector',connector);
                  
                  handleConnect(connector);
                }}
                disabled={isPending}
                className="w-full justify-start bg-transparent hover:bg-[#47fc28]/10 text-white text-sm border-0 shadow-none disabled:opacity-50"
              >
                {connector.name}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
