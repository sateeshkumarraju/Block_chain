// Configuration for smart contract addresses
// These are PUBLIC blockchain addresses (not sensitive)
export const getContractAddresses = () => {
  return {
    library: process.env.NEXT_PUBLIC_LIBRARY_ADDRESS || "0x0000000000000000000000000000000000000000",
    card: process.env.NEXT_PUBLIC_CARD_ADDRESS || "0x0000000000000000000000000000000000000000",
    rewards: process.env.NEXT_PUBLIC_REWARDS_ADDRESS || "0x0000000000000000000000000000000000000000",
  }
}

export const isContractsConfigured = () => {
  const { library, card, rewards } = getContractAddresses()
  return (
    library !== "0x0000000000000000000000000000000000000000" &&
    card !== "0x0000000000000000000000000000000000000000" &&
    rewards !== "0x0000000000000000000000000000000000000000"
  )
}
