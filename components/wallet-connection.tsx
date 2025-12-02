"use client"

import { useWallet } from "@/lib/useWallet"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react"

export function WalletConnection() {
  const { account, isConnected, isLoading, error, connectWallet, disconnectWallet, walletManager } = useWallet()
  const [copied, setCopied] = useState(false)
  const [balance, setBalance] = useState<string | null>(null)
  const [balanceLoading, setBalanceLoading] = useState(false)

  // Fetch balance when connected
  useEffect(() => {
    if (isConnected && account) {
      fetchBalance()
    }
  }, [isConnected, account])

  const fetchBalance = async () => {
    try {
      setBalanceLoading(true)
      const bal = await walletManager.getBalance()
      setBalance(bal)
    } catch (err) {
      console.error("Error fetching balance:", err)
      setBalance(null)
    } finally {
      setBalanceLoading(false)
    }
  }

  const handleCopyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleSwitchToSepolia = async () => {
    try {
      await walletManager.switchToSepolia()
      alert("Switched to Sepolia testnet")
    } catch (err: any) {
      alert("Failed to switch network: " + err.message)
    }
  }

  const handleDisconnect = () => {
    disconnectWallet()
  }

  if (isConnected && account) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">💰 Connected</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600 mb-1">Account</p>
              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                <code className="text-xs flex-1 break-all font-mono">{account}</code>
                <button
                  onClick={handleCopyAddress}
                  className="p-1 hover:bg-gray-200 rounded text-lg flex-shrink-0"
                  title="Copy address"
                >
                  {copied ? "✓" : "📋"}
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Balance</p>
              <div className="bg-blue-50 p-2 rounded">
                <p className="text-sm font-mono">
                  {balanceLoading ? "Loading..." : balance ? `${parseFloat(balance).toFixed(4)} ETH` : "Error"}
                </p>
              </div>
              <button
                onClick={fetchBalance}
                className="text-xs text-gray-600 hover:text-gray-900 mt-1"
                disabled={balanceLoading}
              >
                {balanceLoading ? "Refreshing..." : "Refresh"}
              </button>
            </div>

            <Button onClick={handleSwitchToSepolia} variant="outline" className="w-full text-xs">
              Switch to Sepolia
            </Button>

            <Button 
              onClick={handleDisconnect} 
              variant="destructive" 
              className="w-full text-xs bg-red-600 hover:bg-red-700"
            >
              🔌 Disconnect Wallet
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">💰 Connect Wallet</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Button onClick={connectWallet} disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700">
            {isLoading ? "Connecting..." : "🦊 Connect MetaMask"}
          </Button>
          
          {error && (
            <div className="bg-red-50 p-2 rounded border border-red-200">
              <p className="text-sm text-red-600">{error}</p>
              {error.includes("not installed") && (
                <p className="text-xs text-red-500 mt-1">
                  👉 Please install MetaMask extension first: metamask.io
                </p>
              )}
            </div>
          )}
          
          <div className="bg-blue-50 p-3 rounded border border-blue-200">
            <p className="text-xs text-blue-800 font-semibold mb-2">📌 How it works:</p>
            <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
              <li>Click "Connect MetaMask" above</li>
              <li>MetaMask popup will appear</li>
              <li>Select your wallet account</li>
              <li>Click "Next" then "Connect"</li>
              <li>✅ Done! Now you can pay for books</li>
            </ul>
          </div>
          
          <p className="text-xs text-gray-600 text-center border-t pt-2">
            💡 Using <strong>MetaMask</strong> for secure payments.<br/>
            Don't have MetaMask? Get it at <strong>metamask.io</strong>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
