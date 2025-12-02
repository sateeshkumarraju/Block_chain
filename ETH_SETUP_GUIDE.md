# ETH Integration & Transactions Setup Guide

## Quick Start (Mock Mode - No Setup Needed!)

The app comes with **mock mode enabled by default**. You can immediately:
- ✅ Borrow and return books
- ✅ See instant transaction confirmations
- ✅ Track fees and rewards
- ✅ No MetaMask required
- ✅ No gas fees

Just run: `npm run dev` and start using the app!

---

## Setting Up Real Blockchain Transactions

To use **real ETH transactions on Sepolia testnet**, follow these steps:

### Step 1: Install MetaMask

1. Download MetaMask: https://metamask.io/download/
2. Create a wallet and secure your seed phrase
3. Add to your browser

### Step 2: Add Sepolia Network to MetaMask

MetaMask should prompt you automatically, or:

1. Click "Add Network" in MetaMask
2. Select "Add Sepolia testnet"
3. Chain ID: `11155111`
4. RPC URL: `https://eth-sepolia.infura.io/v3/`
5. Currency: ETH

### Step 3: Get Sepolia Test ETH

Visit one of these faucets:
- https://sepoliafaucet.com (Recommended)
- https://cloud.google.com/application/web3/faucet/ethereum/sepolia
- https://www.alchemy.com/faucets/sepolia

Just enter your wallet address and claim ~0.5 ETH

### Step 4: Deploy Smart Contracts

#### Option A: Use Hardhat (Recommended)

1. **Get RPC URL:**
   - Alchemy: https://www.alchemy.com/
   - Infura: https://www.infura.io/
   - Quicknode: https://www.quicknode.com/
   - (Sign up and create a Sepolia project)

2. **Create `.env.local`:**
   ```
   SEPOLIA_RPC_URL=https://eth-sepolia.alchemyapi.io/v2/YOUR_KEY_HERE
   PRIVATE_KEY=your_wallet_private_key_here
   ```

3. **Run deployment (Windows):**
   ```bash
   ./scripts/deploy.bat
   ```

   Or (Mac/Linux):
   ```bash
   bash ./scripts/deploy.sh
   ```

4. **Copy contract addresses from output**

#### Option B: Use Existing Deployment

If contracts are already deployed, just add addresses to `.env.local`:
```
NEXT_PUBLIC_LIBRARY_ADDRESS=0x...
NEXT_PUBLIC_CARD_ADDRESS=0x...
NEXT_PUBLIC_REWARDS_ADDRESS=0x...
```

### Step 5: Configure the App

Create `.env.local` in project root:

```env
# Smart contract addresses (get from deployment)
NEXT_PUBLIC_LIBRARY_ADDRESS=0x123...
NEXT_PUBLIC_CARD_ADDRESS=0x456...
NEXT_PUBLIC_REWARDS_ADDRESS=0x789...

# RPC URL (optional, for transaction verification)
NEXT_PUBLIC_SEPOLIA_RPC_URL=https://eth-sepolia.alchemyapi.io/v2/YOUR_KEY
```

### Step 6: Start the App

```bash
npm run dev
```

Open http://localhost:3000

### Step 7: Connect Wallet

1. Click "Connect MetaMask" button
2. MetaMask popup will appear
3. Select your wallet and approve
4. Confirm you're on Sepolia network

### Step 8: Perform Transactions

1. **Borrow a book:**
   - Click borrow button
   - MetaMask popup shows gas estimate
   - Approve transaction
   - See transaction hash in sidebar
   - Wait ~12-15 seconds for confirmation

2. **Return a book:**
   - Click return button
   - MetaMask shows fee calculation
   - Approve transaction
   - Receive rewards for on-time return

3. **Track transactions:**
   - View in sidebar "Recent Transactions"
   - Click 🔍 icon to view on Etherscan

---

## Transaction Details

### Gas Costs (Approximate Sepolia Prices)

| Operation | Gas | Cost (ETH) | Cost (USD) |
|-----------|-----|-----------|-----------|
| Borrow Book | 100k | 0.002 | ~$0.05 |
| Return Book | 150k | 0.003 | ~$0.10 |
| Issue Card | 300k | 0.006 | ~$0.20 |
| Renew Card | 50k | 0.001 | ~$0.03 |

*Prices vary with network congestion and ETH price*

### Fee Structure

**Late Fees:** 50% per day overdue
- 1 day late: 0.5 ETH
- 2 days late: 1.0 ETH
- 3 days late: 1.5 ETH

**Rewards:** 10 LRT tokens for on-time return

---

## Troubleshooting

### "MetaMask not installed"
- Install from https://metamask.io/download/

### "Wrong network"
- MetaMask needs to be on Sepolia
- Click wallet → Select Sepolia from dropdown

### "Insufficient funds for gas"
- You need Sepolia ETH (different from mainnet ETH)
- Get more from faucets above

### "Contract not found"
- Make sure contract addresses are in `.env.local`
- Restart dev server after adding addresses
- Check addresses are valid Sepolia contracts

### "Transaction failed"
- Check MetaMask for error details
- Ensure book is available
- Check you haven't borrowed max (5) books
- Try refreshing the page

### "Low balance"
- Get more Sepolia ETH from faucet
- Or switch back to mock mode for testing

---

## Switching Between Mock and Real Mode

### Enable Mock Mode
```typescript
// Automatically used if contracts not configured
// Or manually:
localStorage.setItem("useMockContracts", "true");
location.reload();
```

### Enable Real Mode
1. Add contract addresses to `.env.local`
2. Connect MetaMask wallet
3. App automatically switches

---

## Environment Variables Reference

```env
# ✅ Contract Addresses (Required for real blockchain)
NEXT_PUBLIC_LIBRARY_ADDRESS=0x...      # LibraryManagement contract
NEXT_PUBLIC_CARD_ADDRESS=0x...         # LibraryCard (ERC721) contract
NEXT_PUBLIC_REWARDS_ADDRESS=0x...      # RewardToken (ERC20) contract

# Optional: RPC configuration
NEXT_PUBLIC_SEPOLIA_RPC_URL=...        # For advanced features
```

---

## Key Features

### Mock Mode (Default)
- ✅ Works immediately
- ✅ No gas fees
- ✅ No wallet needed
- ✅ Instant transactions
- ❌ Local only (no blockchain)

### Real Blockchain
- ✅ Permanent records
- ✅ Verifiable on Etherscan
- ✅ Production testnet
- ✅ Real transactions
- ❌ Need Sepolia ETH
- ❌ Need MetaMask
- ❌ Wait for confirmation

---

## View Transactions

All Sepolia transactions viewable at:
- **Etherscan:** https://sepolia.etherscan.io
- **Transaction:** https://sepolia.etherscan.io/tx/{hash}
- **Contract:** https://sepolia.etherscan.io/address/{address}

---

## Next Steps

1. **For Testing:** Use default mock mode
2. **For Development:** Deploy contracts locally with Hardhat
3. **For Production:** Deploy to Sepolia, add real contracts
4. **For Mainnet:** Deploy to Ethereum mainnet (requires real ETH)

---

## Support Resources

- **Ethers.js Docs:** https://docs.ethers.org/
- **MetaMask Guide:** https://docs.metamask.io/guide/
- **Solidity Docs:** https://docs.soliditylang.org/
- **Sepolia Faucets:** https://sepoliafaucet.com
- **Etherscan Sepolia:** https://sepolia.etherscan.io

---

## Security Notes

⚠️ **IMPORTANT:**
- Never share your PRIVATE_KEY
- Never commit `.env.local` to git
- Use `.gitignore` to exclude it
- Generate new keys for production
- Use hardware wallet for mainnet

---

## Advanced: Custom RPC Setup

If you have your own RPC provider:

```env
NEXT_PUBLIC_SEPOLIA_RPC_URL=https://your-rpc-provider/v1/YOUR_KEY
```

This allows:
- Custom gas pricing
- Better performance
- Private mempools
- Advanced features

---

## Questions?

Refer to:
- `TRANSACTION_GUIDE.md` - Transaction details
- `COMPLETE_DEPLOYMENT_GUIDE.md` - Deployment steps
- Contract ABIs in `lib/contract-abi.ts`
- Mock contracts in `lib/mock-contracts.ts`
