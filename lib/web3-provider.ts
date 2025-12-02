import { ethers } from "ethers"

export class Web3Provider {
  private provider: ethers.Provider | null = null
  private signer: ethers.Signer | null = null
  private libraryManagementContract: ethers.Contract | null = null
  private libraryCardContract: ethers.Contract | null = null
  private rewardTokenContract: ethers.Contract | null = null

  async initializeProvider(
    libraryAddress: string,
    cardAddress: string,
    tokenAddress: string,
    libraryABI: any,
    cardABI: any,
    tokenABI: any,
  ) {
    if (!window.ethereum) {
      throw new Error("MetaMask not installed. Please install MetaMask.")
    }

    try {
      this.provider = new ethers.BrowserProvider(window.ethereum)
      this.signer = await this.provider.getSigner()

      this.libraryManagementContract = new ethers.Contract(libraryAddress, libraryABI, this.signer)
      this.libraryCardContract = new ethers.Contract(cardAddress, cardABI, this.signer)
      this.rewardTokenContract = new ethers.Contract(tokenAddress, tokenABI, this.signer)

      console.log("[v0] Web3 provider initialized successfully")
      return this.signer.getAddress()
    } catch (error: any) {
      console.error("[v0] Error initializing Web3 provider:", error)
      throw new Error("Failed to initialize Web3 provider: " + error.message)
    }
  }

  getProvider() {
    return this.provider
  }

  getSigner() {
    return this.signer
  }

  getLibraryContract() {
    return this.libraryManagementContract
  }

  getCardContract() {
    return this.libraryCardContract
  }

  getTokenContract() {
    return this.rewardTokenContract
  }

  async switchToSepolia() {
    if (!window.ethereum) throw new Error("MetaMask not found")

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xaa36a7" }],
      })
    } catch (error: any) {
      if (error.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainName: "Sepolia",
              chainId: "0xaa36a7",
              nativeCurrency: { name: "ETH", decimals: 18, symbol: "ETH" },
              rpcUrls: ["https://sepolia.infura.io/v3/YOUR_INFURA_KEY"],
            },
          ],
        })
      }
    }
  }
}

export const web3Provider = new Web3Provider()
