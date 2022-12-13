## Project Name
## 1. Initialize the project
```Bash
yarn init
yarn add --dev hardhat
yarn hardhat
yarn add --dev prettier prettier-plugin-solidity
yarn create next-app
```
## 2. Contracts
### Ticket.sol
1. `bulkMintTicket`: Mint multiple tickets at once.
### Market.sol
1. `sellTicket`: After approving the ticket to this contract, the owner can set sale for the ticket and the selling price.
2. `sellBulkTickets`: Like `sellTicket`, but only for host to list multiple tickets to the market.
3. `notSellTicket`: Cancel the selling of a ticket.
4. `buyTicket`: Buy a ticket from the market.
5. `refundTicket`: Refund a ticket to the owner.
6. `withdrawProceeds`: The host can withdraw the balance of the contract after the event ends.

## 3. Database
### Event
1. `ID`: The id of the event.
2. `name`: The name of the event.
3. `host`: The host of the event.
4. `start_time`: The start time of the event.
5. `end_time`: The end time of the event.
6. `refund_time`: The refund time of the event.
7. `place`: The location of the event.
8. `ticket_address`: The address of the ticket contract.
9. `market_address`: The address of the market contract.
10. `cover_image`: The cover image of the event.
11. `information`: The description of the event.
12. `other_information`: The other information of the event.
### Ticket
1. `ID`: The id of the ticket.
2. `event_id`: The id of the event.
3. `use` : how many times the ticket is used.
4. `last_use_time`: The last time the ticket is used.