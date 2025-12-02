import { mockLibraryContract, type UserProfile, type Book, type BorrowRecord } from "./mock-contracts"
import { ethers } from "ethers"
import { LIBRARY_MANAGEMENT_ABI, LIBRARY_CARD_ABI, REWARD_TOKEN_ABI } from "./contract-abi"
import { getContractAddresses, isContractsConfigured } from "./contract-config"

const USE_MOCK = typeof window !== "undefined" && localStorage.getItem("useMockContracts") === "true"

export interface TransactionDetails {
  hash: string
  blockNumber?: number
  gasUsed?: string
  status: "pending" | "confirmed" | "failed"
  confirmations?: number
}

export class WalletManager {
  private currentUser: string | null = null
  private isConnected = false
  private provider: ethers.BrowserProvider | null = null
  private signer: ethers.Signer | null = null
  private libraryContract: ethers.Contract | null = null
  private cardContract: ethers.Contract | null = null
  private tokenContract: ethers.Contract | null = null

  async connectWallet(): Promise<string> {
    console.log("[v0] ═══════════════════════════════════════════════════════════")
    console.log("[v0] 🦊 CONNECT WALLET REQUEST")
    console.log("[v0] Attempting to open MetaMask...")
    console.log("[v0] ═══════════════════════════════════════════════════════════")

    // ALWAYS try MetaMask first, no matter what
    if (window.ethereum) {
      try {
        console.log("[v0] 🦊 MetaMask detected - Opening MetaMask popup...")
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        this.currentUser = accounts[0]
        this.isConnected = true
        
        // Store connected account in localStorage
        localStorage.setItem("connectedAccount", this.currentUser)
        localStorage.setItem("isConnected", "true")
        
        // Remove mock mode flag since we're using real wallet
        localStorage.removeItem("useMockContracts")

        // Initialize Web3 provider - ALWAYS do this for MetaMask
        this.provider = new ethers.BrowserProvider(window.ethereum)
        this.signer = await this.provider.getSigner()
        console.log("[v0] 🦊 MetaMask provider initialized")

        // Check if contracts are configured
        if (isContractsConfigured()) {
          try {
            const addresses = getContractAddresses()
            this.libraryContract = new ethers.Contract(addresses.library, LIBRARY_MANAGEMENT_ABI, this.signer)
            this.cardContract = new ethers.Contract(addresses.card, LIBRARY_CARD_ABI, this.signer)
            this.tokenContract = new ethers.Contract(addresses.rewards, REWARD_TOKEN_ABI, this.signer)
            console.log("[v0] 🦊 Contracts initialized successfully")
          } catch (contractError: any) {
            console.warn("[v0] Failed to initialize contracts, will use mock mode:", contractError.message)
            localStorage.setItem("useMockContracts", "true")
          }
        } else {
          console.log("[v0] Contract addresses not configured, will use mock mode for contract operations")
        }

        console.log("[v0] ═══════════════════════════════════════════════════════════")
        console.log("[v0] ✅ Real wallet connected:", this.currentUser)
        console.log("[v0] ═══════════════════════════════════════════════════════════")
        return this.currentUser
      } catch (error: any) {
        console.error("[v0] MetaMask connection error:", error)
        console.warn("[v0] Falling back to mock mode")
        localStorage.setItem("useMockContracts", "true")
        
        // Fallback to mock
        this.currentUser =
          "0x" +
          Array(40)
            .fill(0)
            .map(() => Math.floor(Math.random() * 16).toString(16))
            .join("")
        this.isConnected = true
        localStorage.setItem("connectedAccount", this.currentUser)
        localStorage.setItem("isConnected", "true")
        console.log("[v0] ═══════════════════════════════════════════════════════════")
        console.log("[v0] ✅ Mock wallet connected (fallback):", this.currentUser)
        console.log("[v0] ═══════════════════════════════════════════════════════════")
        return this.currentUser
      }
    }
    
    // MetaMask not available - use mock mode
    console.warn("[v0] MetaMask not detected, falling back to mock mode")
    localStorage.setItem("useMockContracts", "true")
    this.currentUser =
      "0x" +
      Array(40)
        .fill(0)
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("")
    this.isConnected = true
    localStorage.setItem("connectedAccount", this.currentUser)
    localStorage.setItem("isConnected", "true")
    console.log("[v0] ═══════════════════════════════════════════════════════════")
    console.log("[v0] ✅ Mock wallet connected (MetaMask not available):", this.currentUser)
    console.log("[v0] ═══════════════════════════════════════════════════════════")
    return this.currentUser
  }

  async borrowBook(bookId: number): Promise<string> {
    if (!this.currentUser) throw new Error("Wallet not connected")

    console.log("[v0] ═══════════════════════════════════════════════════════════")
    console.log("[v0] 📖 BORROW BOOK REQUEST INITIATED")
    console.log("[v0] Book ID:", bookId)
    console.log("[v0] Wallet:", this.currentUser)
    console.log("[v0] ═══════════════════════════════════════════════════════════")

    // Get book details for fee info
    const book = await mockLibraryContract.getBookDetails(bookId)
    
    // If MetaMask is available and book has a fee, show signature request (FREE - no ETH needed)
    if (window.ethereum && book.borrowFee > 0) {
      try {
        console.log("[v0] 🦊 METAMASK: Triggering signature confirmation popup...")
        console.log("[v0] 💰 Book fee:", book.borrowFee, "ETH (SIMULATED - NO REAL ETH NEEDED)")
        
        // Create a message for the user to sign (THIS IS FREE - NO GAS NEEDED)
        const message = `Library System - Borrow Confirmation\n\nBook: ${book.title}\nFee: ${book.borrowFee} ETH (Simulated)\nTimestamp: ${new Date().toISOString()}\n\nSign this message to confirm your borrow request.`
        
        console.log("[v0] ═══════════════════════════════════════════════════════════")
        console.log("[v0] 🚀 SENDING METAMASK SIGNATURE REQUEST...")
        console.log("[v0] ⚠️  METAMASK POPUP SHOULD APPEAR NOW")
        console.log("[v0] 👆 Click 'Sign' to confirm (FREE - no ETH required)")
        console.log("[v0] ═══════════════════════════════════════════════════════════")
        
        // Request signature - THIS IS FREE, NO ETH NEEDED!
        const signature = await window.ethereum.request({
          method: 'personal_sign',
          params: [message, this.currentUser],
        })
        
        console.log("[v0] ═══════════════════════════════════════════════════════════")
        console.log("[v0] ✅ METAMASK SIGNATURE CONFIRMED!")
        console.log("[v0] 🎉 Signature:", signature)
        console.log("[v0] 💳 Simulated payment of", book.borrowFee, "ETH processed")
        console.log("[v0] ═══════════════════════════════════════════════════════════")
        
        // Now update mock state to reflect the borrow
        await mockLibraryContract.borrowBook(this.currentUser, bookId, book.borrowFee)
        
        // Generate a fake transaction hash based on signature
        const txHash = "0x" + signature.slice(2, 66)
        return txHash
        
      } catch (error: any) {
        if (error.code === 4001 || error.message?.includes('rejected') || error.message?.includes('denied')) {
          console.log("[v0] ❌ User rejected MetaMask signature - transaction cancelled")
          throw new Error("Transaction rejected in MetaMask - no action taken")
        }
        console.log("[v0] ⚠️ MetaMask error, falling back to mock:", error.message)
        // Fall through to mock mode
      }
    }
    
    // Mock mode for free books or when MetaMask not available
    console.log("[v0] 🔄 Using Mock Mode")
    const hash = await mockLibraryContract.borrowBook(this.currentUser, bookId, book.borrowFee)
    console.log("[v0] ✅ MOCK: Book borrowed successfully - Hash:", hash)
    return hash
  }

  async returnBook(bookId: number): Promise<{ transactionHash: string; fee: number }> {
    if (!this.currentUser) throw new Error("Wallet not connected")

    console.log("[v0] Returning book with ID:", bookId)

    const USE_MOCK_LOCAL = typeof window !== "undefined" && localStorage.getItem("useMockContracts") === "true"

    if (USE_MOCK_LOCAL || USE_MOCK || !this.libraryContract) {
      const result = await mockLibraryContract.returnBook(this.currentUser, bookId)
      return result
    }

    try {
      // Get current profile to calculate fee
      const profile = await this.libraryContract.getUserProfile(this.currentUser)
      
      const tx = await this.libraryContract.returnBook(bookId)
      console.log("[v0] Return transaction sent:", tx.hash)
      const receipt = await tx.wait()
      console.log("[v0] Return transaction confirmed:", receipt)

      // Calculate fee from transaction logs
      let fee = 0
      if (receipt.logs.length > 0) {
        const event = this.libraryContract.interface.parseLog({
          topics: receipt.logs[0].topics,
          data: receipt.logs[0].data,
        })
        if (event && "fee" in event.args) {
          fee = Number(event.args.fee) / 1e18 // Convert from Wei
        }
      }

      return { transactionHash: tx.hash, fee }
    } catch (error: any) {
      console.warn("[v0] Real blockchain return error, falling back to mock:", error.message)
      const result = await mockLibraryContract.returnBook(this.currentUser, bookId)
      return result
    }
  }

  async getUserProfile(): Promise<UserProfile> {
    if (!this.currentUser) throw new Error("Wallet not connected")

    console.log("[v0] Fetching user profile for:", this.currentUser)

    const USE_MOCK_LOCAL = typeof window !== "undefined" && localStorage.getItem("useMockContracts") === "true"
    
    if (USE_MOCK_LOCAL || !this.libraryContract) {
      return await mockLibraryContract.getUserProfile(this.currentUser)
    }

    try {
      const profile = await this.libraryContract.getUserProfile(this.currentUser)
      return {
        address: profile.userAddress,
        borrowedBooks: profile.borrowedBooks.map((id: any) => Number(id)),
        totalBorrowed: Number(profile.totalBorrowed),
        totalFeesPaid: Number(profile.totalFeesPaid) / 1e18,
        rewardsEarned: Number(profile.rewardsEarned),
        hasLibraryCard: profile.hasLibraryCard,
      }
    } catch (error: any) {
      console.warn("[v0] Error fetching profile from contract, falling back to mock:", error.message)
      return await mockLibraryContract.getUserProfile(this.currentUser)
    }
  }

  async getBooks(): Promise<Book[]> {
    console.log("[v0] Fetching all books")

    const USE_MOCK_LOCAL = typeof window !== "undefined" && localStorage.getItem("useMockContracts") === "true"
    
    if (USE_MOCK_LOCAL || !this.libraryContract) {
      console.log("[v0] Using mock books")
      return await mockLibraryContract.getBooks()
    }

    try {
      const books = await this.libraryContract.getAllBooks()
      return books.map((book: any) => ({
        id: Number(book.id),
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        available: Number(book.available),
        total: Number(book.total),
        borrowFee: Number(book.borrowFee) / 1e18,
      }))
    } catch (error: any) {
      console.warn("[v0] Error fetching books from contract, falling back to mock:", error.message)
      return await mockLibraryContract.getBooks()
    }
  }

  async getBorrowHistory(): Promise<BorrowRecord[]> {
    if (!this.currentUser) throw new Error("Wallet not connected")

    console.log("[v0] Fetching borrow history for:", this.currentUser)

    if (USE_MOCK || !this.libraryContract) {
      return await mockLibraryContract.getBorrowHistory(this.currentUser)
    }

    try {
      const records = await this.libraryContract.getBorrowHistory(this.currentUser)
      return records.map((record: any) => ({
        bookId: Number(record.bookId),
        userAddress: record.userAddress,
        borrowDate: Number(record.borrowDate),
        dueDate: Number(record.dueDate),
        returnDate: record.returnDate === 0n ? null : Number(record.returnDate),
        fee: Number(record.fee) / 1e18,
        status: record.status === 0 ? "borrowed" : record.status === 1 ? "returned" : "overdue",
      }))
    } catch (error: any) {
      console.error("[v0] Error fetching history:", error)
      throw new Error("Failed to fetch borrow history: " + error.message)
    }
  }

  async issueLibraryCard(): Promise<string> {
    if (!this.currentUser) throw new Error("Wallet not connected")

    if (USE_MOCK || !this.cardContract) {
      throw new Error("Library card issuance not available in mock mode")
    }

    try {
      const tx = await this.cardContract.issueCard()
      console.log("[v0] Card issuance transaction sent:", tx.hash)
      const receipt = await tx.wait()
      console.log("[v0] Card issuance confirmed:", receipt)
      return tx.hash
    } catch (error: any) {
      console.error("[v0] Error issuing card:", error)
      throw new Error("Failed to issue library card: " + (error.reason || error.message))
    }
  }

  async renewLibraryCard(): Promise<string> {
    if (!this.currentUser) throw new Error("Wallet not connected")

    if (USE_MOCK || !this.cardContract) {
      throw new Error("Library card renewal not available in mock mode")
    }

    try {
      const tx = await this.cardContract.renewCard()
      console.log("[v0] Card renewal transaction sent:", tx.hash)
      const receipt = await tx.wait()
      console.log("[v0] Card renewal confirmed:", receipt)
      return tx.hash
    } catch (error: any) {
      console.error("[v0] Error renewing card:", error)
      throw new Error("Failed to renew library card: " + (error.reason || error.message))
    }
  }

  getCurrentUser(): string | null {
    // Check if already in memory
    if (this.currentUser) {
      return this.currentUser
    }
    
    // Check localStorage (for page refresh persistence)
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("connectedAccount")
      if (stored) {
        this.currentUser = stored
        this.isConnected = true
        // Re-initialize provider if MetaMask is available
        if ((window as any).ethereum) {
          this.provider = new ethers.BrowserProvider((window as any).ethereum)
          console.log("[v0] Restored wallet from localStorage:", this.currentUser)
        }
        return this.currentUser
      }
    }
    
    return null
  }

  async restoreFromStorage(): Promise<void> {
    console.log("[v0] Restoring wallet state from localStorage...")
    
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("connectedAccount")
      if (stored) {
        this.currentUser = stored
        this.isConnected = true
        
        // Try to reconnect to MetaMask if available
        if ((window as any).ethereum) {
          try {
            this.provider = new ethers.BrowserProvider((window as any).ethereum)
            this.signer = await this.provider.getSigner()
            console.log("[v0] ✅ Restored and re-initialized MetaMask provider")
          } catch (err) {
            console.log("[v0] Could not reinitialize provider, will use mock mode")
          }
        }
      }
    }
  }

  disconnectWallet(): void {
    console.log("[v0] ═══════════════════════════════════════════════════════════")
    console.log("[v0] 🔌 DISCONNECTING WALLET")
    console.log("[v0] Current account:", this.currentUser)
    console.log("[v0] ═══════════════════════════════════════════════════════════")
    
    // Clear all state
    this.currentUser = null
    this.isConnected = false
    this.provider = null
    this.signer = null
    this.libraryContract = null
    this.cardContract = null
    this.tokenContract = null
    
    // Clear localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("connectedAccount")
      localStorage.removeItem("isConnected")
      localStorage.removeItem("useMockContracts")
    }
    
    console.log("[v0] ✅ Wallet disconnected successfully")
    console.log("[v0] ═══════════════════════════════════════════════════════════")
  }

  isWalletConnected(): boolean {
    return this.isConnected
  }

  async getBalance(): Promise<string> {
    if (!this.currentUser) throw new Error("Wallet not connected")

    console.log("[v0] Fetching balance for:", this.currentUser)

    // Always return fake ETH balance for demo/testing purposes
    console.log("[v0] 💰 Returning 10,000 FAKE ETH for testing")
    return "10000.0"
  }

  async switchToSepolia(): Promise<void> {
    if (!window.ethereum) throw new Error("MetaMask not found")

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xaa36a7" }],
      })
    } catch (error: any) {
      if (error.code === 4902) {
        // Chain not added, add it
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainName: "Sepolia",
              chainId: "0xaa36a7",
              nativeCurrency: { name: "ETH", decimals: 18, symbol: "ETH" },
              rpcUrls: ["https://eth-sepolia.infura.io/v3/"],
              blockExplorerUrls: ["https://sepolia.etherscan.io"],
            },
          ],
        })
      } else {
        throw error
      }
    }
  }
}

export const walletManager = new WalletManager()
