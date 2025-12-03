"use client"

import { useState, useEffect } from "react"
import { useWallet } from "@/lib/useWallet"
import { WalletConnection } from "./wallet-connection"
import { BookCatalog } from "./book-catalog"
import { UserProfile } from "./user-profile"
import { BorrowHistory } from "./borrow-history"
import { TransactionTracker, type Transaction } from "./transaction-tracker"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LibraryDashboard() {
  const { isConnected, walletManager } = useWallet()
  const [borrowing, setBorrowing] = useState(false)
  const [returning, setReturning] = useState(false)
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  
  // Add Book Dialog State
  const [addBookOpen, setAddBookOpen] = useState(false)
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    isbn: "",
    total: 1,
    borrowFee: 0
  })

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 4000)
  }

  const addTransaction = (tx: Transaction) => {
    setTransactions((prev) => [tx, ...prev].slice(0, 10)) // Keep last 10
  }

  const handleBorrow = async (bookId: number, title: string) => {
    if (!isConnected) {
      showNotification("error", "Please connect your wallet first")
      return
    }

    try {
      setBorrowing(true)
      console.log("[v0] Borrowing book:", title)
      
      // Show notification that MetaMask confirmation is needed
      showNotification("success", `⏳ Check MetaMask popup to confirm payment for "${title}"`)
      
      const hash = await walletManager.borrowBook(bookId)
      console.log("[v0] Borrow successful, hash:", hash)

      // Add transaction
      addTransaction({
        hash,
        type: "borrow",
        status: "confirmed",
        timestamp: Date.now(),
        bookTitle: title,
        explorerUrl: `https://sepolia.etherscan.io/tx/${hash}`,
      })

      showNotification("success", `✅ Payment confirmed! Successfully borrowed "${title}"!`)
      setRefreshKey((k) => k + 1) // Refresh profile and history
    } catch (err: any) {
      console.error("[v0] Borrow error:", err)
      
      // Handle specific error messages
      let errorMsg = err.message
      if (err.message.includes("rejected")) {
        errorMsg = "❌ You rejected the payment in MetaMask - no money was deducted"
      } else if (err.message.includes("Insufficient")) {
        errorMsg = "❌ Insufficient funds for the payment"
      } else if (err.message.includes("no money deducted")) {
        // Keep the full message as is
        errorMsg = err.message
      }
      
      showNotification("error", `Failed to borrow: ${errorMsg}`)
    } finally {
      setBorrowing(false)
    }
  }

  const handleReturn = async (bookId: number) => {
    if (!isConnected) {
      showNotification("error", "Please connect your wallet first")
      return
    }

    try {
      setReturning(true)
      const BOOK_NAMES: Record<number, string> = {
        0: "Blockchain Basics",
        1: "Smart Contracts 101",
        2: "Solidity Programming",
        3: "DeFi Protocols",
        4: "Web3 Development",
        5: "Crypto Economics",
      }
      const title = BOOK_NAMES[bookId] || `Book ${bookId}`
      console.log("[v0] Returning book:", title)
      const { transactionHash, fee } = await walletManager.returnBook(bookId)
      console.log("[v0] Return successful, fee:", fee)

      // Add transaction
      addTransaction({
        hash: transactionHash,
        type: "return",
        status: "confirmed",
        timestamp: Date.now(),
        bookTitle: title,
        fee,
        explorerUrl: `https://sepolia.etherscan.io/tx/${transactionHash}`,
      })

      let message = `Successfully returned "${title}"!`
      if (fee > 0) {
        message += ` Late fee: ${fee.toFixed(2)} ETH`
      } else {
        message += " No late fees!"
      }
      showNotification("success", message)
      setRefreshKey((k) => k + 1) // Refresh profile and history
    } catch (err: any) {
      console.error("[v0] Return error:", err)
      showNotification("error", `Failed to return: ${err.message}`)
    } finally {
      setReturning(false)
    }
  }

  // Enable mock mode for testing - NO auto-refresh to prevent blinking
  useEffect(() => {
    // NOTE: Only set mock mode if user hasn't connected MetaMask yet
    if (!isConnected && localStorage.getItem("useMockContracts") === null) {
      localStorage.setItem("useMockContracts", "true")
    }
  }, [isConnected])

  const handleAddBook = async () => {
    if (!newBook.title || !newBook.author) {
      showNotification("error", "Please fill in title and author")
      return
    }
    
    try {
      await walletManager.addBook(newBook)
      showNotification("success", `✅ Book "${newBook.title}" added successfully!`)
      setAddBookOpen(false)
      setNewBook({ title: "", author: "", isbn: "", total: 1, borrowFee: 0 })
      setRefreshKey((k) => k + 1) // Refresh to show new book
    } catch (err: any) {
      showNotification("error", `Failed to add book: ${err.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Smart Library System</h1>
          <p className="text-gray-600">Borrow books, earn rewards, powered by blockchain</p>
        </div>

        {/* Notifications */}
        {notification && (
          <div
            className={`flex items-center gap-3 p-4 rounded-lg ${
              notification.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            <span className="text-lg font-bold">{notification.type === "success" ? "✓" : "!"}</span>
            <span className="flex-1">{notification.message}</span>
          </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <WalletConnection />
            {transactions.length > 0 && <TransactionTracker transactions={transactions} />}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* User Profile */}
            {isConnected && <UserProfile key={`profile-${refreshKey}`} />}

            {/* Book Catalog */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Available Books</h2>
                {isConnected && (
                  <Button onClick={() => setAddBookOpen(true)} className="bg-green-600 hover:bg-green-700">
                    ➕ Add Book
                  </Button>
                )}
              </div>
              <BookCatalog key={`catalog-${refreshKey}`} onBorrow={handleBorrow} />
            </div>

            {/* Borrow History */}
            {isConnected && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Borrowing Status</h2>
                <BorrowHistory key={`history-${refreshKey}`} onReturn={handleReturn} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Book Dialog */}
      <Dialog open={addBookOpen} onOpenChange={setAddBookOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>➕ Add New Book</DialogTitle>
            <DialogDescription>
              Add a new book to the library catalog.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Book Title *</Label>
              <Input
                id="title"
                placeholder="Enter book title"
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="author">Author *</Label>
              <Input
                id="author"
                placeholder="Enter author name"
                value={newBook.author}
                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="isbn">ISBN</Label>
              <Input
                id="isbn"
                placeholder="Enter ISBN (optional)"
                value={newBook.isbn}
                onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="total">Total Copies</Label>
                <Input
                  id="total"
                  type="number"
                  min="1"
                  value={newBook.total}
                  onChange={(e) => setNewBook({ ...newBook, total: parseInt(e.target.value) || 1 })}
                />
              </div>
              <div>
                <Label htmlFor="fee">Borrow Fee (ETH)</Label>
                <Input
                  id="fee"
                  type="number"
                  min="0"
                  step="0.01"
                  value={newBook.borrowFee}
                  onChange={(e) => setNewBook({ ...newBook, borrowFee: parseFloat(e.target.value) || 0 })}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAddBookOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddBook} className="bg-green-600 hover:bg-green-700">
              Add Book
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
