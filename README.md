Yes 👍 paatha README motham replace chesi idi pettu. Ippudu **actual current project — Ethereum Sepolia + Alchemy + Face Recognition + MySQL** ki match ayyela professional ga untundi.

````markdown
# 🗳️ Blockchain-Based Secure E-Voting System

A secure and transparent electronic voting system that combines **Blockchain Technology** with **Face Recognition Authentication** to provide tamper-resistant vote recording, voter verification, and duplicate-voting prevention.

The system authenticates voters using facial recognition and records valid votes through a **Solidity smart contract deployed on the Ethereum Sepolia Testnet**. Each successful vote generates a blockchain transaction hash that can be independently verified.

---

## ✨ Features

- 👤 Face Recognition based voter authentication
- 🗳️ Secure electronic vote casting
- ⛓️ Blockchain-based vote recording
- 🔐 Smart contract based duplicate-vote prevention
- 🧾 Transaction hash generated for every successful vote
- 🔍 Votes can be verified using Sepolia Etherscan
- 👨‍💼 Admin interface for voter and candidate management
- 📷 Face descriptor based duplicate registration detection
- 🗄️ MySQL database for voter and candidate information
- 🌐 Ethereum Sepolia Testnet integration

---

## 🛠️ Technologies Used

### Frontend
- HTML
- CSS
- JavaScript
- Face-api.js

### Backend
- Node.js
- Express.js
- MySQL
- Ethers.js

### Blockchain
- Solidity
- Ethereum Sepolia Testnet
- Alchemy RPC
- MetaMask
- Remix IDE

---

## ⚙️ System Workflow

1. Admin registers voters and candidates.
2. Voter identity is verified using the registered Voter ID.
3. Face recognition is performed before voting access is granted.
4. The voter selects a candidate and casts the vote.
5. The backend communicates with the deployed Solidity smart contract using Ethers.js.
6. The smart contract checks whether the voter has already voted.
7. If eligible, the vote is permanently recorded on the Ethereum Sepolia blockchain.
8. The voter is marked as voted to prevent duplicate voting.
9. A blockchain transaction hash is returned as proof of successful vote recording.
10. The transaction can be verified using Sepolia Etherscan.

---

## 🔗 Blockchain Architecture

```text
Voter Interface
      ↓
Face Verification
      ↓
Node.js / Express Backend
      ↓
Ethers.js
      ↓
Alchemy RPC
      ↓
Voting Smart Contract
      ↓
Ethereum Sepolia Testnet
      ↓
Transaction Hash
````

---

## 📜 Smart Contract

The `Voting.sol` smart contract handles blockchain-based vote recording.

### Main Functions

* `castVote()` – Records a valid vote on the blockchain.
* `getVotesCount()` – Returns the total number of successfully recorded votes.
* `getVote()` – Retrieves stored vote information.
* `hasVoted` – Tracks voter IDs and prevents duplicate voting.

The smart contract uses Solidity's `require()` validation to reject repeated voting attempts.

---

## 🗄️ Database

MySQL is used to manage application-level information such as:

* Voter IDs
* Face data
* Voting status
* Candidate information

The actual blockchain vote record is handled by the Ethereum smart contract.

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
DB_PASSWORD=your_mysql_password

BLOCKCHAIN_RPC_URL=your_sepolia_rpc_url

BLOCKCHAIN_PRIVATE_KEY=your_wallet_private_key

CONTRACT_ADDRESS=your_deployed_contract_address
```

> ⚠️ Never commit the `.env` file or expose wallet private keys publicly.

---

## 🚀 Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/Kashyap-1906/blockchain-evoting-system.git
```

### 2. Navigate to the project

```bash
cd blockchain-evoting-system
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure MySQL

Create/import the database using:

```text
database.sql
```

### 5. Configure environment variables

Create the `.env` file and add the required database and blockchain credentials.

### 6. Start the server

```bash
node server.js
```

### 7. Open the application

```text
http://localhost:3000
```

---

## 🔒 Security

The system provides multiple layers of protection:

* Face-based voter authentication
* Duplicate face registration detection
* Smart contract based duplicate voting prevention
* Blockchain immutability
* Environment-variable based secret management
* Transaction-level vote verification

Even if a duplicate voting request reaches the blockchain, the smart contract rejects it if the voter has already voted.

---

## 🌐 Blockchain Network

**Network:** Ethereum Sepolia Testnet

The voting smart contract is deployed on the Ethereum Sepolia Testnet, allowing transactions to be publicly verified through a blockchain explorer.

---

## 🎯 Project Objective

The objective of this project is to demonstrate how blockchain technology and biometric authentication can be combined to improve the **security, transparency, integrity, and verifiability of electronic voting systems**.

---


## 📌 Project Status

✅ Face Recognition Integration
✅ Voter & Candidate Management
✅ Smart Contract Integration
✅ Duplicate Vote Prevention
✅ Ethereum Sepolia Deployment
✅ Blockchain Transaction Verification


