# Smart Contract Library System - Quick Overview

## What is this project?

A **blockchain-based library system** where users can borrow and return books using MetaMask wallet. Think of it like a regular library, but everything is recorded on the blockchain.

## Core Features

### 1. **Wallet Connection**
- Connect using MetaMask browser extension
- Shows fake 10,000 ETH balance for testing
- No real money needed - uses message signing

### 2. **Book Borrowing**
- 6 books available (some free, some require payment)
- Books with fees: Smart Contracts 101 (0.1 ETH), DeFi Protocols (0.05 ETH), Web3 Development (0.15 ETH)
- Free books: Blockchain Basics, Solidity Programming, Crypto Economics
- Max 5 books per user
- 30-day borrowing period

### 3. **Return System**
- Return books on time → Earn 10 reward tokens
- Late returns → Pay late fees (50% per day)
- Automatic tracking of borrow/return history

### 4. **Smart Contracts** (Solidity)
- **LibraryManagement.sol** - Main library logic (borrow/return/fees)
- **LibraryCard.sol** - NFT membership cards (ERC-721)
- **RewardToken.sol** - Reward tokens for good behavior (ERC-20)

## How It Works

1. **Connect Wallet** → Click "Connect MetaMask"
2. **Browse Books** → See available books in catalog
3. **Borrow** → Click "Borrow" → Sign MetaMask message (FREE, no gas)
4. **Return** → Return before 30 days to avoid fees and earn rewards

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Blockchain**: Ethereum (Sepolia testnet), ethers.js, Solidity
- **Smart Contracts**: OpenZeppelin libraries
- **Deployment**: Vercel

## Testing Mode

Currently runs in **mock mode**:
- No real ETH needed
- MetaMask signs messages (free)
- All transactions simulated locally
- Perfect for testing without blockchain costs

## Key Files

```
app/
  page.tsx              # Main dashboard
  layout.tsx            # App layout
contracts/
  LibraryManagement.sol # Main contract
  LibraryCard.sol       # NFT cards
  RewardToken.sol       # Reward tokens
components/
  library-dashboard.tsx # Main UI
  book-catalog.tsx      # Book list
  wallet-connection.tsx # MetaMask connection
lib/
  wallet-manager.ts     # Handles wallet operations
  mock-contracts.ts     # Mock blockchain for testing
```

## Running Locally

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Deployment

Deployed on Vercel: https://your-app.vercel.app

---

**That's it!** A simple library system on blockchain where borrowing books and earning rewards is as easy as connecting your MetaMask wallet.
