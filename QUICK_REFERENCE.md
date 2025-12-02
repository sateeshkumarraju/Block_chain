# Smart Library System - Quick Reference

## 🚀 Start Here

```bash
# Install & Run
npm install
npm run dev

# Open browser
http://localhost:3000
```

---

## 📖 Documentation Files

| File | Purpose |
|------|---------|
| `ETH_SETUP_GUIDE.md` | ⭐ Complete setup from scratch |
| `ETH_INTEGRATION_SUMMARY.md` | 📊 Overview of all enhancements |
| `TRANSACTION_GUIDE.md` | 🔗 Transaction details & flow |
| `COMPLETE_DEPLOYMENT_GUIDE.md` | 🛠️ Full deployment instructions |
| `.env.example` | 📝 Configuration template |

---

## 🎯 Usage Modes

### Mode 1: Mock (Default) ✅ INSTANT
No setup needed! Works immediately.
```bash
npm run dev
# Open http://localhost:3000
# Instant transactions, no fees
```

### Mode 2: Real Blockchain (Sepolia) ⚙️ SETUP REQUIRED

**Step-by-step:**

1. **Install MetaMask**
   - https://metamask.io/

2. **Get Sepolia ETH**
   - https://sepoliafaucet.com
   - Request 0.5 ETH

3. **Deploy Contracts** (Windows)
   ```bash
   # Create .env.local with:
   # SEPOLIA_RPC_URL=https://...
   # PRIVATE_KEY=your_key
   
   ./scripts/deploy.bat
   ```

4. **Configure App**
   - Copy contract addresses from deployment
   - Add to `.env.local`

5. **Run App**
   ```bash
   npm run dev
   ```

6. **Connect & Transact**
   - Click "Connect MetaMask"
   - Switch to Sepolia
   - Start borrowing books!

---

## 💻 Key Components

```typescript
// Main hook
useWallet() → {
  account,           // Connected wallet address
  isConnected,       // Connection status
  isLoading,         // Loading state
  error,             // Error message
  connectWallet(),   // Connect to MetaMask
  walletManager      // Manager instance
}

// Manager instance
walletManager.borrowBook(bookId)      // Borrow book
walletManager.returnBook(bookId)      // Return book
walletManager.getUserProfile()        // Get user data
walletManager.getBooks()              // Get all books
walletManager.getBorrowHistory()      // Get history
walletManager.getBalance()            // Get ETH balance
walletManager.switchToSepolia()       // Switch network
```

---

## 🔧 Environment Setup

### `.env.local` Template

```env
# Optional: Smart contracts (for real blockchain)
NEXT_PUBLIC_LIBRARY_ADDRESS=0x...
NEXT_PUBLIC_CARD_ADDRESS=0x...
NEXT_PUBLIC_REWARDS_ADDRESS=0x...

# Optional: RPC (for advanced features)
NEXT_PUBLIC_SEPOLIA_RPC_URL=https://...
```

**How to get:**
- Contract addresses: From `./scripts/deploy.bat` output
- RPC URL: From Alchemy, Infura, or QuickNode

---

## 💰 Costs & Fees

### Sepolia Testnet Gas Costs
| Action | Gas | Cost |
|--------|-----|------|
| Borrow | 100k | ~0.002 ETH |
| Return | 150k | ~0.003 ETH |
| Card Issue | 300k | ~0.006 ETH |
| Card Renew | 50k | ~0.001 ETH |

### Late Fees
- **Rate:** 50% per day overdue
- **Example:** 2 days late = 1.0 ETH

### Rewards
- **Earning:** 10 LRT tokens for on-time returns
- **Cost:** Free to receive

---

## 🔗 Live Transactions

### View on Etherscan
```
Base URL: https://sepolia.etherscan.io

Transaction: /tx/{hash}
Address: /address/{address}
Contract: /address/{address}#code
```

---

## 🧪 Test Scenarios

### Quick Test (Mock Mode)
1. Open http://localhost:3000
2. Click "Connect MetaMask" (auto-connects in mock)
3. Click borrow on any book
4. See instant success
5. Click return to simulate return

### Full Test (Sepolia)
1. Get Sepolia ETH from faucet
2. Deploy contracts via `./scripts/deploy.bat`
3. Add addresses to `.env.local`
4. Connect real MetaMask wallet
5. Perform real transactions
6. View on Etherscan

---

## ⚠️ Important

```
🔒 SECURITY NOTES:
- Never share PRIVATE_KEY
- Never commit .env.local to git
- Use test keys for development
- Use hardware wallet for mainnet

🎯 BEST PRACTICES:
- Use mock mode for testing
- Deploy to testnet first
- Verify contracts on Etherscan
- Test all features before mainnet
```

---

## 🆘 Troubleshooting

### MetaMask Issues
```
Problem: "MetaMask not installed"
Solution: Download from metamask.io

Problem: "Wrong network"
Solution: Click MetaMask → Select Sepolia

Problem: "No funds"
Solution: Get Sepolia ETH from sepoliafaucet.com
```

### Contract Issues
```
Problem: "Contract not found"
Solution: 
- Add NEXT_PUBLIC_LIBRARY_ADDRESS to .env.local
- Restart dev server
- Verify address is valid

Problem: "Transaction failed"
Solution:
- Check gas price
- Verify balance
- Check book availability
- Try refreshing page
```

### Code Issues
```
Problem: "npm not found"
Solution: Install Node.js from nodejs.org

Problem: "Port 3000 in use"
Solution: npm run dev -- -p 3001

Problem: "Module not found"
Solution: Run npm install
```

---

## 📚 Learn More

**Core Files:**
- `lib/wallet-manager.ts` - Transaction logic
- `lib/mock-contracts.ts` - Mock implementation
- `lib/contract-abi.ts` - Contract interfaces
- `components/wallet-connection.tsx` - UI
- `components/transaction-tracker.tsx` - Transaction display

**External Resources:**
- Ethers.js: https://docs.ethers.org/
- MetaMask: https://docs.metamask.io/
- Solidity: https://docs.soliditylang.org/
- Sepolia Faucet: https://sepoliafaucet.com

---

## 🎉 Next Steps

1. ✅ Read `ETH_SETUP_GUIDE.md`
2. ✅ Choose: Mock mode (quick) or Sepolia (real)
3. ✅ Run `npm run dev`
4. ✅ Test the app
5. ✅ Deploy if needed

**That's it! You're ready to go! 🚀**

---

## 📞 Support

For detailed info, see:
- `ETH_SETUP_GUIDE.md` - Full setup guide
- `TRANSACTION_GUIDE.md` - Transaction details
- `ETH_INTEGRATION_SUMMARY.md` - All changes
- `COMPLETE_DEPLOYMENT_GUIDE.md` - Deployment

Questions? Check the docs first! 📖
