# 📚 Smart Contract Library System

A decentralized library management system built with **Next.js** and **Ethereum smart contracts**. Borrow books, earn rewards, and manage library operations - all powered by blockchain technology.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Solidity](https://img.shields.io/badge/Solidity-0.8.20-blue)
![Ethereum](https://img.shields.io/badge/Ethereum-Sepolia-purple)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 🦊 **MetaMask Integration** - Connect your wallet securely
- 📖 **Book Borrowing System** - Browse and borrow books with blockchain verification
- 💰 **ETH Payments** - Pay borrowing fees using simulated ETH transactions
- 🏆 **Reward Tokens** - Earn LRT tokens for on-time returns
- 🎴 **NFT Library Cards** - ERC-721 membership cards
- 📊 **Transaction Tracking** - View all your transactions with Etherscan links
- 🔄 **Real-time Updates** - Automatic refresh of book availability and user stats

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **ethers.js** - Ethereum library

### Smart Contracts
- **Solidity ^0.8.20** - Smart contract language
- **OpenZeppelin** - Secure contract libraries
- **Sepolia Testnet** - Ethereum test network

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main dashboard
│   └── reports/           # Reports page
├── components/            # React components
│   ├── library-dashboard.tsx
│   ├── book-catalog.tsx
│   ├── wallet-connection.tsx
│   └── ui/                # UI components
├── contracts/             # Solidity smart contracts
│   ├── LibraryManagement.sol
│   ├── LibraryCard.sol
│   └── RewardToken.sol
├── lib/                   # Utility libraries
│   ├── wallet-manager.ts  # Wallet operations
│   ├── mock-contracts.ts  # Mock for testing
│   └── web3-provider.ts   # Web3 setup
└── public/               # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MetaMask browser extension
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sateeshkumarraju/Block_chain.git
   cd Block_chain
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📖 How to Use

1. **Connect Wallet** - Click "Connect MetaMask" and approve the connection
2. **Browse Books** - View available books in the catalog
3. **Borrow Book** - Click "Borrow" and sign the MetaMask confirmation
4. **Return Book** - Return books before due date to earn rewards
5. **View History** - Track all your borrowing history and transactions

## 📚 Available Books

| Book Title | Author | Borrow Fee |
|------------|--------|------------|
| Blockchain Basics | John Doe | Free |
| Smart Contracts 101 | Jane Smith | 0.1 ETH |
| Solidity Programming | Mike Johnson | Free |
| DeFi Protocols | Sarah Williams | 0.05 ETH |
| Web3 Development | Tom Brown | 0.15 ETH |
| Crypto Economics | Lisa Garcia | Free |

## 📜 Smart Contracts

### LibraryManagement.sol
Core library logic handling:
- Book inventory management
- Borrow/return operations
- User profiles and history
- Late fee calculations

### LibraryCard.sol
ERC-721 NFT membership cards:
- Unique library cards per user
- 1-year validity period
- Renewable membership

### RewardToken.sol
ERC-20 reward tokens (LRT):
- Earned for on-time returns
- 10 tokens per successful return
- Minter-controlled distribution

## ⚙️ Configuration

The system uses a mock mode for testing without real ETH:
- **Fake Balance**: 10,000 ETH displayed for testing
- **Signature-based Transactions**: MetaMask signs messages (free, no gas needed)
- **Simulated Payments**: All transactions are simulated locally

## 🧪 Testing

The project includes mock contracts for testing without deploying to a real blockchain:

```typescript
// Mock mode is enabled by default
// Real transactions require contract deployment to Sepolia
```

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Sateesh Kumar Raju**
- GitHub: [@sateeshkumarraju](https://github.com/sateeshkumarraju)

---

⭐ Star this repo if you found it helpful!
