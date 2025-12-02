// Mock contract implementation for local testing
export interface UserProfile {
  address: string
  borrowedBooks: number[]
  totalBorrowed: number
  totalFeesPaid: number
  rewardsEarned: number
  hasLibraryCard: boolean
}

export interface Book {
  id: number
  title: string
  author: string
  isbn: string
  available: number
  total: number
  borrowFee: number // Fee in wei to borrow this book
}

export interface BorrowRecord {
  bookId: number
  userAddress: string
  borrowDate: number
  dueDate: number
  returnDate: number | null
  fee: number
  status: "borrowed" | "returned" | "overdue"
}

class MockLibraryContract {
  private books: Book[] = [
    { id: 0, title: "Blockchain Basics", author: "John Doe", isbn: "ISBN001", available: 5, total: 5, borrowFee: 0 },
    { id: 1, title: "Smart Contracts 101", author: "Jane Smith", isbn: "ISBN002", available: 3, total: 5, borrowFee: 0.1 },
    { id: 2, title: "Solidity Programming", author: "Mike Johnson", isbn: "ISBN003", available: 8, total: 10, borrowFee: 0 },
    { id: 3, title: "DeFi Protocols", author: "Sarah Williams", isbn: "ISBN004", available: 2, total: 5, borrowFee: 0.05 },
    { id: 4, title: "Web3 Development", author: "Tom Brown", isbn: "ISBN005", available: 6, total: 8, borrowFee: 0.15 },
    { id: 5, title: "Crypto Economics", author: "Lisa Garcia", isbn: "ISBN006", available: 4, total: 6, borrowFee: 0 },
  ]

  private users: Map<string, UserProfile> = new Map()
  private borrowRecords: BorrowRecord[] = []
  private nextRecordId = 0

  private getOrCreateUser(address: string): UserProfile {
    if (!this.users.has(address)) {
      this.users.set(address, {
        address,
        borrowedBooks: [],
        totalBorrowed: 0,
        totalFeesPaid: 0,
        rewardsEarned: 0,
        hasLibraryCard: false,
      })
    }
    return this.users.get(address)!
  }

  async borrowBook(userAddress: string, bookId: number, fee: number = 0): Promise<string> {
    const user = this.getOrCreateUser(userAddress)
    const book = this.books[bookId]

    if (!book) throw new Error("Book not found")
    if (book.available <= 0) throw new Error("Book not available")
    if (fee < book.borrowFee) throw new Error(`Insufficient fee. Required: ${book.borrowFee}, Provided: ${fee}`)
    if (user.borrowedBooks.length >= 5) throw new Error("Maximum 5 books can be borrowed")

    // Update inventory
    book.available--

    // Add to user's borrowed books
    user.borrowedBooks.push(bookId)
    user.totalBorrowed++
    
    // Track the borrow fee paid
    user.totalFeesPaid += book.borrowFee
    console.log("[v0] Mock: Added borrow fee", book.borrowFee, "to user total. New total:", user.totalFeesPaid)

    // Create borrow record
    const now = Math.floor(Date.now() / 1000)
    const dueDate = now + 30 * 24 * 60 * 60 // 30 days
    const record: BorrowRecord = {
      bookId,
      userAddress,
      borrowDate: now,
      dueDate,
      returnDate: null,
      fee: book.borrowFee,
      status: "borrowed",
    }
    this.borrowRecords.push(record)

    // Generate transaction hash
    const hash =
      "0x" +
      Array(64)
        .fill(0)
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("")
    return hash
  }

  async returnBook(userAddress: string, bookId: number): Promise<{ transactionHash: string; fee: number }> {
    const user = this.getOrCreateUser(userAddress)
    const book = this.books[bookId]

    if (!book) throw new Error("Book not found")
    if (!user.borrowedBooks.includes(bookId)) throw new Error("User has not borrowed this book")

    // Find the borrow record
    const recordIndex = this.borrowRecords.findIndex(
      (r) => r.userAddress === userAddress && r.bookId === bookId && r.status === "borrowed",
    )

    if (recordIndex === -1) throw new Error("No active borrow record found")

    const record = this.borrowRecords[recordIndex]
    const now = Math.floor(Date.now() / 1000)
    const daysOverdue = Math.max(0, Math.floor((now - record.dueDate) / (24 * 60 * 60)))
    const lateFee = daysOverdue * 0.5 // 50% per day overdue

    // Update record
    record.returnDate = now
    record.fee = lateFee
    record.status = daysOverdue > 0 ? "overdue" : "returned"

    // Update user
    user.borrowedBooks = user.borrowedBooks.filter((id) => id !== bookId)
    user.totalFeesPaid += lateFee

    // Add rewards for on-time return
    if (daysOverdue === 0) {
      user.rewardsEarned += 10
    }

    // Update book availability
    book.available++

    // Generate transaction hash
    const hash =
      "0x" +
      Array(64)
        .fill(0)
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("")

    return { transactionHash: hash, fee: lateFee }
  }

  async getUserProfile(address: string): Promise<UserProfile> {
    return this.getOrCreateUser(address)
  }

  async getAvailableBooks(bookId: number): Promise<number> {
    const book = this.books[bookId]
    if (!book) throw new Error("Book not found")
    return book.available
  }

  async getBookDetails(bookId: number): Promise<Book> {
    const book = this.books[bookId]
    if (!book) throw new Error("Book not found")
    return book
  }

  async getBooks(): Promise<Book[]> {
    return this.books
  }

  async getBorrowHistory(address: string): Promise<BorrowRecord[]> {
    return this.borrowRecords.filter((r) => r.userAddress === address)
  }

  async getOutstandingFees(address: string): Promise<number> {
    const user = this.getOrCreateUser(address)
    return this.borrowRecords
      .filter((r) => r.userAddress === address && r.status === "overdue")
      .reduce((sum, r) => sum + r.fee, 0)
  }
}

export const mockLibraryContract = new MockLibraryContract()
