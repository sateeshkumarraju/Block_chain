// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract LibraryManagement is Ownable {
    // Book structure
    struct Book {
        uint256 id;
        string title;
        string author;
        string isbn;
        uint256 available;
        uint256 total;
        uint256 borrowFee; // Fee in wei to borrow this book
    }

    // User profile structure
    struct UserProfile {
        address userAddress;
        uint256[] borrowedBooks;
        uint256 totalBorrowed;
        uint256 totalFeesPaid;
        uint256 rewardsEarned;
        bool hasLibraryCard;
    }

    // Borrow record structure
    struct BorrowRecord {
        uint256 bookId;
        address userAddress;
        uint256 borrowDate;
        uint256 dueDate;
        uint256 returnDate;
        uint256 fee;
        uint8 status; // 0: borrowed, 1: returned, 2: overdue
    }

    // State variables
    Book[] public books;
    mapping(address => UserProfile) public userProfiles;
    BorrowRecord[] public borrowRecords;
    mapping(address => bool) public hasProfile;

    uint256 public constant MAX_BORROW = 5;
    uint256 public constant BORROW_DAYS = 30;
    uint256 public constant LATE_FEE_RATE = 50; // 50% per day

    event BookBorrowed(address indexed user, uint256 indexed bookId, uint256 borrowDate);
    event BookReturned(address indexed user, uint256 indexed bookId, uint256 returnDate, uint256 fee);
    event UserProfileCreated(address indexed user);

    constructor() {
        initializeBooks();
    }

    function initializeBooks() private {
        books.push(Book(0, "Blockchain Basics", "John Doe", "ISBN001", 5, 5, 0));
        books.push(Book(1, "Smart Contracts 101", "Jane Smith", "ISBN002", 3, 5, 0.1 ether));
        books.push(Book(2, "Solidity Programming", "Mike Johnson", "ISBN003", 8, 10, 0));
        books.push(Book(3, "DeFi Protocols", "Sarah Williams", "ISBN004", 2, 5, 0.05 ether));
        books.push(Book(4, "Web3 Development", "Tom Brown", "ISBN005", 6, 8, 0.15 ether));
        books.push(Book(5, "Crypto Economics", "Lisa Garcia", "ISBN006", 4, 6, 0));
    }

    function getOrCreateUser(address user) private {
        if (!hasProfile[user]) {
            uint256[] memory emptyArray;
            userProfiles[user] = UserProfile(user, emptyArray, 0, 0, 0, false);
            hasProfile[user] = true;
            emit UserProfileCreated(user);
        }
    }

    function borrowBook(uint256 bookId) external payable {
        require(bookId < books.length, "Book not found");
        require(books[bookId].available > 0, "Book not available");

        // Check if fee is required and correct amount sent
        uint256 borrowFee = books[bookId].borrowFee;
        require(msg.value >= borrowFee, "Insufficient fee to borrow this book");

        getOrCreateUser(msg.sender);
        UserProfile storage user = userProfiles[msg.sender];

        require(user.borrowedBooks.length < MAX_BORROW, "Maximum 5 books can be borrowed");

        books[bookId].available--;
        user.borrowedBooks.push(bookId);
        user.totalBorrowed++;

        uint256 dueDate = block.timestamp + (BORROW_DAYS * 1 days);
        borrowRecords.push(BorrowRecord(bookId, msg.sender, block.timestamp, dueDate, 0, 0, 0));

        emit BookBorrowed(msg.sender, bookId, block.timestamp);
    }

    function returnBook(uint256 bookId) external {
        require(bookId < books.length, "Book not found");

        getOrCreateUser(msg.sender);
        UserProfile storage user = userProfiles[msg.sender];

        bool found = false;
        for (uint256 i = 0; i < user.borrowedBooks.length; i++) {
            if (user.borrowedBooks[i] == bookId) {
                found = true;
                user.borrowedBooks[i] = user.borrowedBooks[user.borrowedBooks.length - 1];
                user.borrowedBooks.pop();
                break;
            }
        }

        require(found, "User has not borrowed this book");

        int256 recordIndex = -1;
        for (uint256 i = 0; i < borrowRecords.length; i++) {
            if (
                borrowRecords[i].userAddress == msg.sender &&
                borrowRecords[i].bookId == bookId &&
                borrowRecords[i].status == 0
            ) {
                recordIndex = int256(i);
                break;
            }
        }

        require(recordIndex != -1, "No active borrow record found");

        BorrowRecord storage record = borrowRecords[uint256(recordIndex)];
        uint256 daysOverdue = 0;

        if (block.timestamp > record.dueDate) {
            daysOverdue = (block.timestamp - record.dueDate) / 1 days;
        }

        uint256 lateFee = (daysOverdue * LATE_FEE_RATE) / 100;

        record.returnDate = block.timestamp;
        record.fee = lateFee;
        record.status = daysOverdue > 0 ? 2 : 1;

        user.totalFeesPaid += lateFee;

        if (daysOverdue == 0) {
            user.rewardsEarned += 10;
        }

        books[bookId].available++;

        emit BookReturned(msg.sender, bookId, block.timestamp, lateFee);
    }

    function getUserProfile(address user) external view returns (UserProfile memory) {
        return userProfiles[user];
    }

    function getBook(uint256 bookId) external view returns (Book memory) {
        require(bookId < books.length, "Book not found");
        return books[bookId];
    }

    function getAllBooks() external view returns (Book[] memory) {
        return books;
    }

    function getAvailableBooks(uint256 bookId) external view returns (uint256) {
        require(bookId < books.length, "Book not found");
        return books[bookId].available;
    }

    function getBorrowHistory(address user) external view returns (BorrowRecord[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < borrowRecords.length; i++) {
            if (borrowRecords[i].userAddress == user) {
                count++;
            }
        }

        BorrowRecord[] memory history = new BorrowRecord[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < borrowRecords.length; i++) {
            if (borrowRecords[i].userAddress == user) {
                history[index] = borrowRecords[i];
                index++;
            }
        }

        return history;
    }

    function hasUserBorrowed(address user, uint256 bookId) external view returns (bool) {
        if (!hasProfile[user]) return false;
        for (uint256 i = 0; i < userProfiles[user].borrowedBooks.length; i++) {
            if (userProfiles[user].borrowedBooks[i] == bookId) {
                return true;
            }
        }
        return false;
    }
}
