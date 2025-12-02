# 📚 Borrowing Fees System

## Overview
Some books in the library now require a fee to borrow. These fees are collected upfront when users borrow the book.

## Book Fees

| Book ID | Title | Author | Fee | Status |
|---------|-------|--------|-----|--------|
| 0 | Blockchain Basics | John Doe | FREE | ✅ No Fee |
| 1 | Smart Contracts 101 | Jane Smith | **0.1 ETH** | 💰 Premium |
| 2 | Solidity Programming | Mike Johnson | FREE | ✅ No Fee |
| 3 | DeFi Protocols | Sarah Williams | **0.05 ETH** | 💰 Standard |
| 4 | Web3 Development | Tom Brown | **0.15 ETH** | 💰 Premium Plus |
| 5 | Crypto Economics | Lisa Garcia | FREE | ✅ No Fee |

## How It Works

### When Borrowing a Book

1. **User selects a book** - They see the fee displayed in yellow on the book card
2. **Fee collected** - When borrowing:
   - **Free books**: No payment needed
   - **Premium books**: Fee is deducted from user's ETH balance
   - Fees are sent to the library contract
3. **Book borrowed** - The book is added to user's borrowed list

### When Returning a Book

- Late fees apply on top of the borrow fee
- Example: Borrow "Smart Contracts 101" (0.1 ETH) and return 2 days late = 0.1 ETH + late fee

## UI Changes

### Book Catalog
- Books with fees show a **yellow warning badge**
- Badge displays: "💰 Borrow Fee: 0.X ETH"
- Clear indication before borrowing

### Fee Levels
- **FREE** - No fee to borrow
- **STANDARD** (0.05 ETH) - Books with high demand
- **PREMIUM** (0.1-0.15 ETH) - Advanced/specialized content

## Implementation Details

### Smart Contract (LibraryManagement.sol)
```solidity
struct Book {
    ...
    uint256 borrowFee;  // Fee in wei
}

function borrowBook(uint256 bookId) external payable {
    require(msg.value >= book.borrowFee, "Insufficient fee");
    // Book is borrowed
}
```

### Mock Contract (mock-contracts.ts)
```typescript
async borrowBook(userAddress: string, bookId: number, fee: number) {
    if (fee < book.borrowFee) {
        throw new Error("Insufficient fee");
    }
    // Book is borrowed
}
```

### Wallet Manager (wallet-manager.ts)
```typescript
async borrowBook(bookId: number) {
    const book = await getBookDetails(bookId);
    // For real blockchain: include fee in transaction
    // For mock: pass fee amount
    return await contract.borrowBook(bookId, { value: book.borrowFee });
}
```

## Revenue Model

### Where Fees Go
- Collected in the library contract
- Can be withdrawn by contract owner
- Support library maintenance and operations

### Fee Structure
- **Premium Content Premium**: Highest-demand books
- **Standard Fee**: Regular high-demand books  
- **Free**: General collection

## User Experience

### Before (Free)
```
Book Card
├── Title
├── Author
├── Availability
└── [Borrow Book] Button
```

### After (With Fees)
```
Book Card
├── Title
├── Author
├── Availability
├── 💰 Borrow Fee: 0.1 ETH  ← NEW
└── [Borrow Book] Button
```

## Testing

### Test Case 1: Borrow Free Book
1. Click "Borrow Book" on "Blockchain Basics"
2. ✅ Should succeed immediately
3. ✅ No ETH deducted

### Test Case 2: Borrow Premium Book
1. Click "Borrow Book" on "Smart Contracts 101"
2. See fee warning: "💰 Borrow Fee: 0.1 ETH"
3. Click confirm
4. ✅ 0.1 ETH should be deducted
5. ✅ Book added to borrowed list

### Test Case 3: Insufficient Fee (Real Blockchain)
1. Try to borrow book with 0.05 ETH fee
2. Send only 0.01 ETH
3. ✅ Transaction rejected: "Insufficient fee"

## Future Enhancements

- [ ] Dynamic pricing based on availability
- [ ] Seasonal discounts
- [ ] Loyalty program (free borrows after X borrows)
- [ ] Family subscription
- [ ] Volume discounts

## Revenue Statistics

### Current Setup
- 3 of 6 books have fees
- Premium book average: ~0.1 ETH per borrow
- Estimated annual revenue: ~0.36 ETH per active user

### Example Transaction Flow
```
User borrows "Smart Contracts 101" (0.1 ETH fee)
  ↓
0.1 ETH sent to library contract
  ↓
Book added to user's borrowed list
  ↓
User returns book after 2 days (1 day late)
  ↓
Late fee calculated: 0.5 ETH per day = 0.5 ETH
  ↓
Total paid: 0.1 ETH (borrow) + 0.5 ETH (late) = 0.6 ETH
  ↓
History shows both fees
```

## Notes

- Fees are **non-refundable** if book not borrowed
- Fees are collected immediately upon borrowing
- Late fees are separate and added on top
- All fees shown in ETH in UI
- Mock mode simulates real blockchain fee behavior

---

**Status**: ✅ Implemented and Active
**Available**: Immediately in both mock and real blockchain modes
**Last Updated**: Session - Borrow Fees Implementation
