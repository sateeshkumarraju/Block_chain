"use client"

import { useEffect, useState } from "react"
import { useWallet } from "@/lib/useWallet"
import type { Book } from "@/lib/mock-contracts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

export function BookCatalog({ onBorrow }: { onBorrow: (bookId: number, title: string) => void }) {
  const { isConnected, walletManager } = useWallet()
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [confirmDialog, setConfirmDialog] = useState<{ open: boolean; bookId: number; title: string; fee: number }>({
    open: false,
    bookId: -1,
    title: "",
    fee: 0,
  })

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true)
        setError(null)
        const fetchedBooks = await walletManager.getBooks()
        setBooks(fetchedBooks)
        console.log("[v0] Books loaded:", fetchedBooks)
      } catch (err: any) {
        setError(err.message)
        console.error("[v0] Error loading books:", err)
      } finally {
        setLoading(false)
      }
    }

    if (isConnected) {
      fetchBooks()
    }
  }, [isConnected, walletManager])

  const handleBorrowClick = (book: Book) => {
    if (book.borrowFee > 0) {
      // Show confirmation dialog for books with fees
      setConfirmDialog({
        open: true,
        bookId: book.id,
        title: book.title,
        fee: book.borrowFee,
      })
    } else {
      // Directly borrow free books
      onBorrow(book.id, book.title)
    }
  }

  const confirmBorrow = () => {
    onBorrow(confirmDialog.bookId, confirmDialog.title)
    setConfirmDialog({ open: false, bookId: -1, title: "", fee: 0 })
  }

  if (!isConnected) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-gray-600">Connect your wallet to view books</CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">Loading books...</CardContent>
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

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <Card key={book.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">📖{book.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-3">
              <div>
                <p className="text-sm text-gray-600">Author</p>
                <p className="font-medium">{book.author}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">ISBN</p>
                <p className="font-medium">{book.isbn}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                👥
                <span>
                  {book.available} of {book.total} available
                </span>
              </div>
              {book.borrowFee > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
                  <p className="text-sm text-yellow-800 font-semibold">
                    💰 Borrow Fee: {book.borrowFee} ETH
                  </p>
                </div>
              )}
              <Button
                onClick={() => handleBorrowClick(book)}
                disabled={book.available === 0}
                className="mt-auto"
                variant={book.available === 0 ? "secondary" : "default"}
              >
                {book.available === 0 ? "Not Available" : "Borrow Book"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Confirmation Dialog for Paid Books */}
      <Dialog open={confirmDialog.open} onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>💰 Confirm Borrow Payment</DialogTitle>
            <DialogDescription>
              You are about to borrow a book that requires a payment fee.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Book Title:</span>
                <span className="font-semibold">{confirmDialog.title}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-gray-600">Borrow Fee:</span>
                <span className="font-bold text-lg text-yellow-600">{confirmDialog.fee} ETH</span>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800 space-y-2">
              <p className="font-semibold">⚠️ MetaMask Confirmation Required:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Click "Confirm & Pay" below</li>
                <li>MetaMask popup will appear</li>
                <li>You MUST click "Confirm" in MetaMask to approve payment</li>
                <li>You can click "Reject" in MetaMask to cancel - NO money will be deducted</li>
                <li>No payment happens until you confirm in MetaMask</li>
              </ul>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmDialog({ ...confirmDialog, open: false })}
            >
              Cancel
            </Button>
            <Button type="button" onClick={confirmBorrow} className="bg-blue-600 hover:bg-blue-700">
              Confirm & Pay (Opens MetaMask)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
