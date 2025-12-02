"use client"

import { useEffect, useState } from "react"
import { useWallet } from "@/lib/useWallet"
import type { BorrowRecord } from "@/lib/mock-contracts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const BOOK_NAMES: Record<number, string> = {
  0: "Blockchain Basics",
  1: "Smart Contracts 101",
  2: "Solidity Programming",
  3: "DeFi Protocols",
  4: "Web3 Development",
  5: "Crypto Economics",
}

export function BorrowHistory({ onReturn }: { onReturn: (bookId: number) => void }) {
  const { isConnected, walletManager } = useWallet()
  const [history, setHistory] = useState<BorrowRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true)
        setError(null)
        const records = await walletManager.getBorrowHistory()
        setHistory(records)
        console.log("[v0] Borrow history loaded:", records)
      } catch (err: any) {
        setError(err.message)
        console.error("[v0] Error loading history:", err)
      } finally {
        setLoading(false)
      }
    }

    if (isConnected) {
      fetchHistory()
    }
  }, [isConnected, walletManager])

  // Auto-refresh history every 2 seconds
  useEffect(() => {
    if (!isConnected) return
    const interval = setInterval(async () => {
      try {
        const records = await walletManager.getBorrowHistory()
        setHistory(records)
      } catch (err) {
        // Silent fail on refresh
      }
    }, 2000)
    return () => clearInterval(interval)
  }, [isConnected, walletManager])

  if (!isConnected) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-gray-600">Connect your wallet to view history</CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">Loading history...</CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-red-600">Error: {error}</CardContent>
      </Card>
    )
  }

  const activeBorrows = history.filter((r) => r.status === "borrowed")
  const returnedBooks = history.filter((r) => r.status !== "borrowed")

  return (
    <div className="space-y-4">
      {activeBorrows.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-yellow-900">Active Borrows</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeBorrows.map((record, idx) => {
              const daysRemaining = Math.max(
                0,
                Math.floor((record.dueDate - Math.floor(Date.now() / 1000)) / (24 * 60 * 60)),
              )
              const isOverdue = daysRemaining === 0
              const now = Math.floor(Date.now() / 1000)
              const daysOverdue = Math.max(0, Math.floor((now - record.dueDate) / (24 * 60 * 60)))
              const estimatedFee = daysOverdue * 0.5

              return (
                <div
                  key={idx}
                  className="bg-white p-3 rounded border border-yellow-200 flex justify-between items-start"
                >
                  <div className="flex-1">
                    <p className="font-medium">{BOOK_NAMES[record.bookId] || `Book ${record.bookId}`}</p>
                    <p className="text-sm text-gray-600">
                      {isOverdue ? (
                        <span className="text-red-600 font-semibold">
                          {daysOverdue} days overdue (Fee: {estimatedFee.toFixed(2)} ETH)
                        </span>
                      ) : (
                        <span>Due in {daysRemaining} days</span>
                      )}
                    </p>
                  </div>
                  <Button onClick={() => onReturn(record.bookId)} size="sm">
                    Return
                  </Button>
                </div>
              )
            })}
          </CardContent>
        </Card>
      )}

      {returnedBooks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">📖 Return History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {returnedBooks.map((record, idx) => {
                const returnDate = record.returnDate ? new Date(record.returnDate * 1000).toLocaleDateString() : "-"
                const borrowDate = new Date(record.borrowDate * 1000).toLocaleDateString()

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border-l-4 transition ${
                      record.status === "returned"
                        ? "bg-green-50 border-green-500 hover:bg-green-100"
                        : "bg-red-50 border-red-500 hover:bg-red-100"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl">
                            {record.status === "returned" ? "✅" : "⚠️"}
                          </span>
                          <div>
                            <p className="font-semibold text-sm">
                              {BOOK_NAMES[record.bookId] || `Book ${record.bookId}`}
                            </p>
                            <p className="text-xs text-gray-600">
                              Borrowed: {borrowDate} • Returned: {returnDate}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p
                          className={`text-lg font-bold ${
                            record.fee > 0 ? "text-red-600" : "text-green-600"
                          }`}
                        >
                          {record.fee > 0 ? `-${record.fee.toFixed(4)} ETH` : "✓ No fee"}
                        </p>
                        <p className="text-xs font-medium text-gray-600">
                          {record.status === "returned" ? "On-time return" : "Late return"}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {history.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center text-gray-600">
            No borrowing history yet. Borrow a book to get started!
          </CardContent>
        </Card>
      )}
    </div>
  )
}
