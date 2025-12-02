"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export interface Transaction {
  hash: string
  type: "borrow" | "return" | "card" | "approval"
  status: "pending" | "confirmed" | "failed"
  timestamp: number
  blockNumber?: number
  gasUsed?: string
  fee?: number
  bookTitle?: string
  explorerUrl?: string
}

interface TransactionTrackerProps {
  transactions?: Transaction[]
}

export function TransactionTracker({ transactions = [] }: TransactionTrackerProps) {
  const [displayedTx, setDisplayedTx] = useState<Transaction[]>([])

  useEffect(() => {
    setDisplayedTx(transactions)
  }, [transactions])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      borrow: "📚 Borrowed",
      return: "↩️ Returned",
      card: "🎫 Card Issued",
      approval: "✓ Approved",
    }
    return labels[type] || type
  }

  const formatHash = (hash: string) => {
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`
  }

  if (displayedTx.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>🔗 Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">No transactions yet</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>🔗 Recent Transactions ({displayedTx.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {displayedTx.map((tx, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{getTypeLabel(tx.type)}</span>
                  <Badge className={getStatusColor(tx.status)}>
                    {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <code className="bg-white px-2 py-1 rounded font-mono">{formatHash(tx.hash)}</code>
                  {tx.bookTitle && <span>• {tx.bookTitle}</span>}
                  {tx.fee !== undefined && <span>• Fee: {tx.fee.toFixed(4)} ETH</span>}
                </div>
              </div>
              {tx.explorerUrl && (
                <a
                  href={tx.explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-blue-600 hover:text-blue-800 text-lg"
                  title="View on Etherscan"
                >
                  🔍
                </a>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
