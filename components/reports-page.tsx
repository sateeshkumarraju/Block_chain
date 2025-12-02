"use client"

import { useWallet } from "@/lib/useWallet"
import { TransactionDetails } from "@/components/transaction-details"
import { WalletConnection } from "@/components/wallet-connection"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ReportsPage() {
  const { isConnected } = useWallet()

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">📊 Transaction & Account Reports</h1>
            <p className="text-gray-600">View your complete transaction history and account statistics</p>
          </div>
          <Link href="/" className="ml-4">
            <Button variant="outline" className="flex items-center gap-2">
              ← Back to Home
            </Button>
          </Link>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <WalletConnection />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {isConnected ? (
              <TransactionDetails />
            ) : (
              <Card>
                <CardContent className="pt-12 text-center space-y-4">
                  <p className="text-lg text-gray-600">Connect your wallet to view transaction reports</p>
                  <p className="text-sm text-gray-500">All your borrowing history, fees, and rewards will be displayed here</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Information Cards */}
        {isConnected && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">How Fees Work</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>• Books have a 30-day borrow period</p>
                <p>• Late fees: 50% per day overdue</p>
                <p>• On-time return: +10 reward tokens</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Account Limits</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>• Maximum 5 books at once</p>
                <p>• Unlimited transaction history</p>
                <p>• Unlimited reward tokens</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Actions You Can Take</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>• Borrow available books</p>
                <p>• Return borrowed books</p>
                <p>• Track all transactions</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
