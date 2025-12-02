# Transaction System Documentation

## Overview

The Smart Library System supports both **mock mode** (for local testing) and **real blockchain transactions** (Sepolia testnet).

## Transaction Types

### 1. Borrow Book Transaction
- **Type**: Non-payable (no ETH required)
- **Gas Cost**: ~100,000 - 150,000 gas
- **What happens**:
  - Book inventory decreases
  - User profile updated with borrowed book ID
  - Borrow record created with due date (30 days)
  - Transaction logged on blockchain

```
BorrowBook(bookId)
├── Check book availability
├── Check user max borrow limit (5 books)
├── Decrement book inventory
├── Add to user's borrowed list
├── Create borrow record with due date
└── Emit BookBorrowed event
```

### 2. Return Book Transaction
- **Type**: Non-payable (no ETH required)
- **Gas Cost**: ~200,000 - 250,000 gas (higher due to fee calculation)
- **What happens**:
  - Late fee calculated if overdue
  - Book inventory increases
  - User profile updated
  - Rewards earned for on-time return (10 LRT tokens)
  - Transaction logged on blockchain

```
ReturnBook(bookId)
├── Find active borrow record
├── Calculate days overdue
├── Calculate late fee (50% per day)
├── Update user profile
├── Award rewards if on-time (10 tokens)
├── Increment book inventory
└── Emit BookReturned event
```

### 3. Issue Library Card (NFT)
- **Type**: Non-payable
- **Gas Cost**: ~300,000 gas
- **What happens**:
  - NFT issued to user
  - Card valid for 365 days
  - One card per user

### 4. Renew Library Card
- **Type**: Non-payable
- **Gas Cost**: ~50,000 gas
- **What happens**:
  - Card expiry extended to 365 days from now

## Fee Structure

### Late Fees
- Calculated as: `50% per day overdue`
- Example:
  - 1 day late: 0.5 ETH
  - 2 days late: 1.0 ETH
  - 3 days late: 1.5 ETH

### Gas Fees
- Paid in ETH to the network
- Varies by network congestion
- Sepolia testnet fees are typically very low (<$0.01)

### Reward Tokens
- Issued for on-time returns: 10 LRT tokens
- Tokens are ERC20 and can be traded/burned
- No fees for issuing rewards

## Transaction Status Flow

```
User Action
    ↓
Transaction Submitted
    ├── Status: "pending"
    ├── User sees: "Processing..."
    └── Block time: ~12-15 seconds
    ↓
Transaction Confirmed
    ├── Status: "confirmed"
    ├── Mined in block
    ├── Block explorer updated
    └── User sees: Success message
    ↓
Transaction Recorded
    ├── History updated
    ├── Profile updated
    ├── Events emitted
    └── UI refreshed
```

## Mock Mode vs Real Blockchain

### Mock Mode (Default)
- ✅ Instant transactions (no waiting)
- ✅ No gas fees
- ✅ No wallet required
- ✅ Perfect for testing
- ❌ Not on actual blockchain
- ❌ Data lost on page refresh

### Real Blockchain (Sepolia)
- ✅ All transactions recorded permanently
- ✅ Transparent and verifiable
- ✅ Can be viewed on Etherscan
- ✅ Production-ready testnet
- ❌ Requires MetaMask
- ❌ Requires Sepolia test ETH
- ❌ ~12-15 second confirmation time

## Switching Modes

### Enable Mock Mode
```typescript
localStorage.setItem("useMockContracts", "true")
// Then reconnect wallet
```

### Enable Real Blockchain
1. Deploy contracts to Sepolia
2. Add contract addresses to `.env.local`
3. Connect MetaMask wallet
4. Switch network to Sepolia in MetaMask

## Transaction Tracking

### In Dashboard
- Recent transactions displayed in sidebar
- Shows transaction hash
- Links to Etherscan (Sepolia)
- Status badges (Pending/Confirmed/Failed)

### Event Listeners (Real Blockchain)
- Listen for `BookBorrowed` events
- Listen for `BookReturned` events
- Listen for `CardIssued` events
- Listen for `MinterAdded` events

### Borrow History
- All transactions accessible via `getBorrowHistory()`
- Includes:
  - Book ID
  - User address
  - Borrow date
  - Due date
  - Return date
  - Late fee
  - Status (borrowed/returned/overdue)

## Error Handling

### Common Errors

1. **"Book not available"**
   - All copies currently borrowed
   - Wait for someone to return it

2. **"Maximum 5 books can be borrowed"**
   - User already has 5 books
   - Return some books first

3. **"User has not borrowed this book"**
   - Trying to return a book they didn't borrow
   - Check borrow history

4. **"Failed to connect wallet"**
   - MetaMask not installed
   - MetaMask not unlocked
   - Network issues

5. **Gas-related errors**
   - Insufficient funds for gas
   - Gas price too low
   - Network congestion

## Sepolia Test ETH

Get free test ETH from:
- https://sepoliafaucet.com
- https://cloud.google.com/application/web3/faucet/ethereum/sepolia
- https://www.infura.io/faucet/sepolia

## View on Etherscan

All Sepolia transactions viewable at:
- Base: https://sepolia.etherscan.io
- Transaction: https://sepolia.etherscan.io/tx/{transactionHash}

## Gas Optimization Tips

1. **Batch multiple operations** when possible
2. **Use mock mode** for frequent testing
3. **Set gas price limit** when network is congested
4. **Wait for low-gas periods** for non-urgent transactions

## Future Enhancements

- [ ] Multi-signature transactions
- [ ] Batch lending operations
- [ ] Gas-less transactions (Relayers)
- [ ] Polygon/Layer 2 support
- [ ] Transaction retry logic
- [ ] Gas estimation UI
- [ ] Transaction notifications (email/SMS)
- [ ] Advanced analytics dashboard
