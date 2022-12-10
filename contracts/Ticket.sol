// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract EventTicket is ERC721 {
    using Counters for Counters.Counter;

    Counters.Counter private ticketId; // record how many ticket issued

    address private host;
    uint256 private totalSupply;

    event ticketTransfer(address to, uint256 ticketId);

    constructor(
        string memory _eventName,
        string memory _eventSymbol,
        uint256 _totalSupply
    ) ERC721( _eventName, _eventSymbol){
        totalSupply = _totalSupply;
        host = msg.sender;
    }

    modifier onlyHost {
        require(msg.sender == host);
        _;
    }

    modifier onlyOwner(uint256 _ticketId) {
        require(ownerOf(_ticketId) == msg.sender, "You are not the owner of the ticket" );
        _;
    }

    modifier isValidTicketCount {
        require(ticketId.current() < totalSupply, "Maximum ticket limit exceeded!");
        _;
    }

    // mint NFT
    function mint()
    internal
    virtual
    onlyHost
    returns (uint256)
    {
        ticketId.increment();
        uint256 newTicketId = ticketId.current();
        _mint(host, newTicketId);
        return newTicketId;
    }

    function bulkMintTickets(uint256 numOfTickets)
    public
    virtual
    onlyHost
    {
        require(
            (ticketCounts() + numOfTickets) <= totalSupply,
            "Number of tickets exceeds maximum ticket count"
        );

        for (uint256 i = 0; i < numOfTickets; i++) {
            mint();
        }
    }

    function transferTicket(address buyer, uint256 _ticketId) public {
        transferFrom(ownerOf(_ticketId), buyer, _ticketId);
        emit ticketTransfer(buyer, _ticketId);
    }

    // withdraw profit

    /* Helper functions */

    // Get current ticketId
    function ticketCounts() public view returns (uint256) {
        return ticketId.current();
    }

    // Get event host
    function getHost() public view returns (address){
        return host;
    }

}