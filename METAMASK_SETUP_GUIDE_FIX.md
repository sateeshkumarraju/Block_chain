# 🦊 MetaMask Setup & Connection Guide

## Quick Troubleshooting

### Problem: "MetaMask Popup Not Opening"

**Possible Causes:**
1. ❌ MetaMask not installed
2. ❌ MetaMask extension disabled
3. ❌ Wallet already connecting
4. ❌ Browser popup blocker blocking MetaMask

---

## SOLUTION 1: Install MetaMask (If You Don't Have It)

### Step 1: Go to MetaMask Website
1. Open: https://metamask.io
2. Click "Download" button
3. Choose your browser:
   - Chrome / Brave / Edge: Get from Chrome Web Store
   - Firefox: Get from Firefox Add-ons
4. Click "Add to [Browser]" or "Add Extension"

### Step 2: MetaMask Installs
- Extension appears in top-right of browser
- May see popup "Welcome to MetaMask"

### Step 3: Create or Import Wallet
- **New wallet**: Click "Create a Wallet" → Set password → Save seed phrase
- **Existing wallet**: Click "Import Wallet" → Enter seed phrase → Set password

### Step 4: You're Done!
- MetaMask icon now has your account
- Ready to use!

---

## SOLUTION 2: Enable MetaMask in Your Browser

### Chrome / Edge / Brave
1. Look for MetaMask **fox icon** 🦊 (top-right)
2. If you don't see it, click the **puzzle icon** (extensions)
3. Find "MetaMask" in the list
4. Click the **pin icon** to keep it visible
5. Now fox icon appears in top-right

### Firefox
1. Click **hamburger menu** (≡) top-right
2. Click "Extensions"
3. Find "MetaMask" in the list
4. It should be enabled (green toggle)
5. Click and pin it to toolbar if needed

### Verify It Works
- Click the **fox icon** 🦊
- You should see your wallet account
- Shows a balance

---

## SOLUTION 3: Check Browser Popup Blocker

### Chrome / Edge / Brave
1. In address bar, see **popup blocker icon** 🚫
2. Click it
3. Select "Always allow popups from this site"
4. Refresh the page

### Firefox
1. Click the **popup blocker icon** 🚫 (right side of address bar)
2. Click "Allow Popups for this Site"
3. Refresh

### Important Sites to Allow
- Smart Library System website
- localhost:3000 (if local)

---

## SOLUTION 4: Get Test Ethereum (Sepolia Testnet)

### Step 1: Ensure You're On Sepolia Network

In MetaMask:
1. Click **network dropdown** (top of MetaMask popup)
2. Look for **"Sepolia Testnet"**
3. If not there, click "Show test networks":
   - In MetaMask, click your **account icon** (top-right)
   - Go to **Settings** → **Advanced**
   - Toggle "Show test networks" ON
   - Go back, now "Sepolia" appears

4. **Select "Sepolia Testnet"**

### Step 2: Get Test ETH from Faucet

**Option A: Alchemy Faucet (Recommended)**
1. Go: https://sepoliafaucet.com
2. Sign in with Alchemy account (or create one)
3. Paste your wallet address
4. Click "Send Me ETH"
5. Wait ~30 seconds, check MetaMask (refresh balance)

**Option B: Sepolia Official Faucet**
1. Go: https://www.sepolia.dev/
2. Look for faucet links
3. Follow instructions

**Option C: Multiple Faucets**
- https://faucetlink.to/sepolia
- https://sepolia-faucet.pk910.de/

### How Long Does It Take?
- Usually: 5-60 seconds
- Sometimes: Up to 5 minutes
- If longer: Wait a bit, then refresh MetaMask

### Check Your Balance
1. Open MetaMask
2. Should show: "1 Sepolia ETH" (or your amount)
3. Now ready to use!

---

## SOLUTION 5: Fix Common MetaMask Errors

### Error: "MetaMask not installed"
```
Fix: 
1. Install MetaMask (see Solution 1)
2. Refresh the page
3. Try again
```

### Error: "User rejected the request"
```
You clicked "Reject" in MetaMask.
Fix:
1. Click "Connect MetaMask" again
2. Click "Approve" this time
```

### Error: "User denied account access"
```
You said MetaMask shouldn't access this site.
Fix:
1. Click the MetaMask fox icon
2. Click your account icon (top-right)
3. Settings → Connected Sites
4. Remove this site from the list
5. Go back and click "Connect MetaMask"
6. Click "Next" then "Connect"
```

### Error: "Insufficient funds"
```
You don't have enough ETH.
Fix:
1. Get more test ETH from faucet (see Solution 4)
2. Wait for ETH to arrive (~1 minute)
3. Try again
```

---

## STEP-BY-STEP: Connect MetaMask to Smart Library

### Step 1: Open the App
```
http://localhost:3000
(or your deployed URL)
```

### Step 2: Look for Wallet Section
On the left side, you see:
```
💰 Connect Wallet
━━━━━━━━━━━━━━━━━
[ Connect MetaMask ]

📌 How it works:
• Click "Connect MetaMask" above
• MetaMask popup will appear
• Select your wallet account
• Click "Next" then "Connect"
• ✅ Done!
```

### Step 3: Click "Connect MetaMask"
Button: [ Connect MetaMask ]

### Step 4: MetaMask Popup Appears
A MetaMask popup window opens showing:
```
Select an Account
━━━━━━━━━━━━━━━
□ Account 1 (0x1234...5678)
  Ethereum - Sepolia
  1.5 ETH

[ Cancel ]  [ Next ]
```

### Step 5: Select Your Account
- Click on the account you want to use
- Usually shows your main account
- Shows your balance

### Step 6: Click "Next"
- After selecting account, click [ Next ]
- New screen appears asking for permission

### Step 7: Click "Connect"
```
Connect with MetaMask
━━━━━━━━━━━━━━━━━
This site wants to:
✓ View the addresses of your permitted accounts
✓ Request transactions you approve

[ Cancel ]  [ Connect ]
```
- Click [ Connect ]
- MetaMask window closes
- You're now connected!

### Step 8: Verify Connection
Now the app shows:
```
💰 Connected
━━━━━━━━━━━━━━━━
Account: 0x1234...5678
[ 📋 Copy ]

Balance: 1.45 ETH
[ Refresh ]

[ Switch to Sepolia ]
```

✅ **You're ready to borrow books with MetaMask confirmation!**

---

## Testing the Payment Confirmation

### Test Borrow a Book

1. **Find a Paid Book** (has 💰 fee)
   - Smart Contracts 101: 0.1 ETH
   - DeFi Protocols: 0.05 ETH
   - Web3 Development: 0.15 ETH

2. **Click "Borrow Book"**
   - Confirmation dialog appears
   - Shows fee amount
   - Click "Confirm & Pay"

3. **MetaMask Confirmation Popup**
   ```
   Confirm Transaction
   ━━━━━━━━━━━━━━━━━
   From: Your Account
   To:   Library Contract
   
   Amount: 0.1 ETH
   Gas:    ~0.002 ETH
   Total:  ~0.102 ETH
   
   [ Reject ]  [ Confirm ]
   ```

4. **Click "Confirm"**
   - MetaMask processes payment
   - Transaction sent to blockchain
   - App shows "Waiting for confirmation..."

5. **Wait 15-30 seconds**
   - Blockchain confirms transaction
   - App shows "✅ Book borrowed successfully!"
   - Book appears in your borrowing list
   - 0.102 ETH deducted from wallet

✅ **Payment Confirmed!**

---

## Troubleshooting Checklist

- [ ] MetaMask installed? (See Solution 1)
- [ ] MetaMask visible in browser? (See Solution 2)
- [ ] Browser allows popups? (See Solution 3)
- [ ] On Sepolia testnet? (See Solution 4)
- [ ] Have test ETH? (See Solution 4)
- [ ] MetaMask unlocked? (Click icon and check)
- [ ] No errors showing? (Check red error text)

---

## Quick Commands to Fix Issues

### Reset MetaMask
```
MetaMask Menu (top-right) → Settings → Advanced → Clear Activity Tab Data
```

### Switch to Sepolia
```
MetaMask → Click Network Dropdown → Select "Sepolia Testnet"
```

### Get Test ETH
```
Go to: https://sepoliafaucet.com
Paste wallet address, get 0.25 ETH
Wait 30-60 seconds
Refresh MetaMask to see balance
```

### Clear Browser Cache
```
Chrome/Edge: Ctrl+Shift+Delete → Clear browsing data → Clear
Firefox: Ctrl+Shift+Delete → Clear Everything
```

### Refresh the App
```
Keyboard: F5 or Ctrl+R
Or: Click refresh icon in address bar
```

---

## Still Having Issues?

### Check Console for Errors
1. Press: F12 (or right-click → Inspect)
2. Click: "Console" tab
3. Look for red [v0] messages
4. Screenshot it for troubleshooting

### Common Console Errors

```
[v0] MetaMask not installed
→ Install MetaMask browser extension

[v0] User rejected the request
→ Click "Approve" next time in MetaMask

[v0] Insufficient funds
→ Get more test ETH from faucet

[v0] Transaction failed
→ Check gas price, try again
```

---

## MetaMask Tips

### 1. Bookmark the App
```
Press: Ctrl+D (or Cmd+D on Mac)
So you don't lose the URL
```

### 2. Keep MetaMask Unlocked
```
MetaMask stays active while you're using the app
If it locks, click icon and enter password
```

### 3. Check Transaction History
```
MetaMask → Activity tab
Shows all your transactions
Can view on Etherscan
```

### 4. Never Share Your Seed Phrase
```
⚠️ Your 12-word seed phrase = Access to all accounts
⚠️ Never share it with anyone
⚠️ MetaMask won't ask for it
```

### 5. Use Small Test Amounts
```
Start with 0.05 ETH tests
Once working, borrow more books
```

---

## What Happens Behind the Scenes

```
You Click "Borrow"
    ↓
Dialog Shows Fee: "0.1 ETH"
    ↓
You Click "Confirm & Pay"
    ↓
Code Calls: borrowBook(bookId, { value: 0.1 ETH })
    ↓
Ethers.js Detects { value: 0.1 ETH }
    ↓
Ethers.js Asks MetaMask to Sign the Transaction
    ↓
🦊 METAMASK POPUP APPEARS 🦊
    ├─ Shows amount: 0.1 ETH
    ├─ Shows gas: ~0.002 ETH
    ├─ Shows total: ~0.102 ETH
    ├─ Waits for your decision
    │
    └─ You decide:
       ├─ Click "Reject" → Cancelled, no money sent
       └─ Click "Confirm" → MetaMask signs the transaction
    
If Confirmed:
    ↓
Transaction sent to blockchain
    ↓
Miners/validators process it (~15-30 seconds)
    ↓
✅ Transaction confirmed
    ↓
💰 0.102 ETH deducted from wallet
    ↓
📚 Book added to your borrowing list
    ↓
✅ App shows "Borrowed successfully!"
```

---

## Success Indicators

You know it's working when:
- ✅ MetaMask popup appears after clicking "Confirm & Pay"
- ✅ Popup shows the exact fee amount
- ✅ Popup shows gas cost
- ✅ You can click "Confirm" or "Reject"
- ✅ After confirming, transaction processes
- ✅ Book appears in your list
- ✅ Etherscan shows the transaction
- ✅ MetaMask shows the transaction in Activity

---

## Support Resources

- **MetaMask Help**: https://support.metamask.io/
- **Sepolia Faucet**: https://sepoliafaucet.com
- **Etherscan Sepolia**: https://sepolia.etherscan.io
- **Our App Docs**: See METAMASK_PAYMENT_CONFIRMATION_FINAL.md

---

**Status**: ✅ MetaMask Integration Complete
**Ready to Use**: Yes
**Test Network**: Sepolia
**Need Help**: Check console (F12) for errors

Happy borrowing! 📚🔐
