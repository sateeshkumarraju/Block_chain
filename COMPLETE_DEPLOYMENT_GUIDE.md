# Smart Contract Library Management System - Complete Deployment Guide

## Project Overview

A fully functional blockchain-based library management system with:
- ✅ Auto book inventory tracking
- ✅ Automated billing with late fees (50% per day)
- ✅ NFT-based membership cards (ERC721)
- ✅ Reward token system (ERC20) - 10 tokens for on-time returns
- ✅ Complete event logging for all transactions
- ✅ MetaMask integration
- ✅ Sepolia testnet ready

---

## Smart Contracts (3 Total)

### 1. LibraryManagement.sol
**Core library operations**
- Book management (6 sample books)
- Borrow/return logic
- User profiles
- Automatic fee calculation
- Reward token distribution
- Events: `BookBorrowed`, `BookReturned`, `UserProfileCreated`

### 2. LibraryCard.sol (ERC721 NFT)
**Membership cards**
- Issue NFT cards to users
- Card validity tracking (365 days)
- Renewal system
- Events: `CardIssued`, `CardRenewed`

### 3. RewardToken.sol (ERC20)
**Reward tokens**
- 10 tokens earned per on-time book return
- Burnable tokens
- Minter role management
- Events: `MinterAdded`, `MinterRemoved`

---

## Deployment Steps

### Step 1: Set Up Development Environment

\`\`\`bash
npm install --save-dev hardhat @openzeppelin/hardhat-upgrades
npm install @openzeppelin/contracts ethers

# Initialize Hardhat
npx hardhat
\`\`\`

### Step 2: Create Hardhat Config

Create `hardhat.config.js`:
\`\`\`javascript
require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};
\`\`\`

### Step 3: Create Deployment Script

Create `scripts/deploy.js`:
\`\`\`javascript
const hre = require("hardhat");

async function main() {
  console.log("Deploying Library Management System...");

  // Deploy LibraryManagement
  const LibraryManagement = await hre.ethers.getContractFactory("LibraryManagement");
  const library = await LibraryManagement.deploy();
  await library.deployed();
  console.log("LibraryManagement deployed to:", library.address);

  // Deploy LibraryCard
  const LibraryCard = await hre.ethers.getContractFactory("LibraryCard");
  const card = await LibraryCard.deploy();
  await card.deployed();
  console.log("LibraryCard deployed to:", card.address);

  // Deploy RewardToken
  const RewardToken = await hre.ethers.getContractFactory("RewardToken");
  const token = await RewardToken.deploy();
  await token.deployed();
  console.log("RewardToken deployed to:", token.address);

  // Save addresses
  const addresses = {
    library: library.address,
    card: card.address,
    token: token.address,
  };

  console.log("\nAdd these to your .env.local file:");
  console.log(`NEXT_PUBLIC_LIBRARY_ADDRESS=${addresses.library}`);
  console.log(`NEXT_PUBLIC_CARD_ADDRESS=${addresses.card}`);
  console.log(`NEXT_PUBLIC_REWARDS_ADDRESS=${addresses.token}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
\`\`\`

### Step 4: Get Sepolia Test ETH

1. Go to [Sepolia Faucet](https://sepoliafaucet.com)
2. Enter your wallet address
3. Request test ETH

### Step 5: Deploy to Sepolia

\`\`\`bash
# Get Sepolia RPC URL from Alchemy or Infura
export SEPOLIA_RPC_URL="https://eth-sepolia.alchemyapi.io/v2/YOUR_KEY"
export PRIVATE_KEY="your_private_key_here"

# Deploy
npx hardhat run scripts/deploy.js --network sepolia
\`\`\`

### Step 6: Update Frontend

Copy the deployed contract addresses and add to `.env.local`:
\`\`\`env
NEXT_PUBLIC_LIBRARY_ADDRESS=0x...
NEXT_PUBLIC_CARD_ADDRESS=0x...
NEXT_PUBLIC_REWARDS_ADDRESS=0x...
\`\`\`

### Step 7: Connect MetaMask

1. Open the app
2. Click "Connect Wallet"
3. MetaMask will prompt for connection
4. Approve and sign in
5. Start borrowing books!

---

## Testing in Mock Mode (No Deployment Needed)

The system works with mock contracts out of the box:

\`\`\`bash
# Just run the app - mock mode is enabled by default
npm run dev
\`\`\`

All features work locally:
- Borrow books ✅
- Return books ✅
- Calculate fees ✅
- Earn rewards ✅
- View transaction history ✅

---

## MetaMask Transactions

Once deployed and connected:

1. **Borrow a book** → MetaMask popup → Approve transaction
2. **Pay fees** → Transaction recorded on Sepolia
3. **Return book** → Automatic fee calculation → Rewards earned
4. **View transaction** → Click hash to see on Etherscan

All transactions visible at: `https://sepolia.etherscan.io/`

---

## Key Features

| Feature | Status | Details |
|---------|--------|---------|
| Book Inventory | ✅ | 6 books, real-time availability |
| Auto Billing | ✅ | 50% late fee per day |
| NFT Cards | ✅ | ERC721 membership tokens |
| Rewards | ✅ | 10 tokens per on-time return |
| Events | ✅ | Full transaction logging |
| MetaMask | ✅ | Native integration |
| Sepolia Ready | ✅ | Production testnet support |

---

## Files Included

\`\`\`
contracts/
├── LibraryManagement.sol    # Core library logic
├── LibraryCard.sol          # ERC721 NFT cards
├── RewardToken.sol          # ERC20 reward tokens
└── abi/
    └── LibraryManagement.json

lib/
├── wallet-manager.ts        # MetaMask integration
├── mock-contracts.ts        # Local testing
├── contract-abi.ts          # Contract interfaces
├── contract-config.ts       # Configuration
└── useWallet.ts             # React hook

components/
├── wallet-connection.tsx
├── book-catalog.tsx
├── user-profile.tsx
├── borrow-history.tsx
└── library-dashboard.tsx
\`\`\`

---

## Troubleshooting

**MetaMask not connecting?**
- Ensure MetaMask is installed
- Check you're on Sepolia network
- Try reloading the page

**Transaction failing?**
- Check you have enough Sepolia ETH
- Verify contract addresses in .env.local
- Check gas prices on Sepolia

**Books not showing?**
- Mock mode: Refresh page
- Real contracts: Check contract is deployed

---

## Support

For issues or questions about deployment, visit:
- [Hardhat Docs](https://hardhat.org/)
- [OpenZeppelin Docs](https://docs.openzeppelin.com/)
- [Ethers.js Docs](https://docs.ethers.org/)
