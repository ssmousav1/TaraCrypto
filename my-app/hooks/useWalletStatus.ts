'use client'

import { useAccount, useBalance, useChainId } from 'wagmi'
import { mainnet } from 'wagmi/chains'

export function useWalletStatus() {
  const { address, isConnected, isConnecting, isDisconnected } = useAccount()
  const chainId = useChainId()
  const { data: balance } = useBalance({
    address,
  })

  const isOnMainnet = chainId === mainnet.id

  return {
    address,
    isConnected,
    isConnecting,
    isDisconnected,
    balance,
    chainId,
    isOnMainnet,
  }
}