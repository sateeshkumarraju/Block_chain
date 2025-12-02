export const LIBRARY_MANAGEMENT_ABI = [
  {
    inputs: [{ internalType: "uint256", name: "bookId", type: "uint256" }],
    name: "borrowBook",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "bookId", type: "uint256" }],
    name: "returnBook",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getUserProfile",
    outputs: [
      {
        components: [
          { internalType: "address", name: "userAddress", type: "address" },
          { internalType: "uint256[]", name: "borrowedBooks", type: "uint256[]" },
          { internalType: "uint256", name: "totalBorrowed", type: "uint256" },
          { internalType: "uint256", name: "totalFeesPaid", type: "uint256" },
          { internalType: "uint256", name: "rewardsEarned", type: "uint256" },
          { internalType: "bool", name: "hasLibraryCard", type: "bool" },
        ],
        internalType: "struct LibraryManagement.UserProfile",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "bookId", type: "uint256" }],
    name: "getBook",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "title", type: "string" },
          { internalType: "string", name: "author", type: "string" },
          { internalType: "string", name: "isbn", type: "string" },
          { internalType: "uint256", name: "available", type: "uint256" },
          { internalType: "uint256", name: "total", type: "uint256" },
        ],
        internalType: "struct LibraryManagement.Book",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllBooks",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "title", type: "string" },
          { internalType: "string", name: "author", type: "string" },
          { internalType: "string", name: "isbn", type: "string" },
          { internalType: "uint256", name: "available", type: "uint256" },
          { internalType: "uint256", name: "total", type: "uint256" },
        ],
        internalType: "struct LibraryManagement.Book[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getBorrowHistory",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "bookId", type: "uint256" },
          { internalType: "address", name: "userAddress", type: "address" },
          { internalType: "uint256", name: "borrowDate", type: "uint256" },
          { internalType: "uint256", name: "dueDate", type: "uint256" },
          { internalType: "uint256", name: "returnDate", type: "uint256" },
          { internalType: "uint256", name: "fee", type: "uint256" },
          { internalType: "uint8", name: "status", type: "uint8" },
        ],
        internalType: "struct LibraryManagement.BorrowRecord[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "user", type: "address" },
      { internalType: "uint256", name: "bookId", type: "uint256" },
    ],
    name: "hasUserBorrowed",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
]

export const LIBRARY_CARD_ABI = [
  {
    inputs: [],
    name: "issueCard",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renewCard",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getCardData",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "address", name: "holder", type: "address" },
          { internalType: "uint256", name: "issueDate", type: "uint256" },
          { internalType: "uint256", name: "expiryDate", type: "uint256" },
          { internalType: "uint256", name: "borrowCount", type: "uint256" },
        ],
        internalType: "struct LibraryCard.CardData",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "isCardValid",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
]

export const REWARD_TOKEN_ABI = [
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
]
