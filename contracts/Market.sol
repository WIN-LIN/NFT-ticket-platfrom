// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./eventTicket.sol";

contract EventMarket {

    struct TicketDetails {
        uint256 priceWei; // selling price
        bool forSale;
    }

    // use ticket ID to look up ticket details
    mapping(uint256 => TicketDetails) public idToticketDetails;

    EventTicket private ticket;
    address payable private host;
    uint256 public eventDate;
    uint256 public refundDate; // Buyers can get refund before refundDate
    uint256 public ticketBasePriceWei;
    uint256 public royalty; // 10 == 10%
    uint256 public refundRate;

    // event
    event upadteTicketPrice(uint256 ticketId, uint256 sellingPriceWei);
    event ticketSold(uint256 ticketId, uint256 price);

    receive() external payable{}
    fallback() external payable {}

    constructor(
        EventTicket _ticket,
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

    modifier isOutdated {
        require(block.timestamp <= eventDate, "The event is closed.");
        _;
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

    // set ticket sell
    function sellTicket(uint256 _ticketId, uint256 _sellingPriceWei) public onlyOwner(_ticketId) {
        require(_sellingPriceWei > 0, "Make sure the price is not negative");
        idToticketDetails[_ticketId] = TicketDetails({
        priceWei: _sellingPriceWei,
        forSale: true
        });
        emit upadteTicketPrice(_ticketId, _sellingPriceWei);
    }

    // only for host to initialize the sale
    function sellBulkTicket(uint256 _fromId, uint256 _toId, uint256 _sellingPriceWei) public {
        require(_toId <= ticket.ticketCounts(), "toId is not yet minted.");
        for (uint256 i = _fromId; i < _toId; i++) {
            idToticketDetails[i] = TicketDetails({
            priceWei: _sellingPriceWei,
            forSale: true
            });
        }
    }

    function buyTicket(uint256 _ticketId) public payable isReadyToSell(_ticketId) {
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
        //ticket.approve(address(this), _ticketId);
        emit ticketSold(_ticketId, msg.value);
    }

    function refundTicket(uint256 _ticketId) public payable isRefundable {
        require( msg.sender == ticket.ownerOf(_ticketId), "You are not the owner of the ticket.");
        uint256 refund = (ticketBasePriceWei * refundRate) / 100;
        (bool success,) = payable(msg.sender).call{value: refund}("");
        require(success, "Refund failed.");
        ticket.transferTicket(address(host), _ticketId);
    }
}