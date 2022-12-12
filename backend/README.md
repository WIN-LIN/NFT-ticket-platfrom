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