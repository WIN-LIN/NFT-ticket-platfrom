// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Ticket.sol";

contract Market {

    struct TicketDetails {
        uint256 priceWei; // selling price
        bool forSale;
    }

    // use ticket ID to look up ticket details
    mapping(uint256 => TicketDetails) public idToticketDetails;

    Ticket private ticket;
    address payable private host;
    uint256 public eventDate;
    uint256 public refundDate; // Buyers can get refund before refundDate
    uint256 public ticketBasePriceWei;
    uint256 public royalty; // 10 == 10%
    uint256 public refundRate;

    // event
    event setTicketForSale(uint256 ticketId, uint256 sellingPriceWei);
    event setTicketsForSale(uint256 toId, uint256 fromId, uint256 sellingPriceWei);
    event BuyTicket(uint256 ticketId, uint256 price);
    event RefundTicket(uint256 ticketId);
    event NotSellTicket(uint256 ticketId);
    event DateChanged(uint256 _eventDate, uint256 _refundDate);

    receive() external payable{}
    fallback() external payable {}

    constructor(
        Ticket _ticket,
        uint256 _eventDate,
        uint256 _ticketBasePriceWei,
        uint256 _royalty,
        uint256 _refundDate,
        uint256 _refundRate
    ) {
        ticket = _ticket;
        host = payable(_ticket.getHost());
        eventDate = _eventDate;
        ticketBasePriceWei = _ticketBasePriceWei;
        royalty = _royalty;
        refundDate = _refundDate;
        refundRate = _refundRate;
    }

    modifier isRefundable {
        require(block.timestamp <= refundDate, "It is too late to get refund.");
        _;
    }

    modifier onlyOwner(uint256 _ticketId) {
        require(ticket.ownerOf(_ticketId) == msg.sender, "You are not the owner of the ticket" );
        _;
    }

    modifier onlyHost{
        require(msg.sender == host, "You are not the event host.");
        _;
    }

    modifier isReadyToSell(uint256 _ticketId) {
        require(idToticketDetails[_ticketId].forSale == true, "This ticket is not for sale");
        _;
    }

    modifier isApprove(uint256 _ticketId){
        require(ticket.getApproved(_ticketId) == address(this), "This ticket hasn't approved to this contract.");
        _;
    }

    modifier isNotOwner(uint256 _ticketId){
        require(msg.sender != ticket.ownerOf(_ticketId), "The ticket owner cannot buy his/her own ticket.");
        _;
    }

    modifier isApprovedForAll {
        require(ticket.isApprovedForAll(msg.sender, address(this)), "You haven't approved all tickets to the market.");
        _;
    }

    /*
     * @notice Method for selling ticket
     * @param _ticketId Token ID of NFT
     * @param _sellingPriceWei Sale price for this ticket
    */
    function sellTicket(uint256 _ticketId, uint256 _sellingPriceWei) external onlyOwner(_ticketId) isApprovedForAll {
        require(_sellingPriceWei >= 0, "Make sure the price is not negative");
        idToticketDetails[_ticketId] = TicketDetails({
        priceWei: _sellingPriceWei,
        forSale: true
        });
        emit setTicketForSale(_ticketId, _sellingPriceWei);
    }

    /*
     * @notice Method for event host to sell tickets in sequence
     * @param _fromId initialize sale from this token ID of NFT
     * @param _toId initialize sale till this token ID of NFT
     * @param _sellingPriceWei Sale price for these tickets
    */
    function sellBulkTickets(uint256 _fromId, uint256 _toId, uint256 _sellingPriceWei) external onlyHost{
        require(_toId <= ticket.ticketCounts(), "toId is not yet minted.");
        require(ticket.isApprovedForAll(host, address(this)), "You haven't approved all tickets to the market.");
        for (uint256 i = _fromId; i <= _toId; i++) {
            idToticketDetails[i] = TicketDetails({
            priceWei: _sellingPriceWei,
            forSale: true
            });
        }
        emit setTicketsForSale(_fromId, _toId, _sellingPriceWei);
    }

    /*
     * @notice Method for cancel the ticket from sale
     * @param _ticketId the token ID of NFT
    */
    function cancelSellTicket(uint256 _ticketId) external onlyOwner(_ticketId) {
        require(idToticketDetails[_ticketId].forSale == true, "It is not for sale already.");
        idToticketDetails[_ticketId].forSale = false;
        emit NotSellTicket(_ticketId);
    }

    /*
     * @notice Method for buying the ticket
     * @param _ticketId the token ID of NFT
    */
    function buyTicket(uint256 _ticketId) external payable isReadyToSell(_ticketId) isNotOwner(_ticketId) {
        uint256 sellingPrice = idToticketDetails[_ticketId].priceWei;
        address buyer = msg.sender;
        address payable seller = payable(ticket.ownerOf(_ticketId));
        uint256 fee = (msg.value * royalty) / 100;

        require(msg.value == sellingPrice, "Not equal to the selling price");

        if (seller == host) {
            (bool success,) = address(this).call{value: msg.value}("");
            require(success, "Payment failure.");
        } else {
            (bool success1,) = address(this).call{value: fee}("");
            (bool success2,) = address(seller).call{value: (msg.value)-fee}("");
            require(success1 && success2, "Payment failure.");
        }

        idToticketDetails[_ticketId].forSale = false;

        ticket.transferTicket(buyer, _ticketId);
        emit BuyTicket(_ticketId, msg.value);
    }

    /*
     * @notice Method for refunding the ticket
     * @param _ticketId the token ID of NFT
    */
    function refundTicket(uint256 _ticketId) external payable isRefundable isApprovedForAll {
        require( msg.sender == ticket.ownerOf(_ticketId), "You are not the owner of the ticket.");
        require( msg.sender != host, "Event host cannot get refund.");
        uint256 refund = (ticketBasePriceWei * refundRate) / 100;
        (bool success,) = payable(msg.sender).call{value: refund}("");
        require(success, "Refund failed.");
        ticket.transferTicket(address(host), _ticketId);
        emit RefundTicket(_ticketId);
    }

    /*
     * @notice Method for withdrawing the proceds from this event after the event is over
    */
    function withdrawProceeds() external payable onlyHost{
        require(block.timestamp >= eventDate, "The event is not yet closed.");
        (bool success,) = payable(msg.sender).call{value: address(this).balance}("");
        require(success, "Withdraw Failed.");
    }
    /*
     * @notice Method for changing the event date
     * @param _eventDate the new event date
     * @param _refundDate the new refund date
    */
    function changeDate(uint256 _eventDate, uint256 _refundDate) external onlyHost {
        eventDate = _eventDate;
        refundDate = _refundDate;
        emit DateChanged(eventDate, refundDate);
    }
}