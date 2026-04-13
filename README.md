# Blockchain Based Secure E-Voting System

This project presents a secure electronic voting system using blockchain technology and face recognition authentication. The system ensures that only authorized voters can cast their votes and that the votes recorded on the blockchain cannot be altered.

## Features

- Face recognition based voter authentication
- Secure vote recording using blockchain
- Duplicate vote prevention
- Candidate selection interface
- Transaction ID for vote verification

## Smart Contract

The voting logic is implemented using a Solidity smart contract.

File: Voting.sol

Functions:
- castVote()
- getVotesCount()
- getVote()

## Technologies Used

- Node.js
- Express.js
- MySQL
- Solidity
- Ganache Blockchain
- Face-api.js
- HTML, CSS, JavaScript

## Project Structure

public/
models/
symbols/
voters/

admin.html
voter.html

server.js
package.json

## How to Run

1. Install Node.js

2. Install dependencies

npm install

3. Start the server

node server.js

4. Open browser

http://localhost:3000
