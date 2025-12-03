"use client"

import { useState, useEffect } from "react"
import { useWallet } from "@/lib/useWallet"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface LibraryCard {
  tokenId: number
  holder: string
  issueDate: number
  expiryDate: number
  borrowCount: number
  isValid: boolean
}

export function NFTLibraryCard() {
  const { isConnected, walletManager, account } = useWallet()
  const [card, setCard] = useState<LibraryCard | null>(null)
  const [loading, setLoading] = useState(true)
  const [minting, setMinting] = useState(false)
  const [renewing, setRenewing] = useState(false)

  useEffect(() => {
    if (isConnected) {
      fetchCard()
    }
  }, [isConnected])

  const fetchCard = async () => {
    try {
      setLoading(true)
      const cardData = await walletManager.getLibraryCard()
      setCard(cardData)
    } catch (err) {
      setCard(null)
    } finally {
      setLoading(false)
    }
  }

  const handleMintCard = async () => {
    try {
      setMinting(true)
      await walletManager.mintLibraryCard()
      await fetchCard()
    } catch (err: any) {
      console.error("Error minting card:", err)
    } finally {
      setMinting(false)
    }
  }

  const handleRenewCard = async () => {
    try {
      setRenewing(true)
      await walletManager.renewLibraryCardNFT()
      await fetchCard()
    } catch (err: any) {
      console.error("Error renewing card:", err)
    } finally {
      setRenewing(false)
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getDaysRemaining = (expiryDate: number) => {
    const now = Math.floor(Date.now() / 1000)
    const days = Math.floor((expiryDate - now) / (24 * 60 * 60))
    return Math.max(0, days)
  }

  if (!isConnected) {
    return null
  }

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white">
        <CardContent className="pt-6 text-center">
          Loading card...
        </CardContent>
      </Card>
    )
  }

  // No card yet - show mint option
  if (!card) {
    return (
      <Card className="bg-gradient-to-br from-gray-700 to-gray-900 text-white overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            🎴 NFT Library Card
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-4">
            <p className="text-gray-300 text-sm mb-4">
              You don't have a library card yet. Mint your NFT membership card to unlock exclusive benefits!
            </p>
            <div className="bg-white/10 rounded-lg p-3 mb-4">
              <p className="text-xs text-gray-300">Benefits include:</p>
              <ul className="text-xs text-gray-200 mt-2 space-y-1">
                <li>✨ Unique NFT ownership proof</li>
                <li>📚 Priority book reservations</li>
                <li>🎁 Double reward tokens</li>
                <li>⏰ Extended borrowing period</li>
              </ul>
            </div>
            <Button 
              onClick={handleMintCard} 
              disabled={minting}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 w-full"
            >
              {minting ? "Minting..." : "🎴 Mint Library Card (FREE)"}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Has card - show card details
  const daysRemaining = getDaysRemaining(card.expiryDate)
  const isExpiringSoon = daysRemaining < 30 && daysRemaining > 0
  const isExpired = daysRemaining === 0

  return (
    <Card className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 text-white overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
      
      <CardHeader className="pb-2 relative z-10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            🎴 NFT Library Card
          </CardTitle>
          <Badge className={`${card.isValid ? 'bg-green-500' : 'bg-red-500'} text-white`}>
            {card.isValid ? '✓ Active' : '✗ Expired'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 relative z-10">
        {/* Card Visual */}
        <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs text-purple-200">Card ID</p>
              <p className="font-mono text-lg font-bold">#{card.tokenId}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-purple-200">ERC-721</p>
              <p className="font-mono text-xs">LibraryCard</p>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-3 mt-3">
            <p className="text-xs text-purple-200">Holder</p>
            <p className="font-mono text-xs truncate">{card.holder}</p>
          </div>
        </div>

        {/* Card Stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white/10 rounded-lg p-2">
            <p className="text-lg font-bold">{card.borrowCount}</p>
            <p className="text-xs text-purple-200">Borrows</p>
          </div>
          <div className="bg-white/10 rounded-lg p-2">
            <p className="text-lg font-bold">{daysRemaining}</p>
            <p className="text-xs text-purple-200">Days Left</p>
          </div>
          <div className="bg-white/10 rounded-lg p-2">
            <p className="text-xs font-bold">{formatDate(card.issueDate)}</p>
            <p className="text-xs text-purple-200">Issued</p>
          </div>
        </div>

        {/* Expiry Warning */}
        {isExpiringSoon && (
          <div className="bg-yellow-500/20 border border-yellow-400/50 rounded-lg p-2 text-center">
            <p className="text-yellow-200 text-sm">⚠️ Card expiring soon!</p>
          </div>
        )}

        {isExpired && (
          <div className="bg-red-500/20 border border-red-400/50 rounded-lg p-2 text-center">
            <p className="text-red-200 text-sm">❌ Card has expired</p>
          </div>
        )}

        {/* Renew Button */}
        {(isExpiringSoon || isExpired) && (
          <Button 
            onClick={handleRenewCard} 
            disabled={renewing}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 w-full"
          >
            {renewing ? "Renewing..." : "🔄 Renew Card (FREE)"}
          </Button>
        )}

        {/* Valid Until */}
        <div className="text-center text-xs text-purple-200">
          Valid until: {formatDate(card.expiryDate)}
        </div>
      </CardContent>
    </Card>
  )
}
