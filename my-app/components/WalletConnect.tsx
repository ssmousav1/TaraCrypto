"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "./ui/button";
import { useState, useEffect, useRef } from "react";

// Extend Window interface for MetaMask
declare global {
  interface Window {
    ethereum?: any;
  }
}

export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connectors, connect, isPending, error } = useConnect();
  const { disconnect } = useDisconnect();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
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
          className="h-8 md:h-10 px-3 md:px-4 py-1 md:py-2 bg-primary text-black hover:bg-primary-hover font-medium text-xs md:text-sm"
        >
          {formatAddress(address as string)}
        </Button>

        {isMenuOpen && (
          <div className="absolute right-0 top-12 z-20 min-w-[200px] bg-black/90 border border-[#47fc28]/20 rounded-lg shadow-lg p-2">
            <div className="px-3 py-2 text-gray-400 text-xs border-b border-gray-700 mb-2 break-all">
              {address}
            </div>
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
