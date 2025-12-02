@echo off
REM Smart Contract Library System - Deployment Script (Windows)
REM This script deploys the contracts to Sepolia testnet

setlocal enabledelayedexpansion

echo.
echo 🚀 Smart Library System Deployment Script
echo ==========================================
echo.

REM Check if .env.local exists
if not exist ".env.local" (
    echo ❌ Error: .env.local not found
    echo Please create .env.local with:
    echo   SEPOLIA_RPC_URL=https://eth-sepolia.alchemyapi.io/v2/YOUR_KEY
    echo   PRIVATE_KEY=your_private_key_here
    exit /b 1
)

echo ✅ Environment file found
echo.

REM Check if npm is installed
where npm >nul 2>nul
if errorlevel 1 (
    echo ❌ Error: npm not found. Please install Node.js
    exit /b 1
)

echo 📦 Installing dependencies...
call npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox @openzeppelin/hardhat-upgrades >nul 2>&1

echo ✅ Dependencies ready
echo.

REM Create hardhat config if it doesn't exist
if not exist "hardhat.config.js" (
    echo 📝 Creating hardhat.config.js...
    (
        echo require("@nomicfoundation/hardhat-toolbox");
        echo require("@openzeppelin/hardhat-upgrades");
        echo.
        echo const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
        echo const PRIVATE_KEY = process.env.PRIVATE_KEY;
        echo.
        echo module.exports = {
        echo   solidity: "0.8.20",
        echo   networks: {
        echo     sepolia: {
        echo       url: SEPOLIA_RPC_URL,
        echo       accounts: [PRIVATE_KEY],
        echo       chainId: 11155111,
        echo     },
        echo   },
        echo };
    ) > hardhat.config.js
)

REM Create deployment script if it doesn't exist
if not exist "scripts\deploy.js" (
    echo 📝 Creating deployment script...
    if not exist "scripts" mkdir scripts
    (
        echo const hre = require("hardhat");
        echo.
        echo async function main^(^) {
        echo   console.log("🚀 Deploying Smart Library System to Sepolia...");
        echo   console.log("");
        echo.
        echo   const [deployer] = await ethers.getSigners^(^);
        echo   console.log("📍 Deploying from:", deployer.address^);
        echo   console.log("");
        echo.
        echo   console.log("1️⃣  Deploying LibraryManagement...");
        echo   const LibraryManagement = await hre.ethers.getContractFactory^("LibraryManagement"^);
        echo   const library = await LibraryManagement.deploy^(^);
        echo   await library.waitForDeployment^(^);
        echo   const libraryAddress = await library.getAddress^(^);
        echo   console.log^("   ✅ LibraryManagement deployed to:", libraryAddress^);
        echo.
        echo   console.log^("2️⃣  Deploying LibraryCard ^(NFT^)..."^);
        echo   const LibraryCard = await hre.ethers.getContractFactory^("LibraryCard"^);
        echo   const card = await LibraryCard.deploy^(^);
        echo   await card.waitForDeployment^(^);
        echo   const cardAddress = await card.getAddress^(^);
        echo   console.log^("   ✅ LibraryCard deployed to:", cardAddress^);
        echo.
        echo   console.log^("3️⃣  Deploying RewardToken ^(ERC20^)..."^);
        echo   const RewardToken = await hre.ethers.getContractFactory^("RewardToken"^);
        echo   const token = await RewardToken.deploy^(^);
        echo   await token.waitForDeployment^(^);
        echo   const tokenAddress = await token.getAddress^(^);
        echo   console.log^("   ✅ RewardToken deployed to:", tokenAddress^);
        echo.
        echo   console.log^("======================================================"^);
        echo   console.log^("🎉 Deployment Complete!"^);
        echo   console.log^("======================================================"^);
        echo   console.log^(""^);
        echo.
        echo   console.log^("📋 Add these to your .env.local file:"^);
        echo   console.log^(""^);
        echo   console.log^(`NEXT_PUBLIC_LIBRARY_ADDRESS=^${libraryAddress}`^);
        echo   console.log^(`NEXT_PUBLIC_CARD_ADDRESS=^${cardAddress}`^);
        echo   console.log^(`NEXT_PUBLIC_REWARDS_ADDRESS=^${tokenAddress}`^);
        echo   console.log^(""^);
        echo.
        echo   console.log^("🔗 View on Etherscan:"^);
        echo   console.log^(`   Library: https://sepolia.etherscan.io/address/^${libraryAddress}`^);
        echo   console.log^(`   Card:    https://sepolia.etherscan.io/address/^${cardAddress}`^);
        echo   console.log^(`   Token:   https://sepolia.etherscan.io/address/^${tokenAddress}`^);
        echo   console.log^(""^);
        echo }
        echo.
        echo main^(^)
        echo   .then^(^(^) =^> process.exit^(0^)^)
        echo   .catch^(^(error^) =^> {
        echo     console.error^(error^);
        echo     process.exit^(1^);
        echo   }^);
    ) > scripts\deploy.js
)

echo 🔄 Starting deployment...
echo.

REM Run deployment
call npx hardhat run scripts\deploy.js --network sepolia

echo.
echo ✅ Deployment script complete!
echo 📖 Next steps:
echo    1. Copy the contract addresses above
echo    2. Add them to your .env.local file
echo    3. Restart the dev server: npm run dev
echo    4. Connect your MetaMask wallet
echo    5. Switch to Sepolia network
echo    6. Start borrowing books!
echo.

endlocal
