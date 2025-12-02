# 📋 MetaMask Transaction Confirmation Flow

## Overview

When borrowing a book with a fee, users must confirm the payment through MetaMask. This document explains the complete transaction flow.

## Transaction Flow Diagram

```
User clicks "Borrow Book"
    ↓
Book has fee?
    ├─ YES → Show Confirmation Dialog
    │         ↓
    │         User reviews fee amount
    │         ↓
    │         User clicks "Confirm & Pay"
    │         ↓
    │         MetaMask popup appears ← USER CONFIRMS HERE
    │         ├─ Approve: Sends transaction to blockchain
    │         └─ Reject: Transaction cancelled
    │
    └─ NO → Borrow immediately (free book)

Transaction Sent to Blockchain
    ↓
Waiting for Confirmation
    ↓
Transaction Confirmed ✅
    ↓
Book Added to Inventory
    ↓
Notification: "Successfully borrowed!"
```

## Step-by-Step Process

### Step 1: Browse Books
- User sees all available books in the catalog
- Books with fees show a **yellow 💰 badge** with the fee amount

### Step 2: Click "Borrow Book"

#### For FREE Books
- Borrowed immediately
- No MetaMask popup
- Success notification appears instantly

#### For PAID Books
- A **confirmation dialog** appears before MetaMask
- Dialog shows:
  - Book title
  - Exact fee amount in ETH
  - Information about MetaMask confirmation
  - Two buttons: Cancel | Confirm & Pay

### Step 3: Review Payment (Confirmation Dialog)

```
┌─────────────────────────────────────────┐
│  💰 Confirm Borrow Payment              │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ Book Title: Smart Contracts 101 │   │
│  │ Borrow Fee: 0.1 ETH             │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ℹ️ This fee will be deducted from    │
│     your wallet when you confirm      │
│     in MetaMask. You can cancel       │
│     anytime from MetaMask.            │
│                                         │
│  [ Cancel ]     [ Confirm & Pay ]     │
└─────────────────────────────────────────┘
```

**User Options:**
- **Cancel** - Close dialog, don't proceed
- **Confirm & Pay** - Open MetaMask for payment

### Step 4: MetaMask Payment Confirmation

When user clicks "Confirm & Pay", MetaMask popup appears:

```
┌──────────────────────────────────────┐
│  MetaMask                            │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│  Confirm Transaction                 │
│                                      │
│  From: 0x1234...5678                │
│  To:   Library Contract              │
│  Method: borrowBook()                │
│                                      │
│  Transaction Details:                │
│  ┌────────────────────────────────┐ │
│  │ Amount: 0.1 ETH                │ │
│  │ Gas Fee: ~0.002 ETH            │ │
│  │ Total: ~0.102 ETH              │ │
│  └────────────────────────────────┘ │
│                                      │
│  [ Reject ]      [ Confirm ]         │
└──────────────────────────────────────┘
```

**MetaMask Shows:**
- ✅ **From Address** - Your wallet
- ✅ **To Address** - Library contract
- ✅ **Amount** - Borrow fee (e.g., 0.1 ETH)
- ✅ **Gas Fee** - Network fee for transaction
- ✅ **Total Cost** - Fee + Gas

### Step 5: User Decision

#### Option A: Reject
- Click **"Reject"** button
- Transaction cancelled
- No payment charged
- User returns to app
- Error notification: "Payment cancelled - transaction rejected"

#### Option B: Confirm
- Click **"Confirm"** button
- Payment sent to blockchain
- Transaction hash generated
- App shows: "Confirming transaction..."
- Waiting for blockchain confirmation (~15-30 seconds on Sepolia)

### Step 6: Transaction Processing

```
Transaction Confirmed ✅
├─ Block mined
├─ Fee deducted from wallet
├─ Book marked as borrowed
├─ Entry added to borrow history
└─ Success notification appears

OR

Transaction Failed ❌
├─ Error displayed to user
├─ Original wallet balance restored
├─ User can retry
└─ No book borrowed
```

### Step 7: Confirmation & History Update

**Success Notification:**
```
✅ Successfully borrowed "Smart Contracts 101"!
```

**What happens next:**
1. ✅ Book appears in "Borrowing Status" section
2. ✅ Book inventory count decreases
3. ✅ Fee counted in user profile statistics
4. ✅ Transaction hash visible in transaction tracker
5. ✅ Can view on Etherscan using transaction link

## Transaction Details Visible in App

### Transaction Tracker (Sidebar)
Shows recent transactions with:
- Transaction type: **BORROW** | RETURN
- Book name
- Status: **CONFIRMED**
- Link to Etherscan block explorer
- Time of transaction

### User Profile (Statistics)
- **Total Fees Paid** - Updated after return
- **Books Borrowed** - Updated immediately
- **Rewards Earned** - Updated on time returns

## Real vs Mock Mode

### Real Blockchain (MetaMask)
✅ **Requires Confirmation:**
- MetaMask popup appears
- User must click "Confirm"
- Gas fees apply (small, ~0.002 ETH on Sepolia)
- Transaction takes 12-30 seconds
- Permanent on blockchain
- Can view on Etherscan

### Mock Mode (Default)
- ✅ No MetaMask needed
- ✅ Instant borrowing
- ✅ Simulates blockchain behavior
- ✅ Perfect for testing
- ❌ Not on real blockchain

## Error Scenarios

### Error 1: User Rejects Transaction
```
Transaction rejected by user
├─ Status: Cancelled ❌
├─ Wallet Balance: Unchanged
├─ Book Borrowed: No
└─ Notification: "❌ Payment cancelled - transaction rejected"
```

### Error 2: Insufficient Funds
```
User doesn't have enough ETH for:
├─ Borrow fee (e.g., 0.1 ETH)
├─ Gas fee (e.g., 0.002 ETH)
├─ Total needed: 0.102 ETH
└─ Notification: "❌ Insufficient funds to pay the borrow fee"
```

**Solution:** User needs to:
1. Get more test ETH from Sepolia faucet
2. Or send ETH to their wallet
3. Then retry borrowing

### Error 3: Network Issues
```
Transaction fails due to network
├─ MetaMask shows error
├─ Transaction not processed
└─ Notification: "Failed to borrow book: [error details]"
```

**Solution:** 
1. Check MetaMask is on correct network (Sepolia)
2. Check internet connection
3. Retry the transaction

## Security Features

### 1. Confirmation Dialog
- Users confirm fee amount **before** MetaMask popup
- Prevents accidental purchases
- Shows exact ETH amount

### 2. MetaMask Confirmation
- Users review transaction details
- Can reject if feels wrong
- MetaMask handles wallet security

### 3. Error Handling
- Clear error messages
- Users know why transaction failed
- Can retry safely

### 4. Transaction Visibility
- Transaction hash provided
- Can verify on Etherscan
- Permanent record on blockchain

## Gas Fees Explained

When you confirm a transaction, you pay TWO things:

```
Total Cost = Borrow Fee + Gas Fee

Example:
Borrow Fee (to library):     0.1 ETH
Gas Fee (to network):        ~0.002 ETH
─────────────────────────────────────
Total paid:                  ~0.102 ETH
```

**Gas Fee:**
- ✅ Only for real blockchain transactions
- ✅ ~0.002 ETH on Sepolia testnet
- ✅ Much cheaper than mainnet
- ✅ Depends on network congestion
- ❌ NOT charged for mock mode

## Console Logs (For Developers)

When borrowing with fee, console shows:

```
[v0] Borrowing book with ID: 1
[v0] Book fee: 0.1 ETH
[v0] Sending transaction to MetaMask for confirmation...
[v0] Transaction sent to blockchain: 0x1234...
[v0] Waiting for confirmation...
[v0] Transaction confirmed on block: 5123456
[v0] Gas used: 85000
```

## Tips for Users

### ✅ DO:
- Review fee amount in dialog
- Check MetaMask shows correct amount
- Verify you have enough ETH
- Check network is Sepolia
- Keep transaction hash for records

### ❌ DON'T:
- Click "Confirm" if fee looks wrong
- Close MetaMask popup without deciding
- Change network mid-transaction
- Borrow book if you don't have funds

## Troubleshooting

### Q: MetaMask popup doesn't appear
A: 
1. Check if MetaMask is installed
2. Check MetaMask is unlocked (click icon)
3. Check network is Sepolia
4. Try refreshing page

### Q: "Insufficient funds" error
A:
1. You need: Borrow Fee + Gas Fee
2. Get more test ETH from faucet
3. Wait for ETH to arrive
4. Retry borrowing

### Q: Transaction takes too long
A:
1. Sepolia can be slow sometimes
2. Wait 1-2 minutes
3. Check status in MetaMask
4. Check on Etherscan with tx hash

### Q: Transaction rejected but charged
A:
1. Check MetaMask transaction history
2. Check Etherscan with address
3. If rejected, you shouldn't be charged
4. Contact support if unsure

## Testing Transaction Confirmation

### Test Scenario 1: Successful Borrow
1. Connect MetaMask wallet
2. Click "Borrow Book" on paid book
3. See confirmation dialog
4. Click "Confirm & Pay"
5. Approve in MetaMask
6. ✅ Wait for confirmation
7. ✅ See success notification

### Test Scenario 2: Reject Payment
1. Connect MetaMask wallet
2. Click "Borrow Book" on paid book
3. See confirmation dialog
4. Click "Confirm & Pay"
5. Click "Reject" in MetaMask
6. ✅ See "Transaction rejected" message
7. ✅ Book not borrowed
8. ✅ Wallet balance unchanged

### Test Scenario 3: Free Book
1. Connect MetaMask wallet
2. Click "Borrow Book" on free book
3. ✅ No confirmation dialog
4. ✅ No MetaMask popup
5. ✅ Book borrowed immediately

## Summary

✅ **Paid Books Require:**
1. Confirmation dialog review
2. MetaMask wallet confirmation
3. Fee payment + gas fee
4. ~15-30 seconds for blockchain

✅ **Free Books Are:**
1. Instant borrowing
2. No MetaMask needed
3. No payment required

✅ **Safety Features:**
1. Double confirmation (dialog + MetaMask)
2. Clear fee information
3. Easy rejection option
4. Transaction tracking
5. Error messages

---

**Status**: ✅ MetaMask Transaction Confirmation Active
**Mode**: Works in both real blockchain and mock modes
**Last Updated**: Session - MetaMask Transaction Confirmation Implementation
