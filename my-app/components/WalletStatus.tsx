'use client'

import { useAccount, useBalance, useSignMessage, useSwitchChain } from 'wagmi'
import { Button } from './ui/button'
import { useState, useEffect } from 'react'
import { bsc } from 'wagmi/chains'

export function WalletStatus() {
  const { address, isConnected, chainId } = useAccount()
  const { switchChain } = useSwitchChain()
  const { signMessage } = useSignMessage()
  const [isSigned, setIsSigned] = useState(false)
  const [signature, setSignature] = useState<string | null>(null)
  const [signingError, setSigningError] = useState<string | null>(null)

  // Get BNB balance on BSC network
  const { data: bnbBalance, isLoading: balanceLoading } = useBalance({
    address,
    chainId: bsc.id,
    query: {
      enabled: isConnected && isSigned,
    }
  })

  // Reset signing state when wallet disconnects or changes
  useEffect(() => {
    if (!isConnected) {
      setIsSigned(false)
      setSignature(null)
      setSigningError(null)
    }
  }, [isConnected, address])

  const handleSignMessage = async () => {
    if (!address) return

    const message = `Sign to verify your address: ${address}\n\nTimestamp: ${new Date().toISOString()}`
    
    try {
      setSigningError(null)
      const result = await signMessage({ message })
      setSignature(result)
      setIsSigned(true)
      console.log('Message signed successfully:', result)
    } catch (error: any) {
      console.error('Signing failed:', error)
      setSigningError(error.message || 'Signing failed')
      if (error.message?.includes('User rejected')) {
        setSigningError('You rejected the signing request')
      }
    }
  }

  const switchToBSC = async () => {
    try {
      await switchChain({ chainId: bsc.id })
    } catch (error) {
      console.error('Failed to switch to BSC:', error)
    }
  }

  const formatBalance = (balance: bigint, decimals: number, symbol: string) => {
    const formatted = (Number(balance) / Math.pow(10, decimals)).toFixed(4)
    return `${formatted} ${symbol}`
  }

  if (!isConnected) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 bg-black/90 border border-[#47fc28]/20 rounded-lg p-4 min-w-[300px] text-white">
      <h3 className="font-bold text-lg mb-3 text-[#47fc28]">Wallet Status</h3>
      
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-300">Address:</p>
          <p className="text-xs break-all">{address}</p>
        </div>

        <div>
          <p className="text-sm text-gray-300">Current Network:</p>
          <p className="text-xs">
            {chainId === bsc.id ? 'BSC Mainnet' : 
             chainId === 1 ? 'Ethereum Mainnet' : 
             chainId === 11155111 ? 'Sepolia Testnet' : 
             `Chain ID: ${chainId}`}
          </p>
          {chainId !== bsc.id && (
            <Button 
              onClick={switchToBSC}
              className="mt-1 text-xs bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 h-auto"
            >
              Switch to BSC
            </Button>
          )}
        </div>

        {!isSigned ? (
          <div>
            <p className="text-sm text-gray-300 mb-2">Verification Required:</p>
            <Button 
              onClick={handleSignMessage}
              className="bg-[#47fc28] text-black hover:bg-[#3be01f] text-sm"
            >
              Sign to Verify Address
            </Button>
            {signingError && (
              <p className="text-red-400 text-xs mt-1">{signingError}</p>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm text-green-400">Address Verified ✓</p>
            </div>

            <div>
              <p className="text-sm text-gray-300">BNB Balance (BSC):</p>
              {balanceLoading ? (
                <p className="text-sm">Loading...</p>
              ) : bnbBalance ? (
                <p className="text-lg font-bold text-[#47fc28]">
                  {formatBalance(bnbBalance.value, bnbBalance.decimals, bnbBalance.symbol)}
                </p>
              ) : (
                <p className="text-sm text-gray-400">Unable to fetch balance</p>
              )}
            </div>

            {signature && (
              <div>
                <p className="text-sm text-gray-300">Signature:</p>
                <p className="text-xs break-all text-gray-400">{signature.slice(0, 50)}...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}