"use client"

import { useEffect, useState } from "react"
import { useWallet } from "@/lib/useWallet"
import type { BorrowRecord, UserProfile } from "@/lib/mock-contracts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const BOOK_NAMES: Record<number, string> = {
  0: "Blockchain Basics",
  1: "Smart Contracts 101",
  2: "Solidity Programming",
  3: "DeFi Protocols",
  4: "Web3 Development",
  5: "Crypto Economics",
}

export function TransactionDetails() {
  const { isConnected, walletManager } = useWallet()
  const [history, setHistory] = useState<BorrowRecord[]>([])
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [records, userProfile] = await Promise.all([
          walletManager.getBorrowHistory(),
          walletManager.getUserProfile(),
        ])
        setHistory(records)
        setProfile(userProfile)
      } catch (err) {
        console.error("[v0] Error fetching details:", err)
      } finally {
        setLoading(false)
      }
    }

    if (isConnected) {
      fetchData()
    }
  }, [isConnected, walletManager])

  // Auto-refresh every 2 seconds
  useEffect(() => {
    if (!isConnected) return
    const interval = setInterval(async () => {
      try {
        const [records, userProfile] = await Promise.all([
          walletManager.getBorrowHistory(),
          walletManager.getUserProfile(),
        ])
        setHistory(records)
        setProfile(userProfile)
      } catch (err) {
        // Silent fail
      }
    }, 2000)
    return () => clearInterval(interval)
  }, [isConnected, walletManager])

  if (!isConnected) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-gray-600">Connect wallet to view transaction details</CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">Loading transaction details...</CardContent>
      </Card>
    )
  }

  const totalTransactions = history.length
  const completedTransactions = history.filter((r) => r.returnDate !== null).length
  const activeTransactions = history.filter((r) => r.status === "borrowed").length
  const totalFeesAccumulated = history.reduce((sum, r) => sum + r.fee, 0)
  const rewardsEarned = profile?.rewardsEarned || 0

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{totalTransactions}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{completedTransactions}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-600">{activeTransactions}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Fees Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">{totalFeesAccumulated.toFixed(4)} ETH</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Rewards Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{rewardsEarned} LRT</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Transaction List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">📋 Complete Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          {history.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No transactions yet</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {history.map((record, idx) => {
                const borrowDate = new Date(record.borrowDate * 1000)
                const returnDate = record.returnDate ? new Date(record.returnDate * 1000) : null
                const durationDays = record.returnDate
                  ? Math.floor((record.returnDate - record.borrowDate) / (24 * 60 * 60))
                  : Math.floor((Date.now() / 1000 - record.borrowDate) / (24 * 60 * 60))

                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border ${
                      record.status === "returned"
                        ? "bg-green-50 border-green-200"
                        : record.status === "overdue"
                          ? "bg-red-50 border-red-200"
                          : "bg-yellow-50 border-yellow-200"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm">
                            {BOOK_NAMES[record.bookId] || `Book ${record.bookId}`}
                          </span>
                          <Badge
                            className={
                              record.status === "returned"
                                ? "bg-green-200 text-green-800"
                                : record.status === "overdue"
                                  ? "bg-red-200 text-red-800"
                                  : "bg-yellow-200 text-yellow-800"
                            }
                          >
                            {record.status === "returned"
                              ? "✓ Completed"
                              : record.status === "overdue"
                                ? "⚠ Overdue"
                                : "Active"}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600">
                          {borrowDate.toLocaleDateString()} {borrowDate.toLocaleTimeString()} →{" "}
                          {returnDate ? `${returnDate.toLocaleDateString()} ${returnDate.toLocaleTimeString()}` : "Not returned"}
                        </p>
                        <p className="text-xs text-gray-600">Duration: {durationDays} days</p>
                      </div>
                      <div className="text-right ml-4">
                        <p
                          className={`text-lg font-bold ${
                            record.fee > 0 ? "text-red-600" : "text-green-600"
                          }`}
                        >
                          {record.fee > 0 ? `-${record.fee.toFixed(4)} ETH` : "No fee"}
                        </p>
                        {record.status === "returned" && record.fee === 0 && (
                          <p className="text-xs text-green-600 font-semibold">+10 Tokens</p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Report */}
      {profile && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-900">📊 Account Summary</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-blue-900">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Wallet Address</p>
                <p className="font-mono text-xs break-all">{profile.address}</p>
              </div>
              <div>
                <p className="font-semibold">Library Card Status</p>
                <p>{profile.hasLibraryCard ? "✓ Active" : "✗ Not Issued"}</p>
              </div>
              <div>
                <p className="font-semibold">Books Currently Borrowed</p>
                <p className="text-lg font-bold">{profile.borrowedBooks.length} / 5</p>
              </div>
              <div>
                <p className="font-semibold">Lifetime Statistics</p>
                <p>
                  Total Borrowed: <span className="font-bold">{profile.totalBorrowed}</span>
                </p>
              </div>
              <div>
                <p className="font-semibold">Total Fees Paid</p>
                <p className="text-red-600 font-bold">{profile.totalFeesPaid.toFixed(4)} ETH</p>
              </div>
              <div>
                <p className="font-semibold">Rewards Earned</p>
                <p className="text-green-600 font-bold">{profile.rewardsEarned} LRT</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
