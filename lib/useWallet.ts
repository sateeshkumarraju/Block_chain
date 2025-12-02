"use client"

import { useState, useEffect } from "react"
import { walletManager } from "./wallet-manager"

export function useWallet() {
  const [account, setAccount] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if already connected
    const initializeWallet = async () => {
      try {
        console.log("[v0] ═══════════════════════════════════════════════════════════")
        console.log("[v0] 🔄 WALLET INITIALIZATION ON PAGE LOAD")
        console.log("[v0] ═══════════════════════════════════════════════════════════")
        
        // First, try to restore from localStorage (page refresh)
        const storedAccount = typeof window !== "undefined" ? localStorage.getItem("connectedAccount") : null
        const wasConnected = typeof window !== "undefined" ? localStorage.getItem("isConnected") === "true" : false
        
        console.log("[v0] Stored Account:", storedAccount)
        console.log("[v0] Was Connected:", wasConnected)
        
        if (storedAccount && wasConnected) {
          console.log("[v0] ✅ RESTORING WALLET FROM LOCALSTORAGE")
          
          // Restore wallet manager state
          await walletManager.restoreFromStorage()
          
          setAccount(storedAccount)
          setIsConnected(true)
          console.log("[v0] ✅ Wallet restored successfully")
          console.log("[v0] ═══════════════════════════════════════════════════════════")
          return
        }
        
        console.log("[v0] No stored wallet found")
        console.log("[v0] ═══════════════════════════════════════════════════════════")
      } catch (err) {
        console.error("[v0] Wallet initialization error:", err)
      }
    }

    initializeWallet()
  }, [])

  const connectWallet = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const address = await walletManager.connectWallet()
      setAccount(address)
      setIsConnected(true)
    } catch (err: any) {
      setError(err.message)
      setIsConnected(false)
    } finally {
      setIsLoading(false)
    }
  }

  const disconnectWallet = () => {
    walletManager.disconnectWallet()
    setAccount(null)
    setIsConnected(false)
    setError(null)
  }

  return {
    account,
    isConnected,
    isLoading,
    error,
    connectWallet,
    disconnectWallet,
    walletManager,
  }
}
