# 🦊 MetaMask Test ETH Setup Guide

## Quick Setup (5 Minutes)

### Step 1: Add Sepolia Testnet to MetaMask

1. Open **MetaMask** in your browser
2. Click the **network selector** (top left, says "Ethereum Mainnet")
3. Click **"Add network"** or **"Add a custom network"**
4. Fill in these details:

```
Network Name: Sepolia Testnet
New RPC URL: https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161
Chain ID: 11155111
Currency Symbol: ETH
Block Explorer URL: https://sepolia.etherscan.io
```

5. Click **Save** ✅

### Step 2: Switch to Sepolia Network

1. Click the network selector again
2. Select **"Sepolia Testnet"**
3. You should see it says "Sepolia" now ✅

### Step 3: Get Test ETH

Now you need free test ETH. Choose ONE of these faucets:

#### **Option A: Alchemy Faucet (BEST)** 
- Visit: https://sepoliafaucet.com
- Connect your MetaMask wallet
- Click "Send me ETH"
- Wait 1-2 minutes
- You'll receive 0.5 test ETH ✅

#### **Option B: Infura Faucet**
- Visit: https://www.infura.io/faucet/sepolia
- Enter your wallet address (copy from MetaMask)
- Click "Send Transaction"
- You'll get test ETH in a few seconds ✅

#### **Option C: Chainlink Faucet**
- Visit: https://faucets.chain.link/sepolia
- Connect MetaMask
- Click "Send me 0.1 TEST ETH"
- Receive test ETH instantly ✅

### Step 4: Verify You Have Test ETH

1. Open MetaMask
2. Look at your balance
3. Should show something like **0.5 ETH** or **0.1 ETH**
4. If it shows 0, refresh the page

## Now Test the App

✅ **Your wallet has test ETH!**

Now you can:

1. Go to http://localhost:3000
2. Click "🦊 Connect MetaMask"
3. Select your Sepolia wallet account
4. Click "Connect"
5. Now you have balance in your account! 💰

### Borrow a Paid Book

1. Look at available books
2. Click "Borrow Book" on one with a fee (shows 💰)
3. Confirmation dialog appears
4. Click "Confirm & Pay (Opens MetaMask)"
5. **MetaMask confirmation popup opens**
6. Click "Confirm" in MetaMask to approve payment ✅
7. Transaction sent to blockchain!
8. **Test ETH is deducted from your wallet**
9. Book is borrowed! 📚

## Troubleshooting

### "Transaction failed"
- Make sure you're on **Sepolia Testnet** (not Ethereum Mainnet)
- Make sure you have **test ETH balance**
- Check the browser console (F12) for error messages

### "I don't see test ETH after faucet"
- Wait 1-2 minutes
- Refresh the page
- Restart MetaMask

### "MetaMask says insufficient funds"
- Get more test ETH from a faucet
- Use Alchemy faucet (most reliable)

### "App says 'Error' for balance"
- Make sure you're on Sepolia testnet
- Reconnect wallet (click Disconnect, then Connect again)

## What Happens When You Confirm

1. You see MetaMask popup
2. It shows the transaction details:
   - **To:** Smart Contract Address
   - **Amount:** The book fee (0.1 ETH, etc)
   - **Gas Fee:** ~0.001-0.01 ETH
3. You click **"Confirm"**
4. Test ETH is deducted from wallet
5. Transaction is recorded on Sepolia testnet
6. Check explorer: https://sepolia.etherscan.io

## Perfect for Demo!

Now you can:
- ✅ Connect MetaMask
- ✅ See real balance
- ✅ Borrow paid books
- ✅ MetaMask confirms every payment
- ✅ Show transaction history in /reports page
- ✅ Demonstrate fees being charged

## Quick Reference

| Item | Value |
|------|-------|
| **Network** | Sepolia Testnet |
| **RPC URL** | https://sepoliafaucet.com |
| **Chain ID** | 11155111 |
| **Test ETH Faucet** | sepoliafaucet.com |
| **Block Explorer** | sepolia.etherscan.io |
| **App URL** | http://localhost:3000 |
| **Reports URL** | http://localhost:3000/reports |

---

**Ready to test?** 🚀
