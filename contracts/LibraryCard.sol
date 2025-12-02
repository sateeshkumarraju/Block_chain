// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LibraryCard is ERC721, Ownable {
    uint256 private tokenIdCounter = 0;
    
    struct CardData {
        uint256 tokenId;
        address holder;
        uint256 issueDate;
        uint256 expiryDate;
        uint256 borrowCount;
    }

    mapping(uint256 => CardData) public cardData;
    mapping(address => uint256) public userTokenId;

    uint256 public constant CARD_VALIDITY = 365 days;

    event CardIssued(address indexed user, uint256 indexed tokenId);
    event CardRenewed(address indexed user, uint256 indexed tokenId);

    constructor() ERC721("LibraryCard", "LC") {}

    function issueCard() external {
        require(userTokenId[msg.sender] == 0, "User already has a card");

        uint256 tokenId = tokenIdCounter++;
        _safeMint(msg.sender, tokenId);

        cardData[tokenId] = CardData(tokenId, msg.sender, block.timestamp, block.timestamp + CARD_VALIDITY, 0);
        userTokenId[msg.sender] = tokenId;
        emit CardIssued(msg.sender, tokenId);
    }

    function renewCard() external {
        uint256 tokenId = userTokenId[msg.sender];
        require(tokenId != 0, "User does not have a card");
        cardData[tokenId].expiryDate = block.timestamp + CARD_VALIDITY;
        emit CardRenewed(msg.sender, tokenId);
    }

    function getCardData(address user) external view returns (CardData memory) {
        uint256 tokenId = userTokenId[user];
        require(tokenId != 0, "User does not have a card");
        return cardData[tokenId];
    }

    function isCardValid(address user) external view returns (bool) {
        uint256 tokenId = userTokenId[user];
        if (tokenId == 0) return false;
        return block.timestamp <= cardData[tokenId].expiryDate;
    }
}
