#!/usr/bin/env bash

# Smart Contract Library System - Deployment Script
# This script deploys the contracts to Sepolia testnet

set -e

echo "🚀 Smart Library System Deployment Script"
echo "=========================================="
echo ""

# Check if .env file exists
if [ ! -f .env.local ]; then
    echo "❌ Error: .env.local not found"
    echo "Please create .env.local with:"
    echo "  SEPOLIA_RPC_URL=https://eth-sepolia.alchemyapi.io/v2/YOUR_KEY"
    echo "  PRIVATE_KEY=your_private_key_here"
    exit 1
fi

# Load environment
source .env.local

if [ -z "$SEPOLIA_RPC_URL" ] || [ -z "$PRIVATE_KEY" ]; then
    echo "❌ Error: SEPOLIA_RPC_URL and PRIVATE_KEY must be set in .env.local"
    exit 1
fi

echo "✅ Environment variables loaded"
echo ""

# Check if hardhat is installed
if ! command -v npx &> /dev/null; then
    echo "❌ Error: npx not found. Please install Node.js"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox @openzeppelin/hardhat-upgrades &> /dev/null || true

echo "✅ Dependencies ready"
echo ""

# Create hardhat config if it doesn't exist
if [ ! -f hardhat.config.js ]; then
    echo "📝 Creating hardhat.config.js..."
    cat > hardhat.config.js << 'EOF'
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
      chainId: 11155111,
    },
  },
};
EOF
fi

# Create deployment script if it doesn't exist
if [ ! -f scripts/deploy.js ]; then
    echo "📝 Creating deployment script..."
    mkdir -p scripts
    cat > scripts/deploy.js << 'EOF'
const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying Smart Library System to Sepolia...");
  console.log("");

  // Get deployer account
  const [deployer] = await ethers.getSigners();
  console.log("📍 Deploying from:", deployer.address);
  console.log("");

  // Deploy LibraryManagement
  console.log("1️⃣  Deploying LibraryManagement...");
  const LibraryManagement = await hre.ethers.getContractFactory("LibraryManagement");
  const library = await LibraryManagement.deploy();
  await library.waitForDeployment();
  const libraryAddress = await library.getAddress();
  console.log("   ✅ LibraryManagement deployed to:", libraryAddress);

  // Deploy LibraryCard
  console.log("2️⃣  Deploying LibraryCard (NFT)...");
  const LibraryCard = await hre.ethers.getContractFactory("LibraryCard");
  const card = await LibraryCard.deploy();
  await card.waitForDeployment();
  const cardAddress = await card.getAddress();
  console.log("   ✅ LibraryCard deployed to:", cardAddress);

  // Deploy RewardToken
  console.log("3️⃣  Deploying RewardToken (ERC20)...");
  const RewardToken = await hre.ethers.getContractFactory("RewardToken");
  const token = await RewardToken.deploy();
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log("   ✅ RewardToken deployed to:", tokenAddress);

  console.log("");
  console.log("=" .repeat(60));
  console.log("🎉 Deployment Complete!");
  console.log("=" .repeat(60));
  console.log("");
  console.log("📋 Add these to your .env.local file:");
  console.log("");
  console.log(`NEXT_PUBLIC_LIBRARY_ADDRESS=${libraryAddress}`);
  console.log(`NEXT_PUBLIC_CARD_ADDRESS=${cardAddress}`);
  console.log(`NEXT_PUBLIC_REWARDS_ADDRESS=${tokenAddress}`);
  console.log("");
  console.log("🔗 View on Etherscan:");
  console.log(`   Library: https://sepolia.etherscan.io/address/${libraryAddress}`);
  console.log(`   Card:    https://sepolia.etherscan.io/address/${cardAddress}`);
  console.log(`   Token:   https://sepolia.etherscan.io/address/${tokenAddress}`);
  console.log("");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
EOF
fi

echo "🔄 Starting deployment..."
echo ""

# Run deployment
npx hardhat run scripts/deploy.js --network sepolia

echo ""
echo "✅ Deployment script complete!"
echo "📖 Next steps:"
echo "   1. Copy the contract addresses above"
echo "   2. Add them to your .env.local file"
echo "   3. Restart the dev server: npm run dev"
echo "   4. Connect your MetaMask wallet"
echo "   5. Switch to Sepolia network"
echo "   6. Start borrowing books!"
