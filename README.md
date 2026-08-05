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
