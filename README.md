# 🌾 Decentralized AgriChain

A **blockchain-powered agricultural supply chain platform** designed to provide transparent, traceable, and trustworthy movement of agricultural produce from **farm to consumer**.

Decentralized AgriChain combines **Spring Boot**, **React**, **Ethereum smart contracts**, and **Web3j** to create an auditable supply chain where produce ownership, transfers, and history can be recorded and verified.

---

## 📌 Overview

Traditional agricultural supply chains often involve multiple intermediaries, making it difficult to verify the origin, ownership, and movement of produce.

**Decentralized AgriChain** addresses this by recording important supply-chain events on the blockchain while maintaining application-level data in a relational database.

The platform supports:

```text
Farmer
   │
   ▼
Distributor
   │
   ▼
Retailer
   │
   ▼
Consumer
```

Each transfer can be associated with:

- Current owner
- Previous owner
- Transfer status
- Transfer reason
- Comments
- Timestamp
- Location
- Produce details

Blockchain integration provides an immutable record of key supply-chain operations.

---

## ✨ Features

### ✅ Current Features

#### 👨‍🌾 Actor Management

The platform supports different supply-chain participants:

- Farmers
- Distributors
- Retailers

Actor records can include location information to support future geolocation-based tracking.

#### 🌱 Produce Management

Users can create and manage agricultural produce records containing:

- Produce details
- Quantity
- Current owner
- Description

#### 🔄 Produce Transfer

Produce can be transferred between participants in the supply chain.

Transfers maintain information such as:

- Sender
- Receiver
- Transfer status
- Transfer reason
- Comments
- Timestamp
- Location

#### 🧾 Supply Chain History

The system maintains the movement history of produce:

```text
Actor A
   │
   ▼
Actor B
   │
   ▼
Actor C
   │
   ▼
Actor D
```

Each transition can be associated with a timestamp and location, providing end-to-end traceability.

#### ⛓️ Blockchain Integration

Important supply-chain operations are recorded through **Ethereum smart contracts**.

The backend communicates with the blockchain using **Web3j**.

This provides an immutable ledger for key transactions and improves transparency across the supply chain.

---

## 🗺️ Architecture

```text
                         ┌─────────────────────┐
                         │      Consumer       │
                         │   QR Verification   │
                         └──────────┬──────────┘
                                    │
                                    ▼
┌──────────────┐            ┌──────────────────┐
│    Farmer    │            │      React       │
└──────┬───────┘            │     Frontend     │
       │                    └────────┬─────────┘
       │                             │
       │                             │ REST API
       │                             ▼
┌──────▼───────┐            ┌──────────────────┐
│ Distributor  │            │   Spring Boot    │
└──────┬───────┘            │     Backend      │
       │                    └───────┬──────────┘
       │                            │
┌──────▼───────┐                    │
│   Retailer   │                    ├───────────────┐
└──────────────┘                    │               │
                                    ▼               ▼
                             ┌──────────────┐ ┌──────────────┐
                             │  Database    │ │    Web3j     │
                             │ JPA/Hibernate│ │ Integration  │
                             └──────────────┘ └──────┬───────┘
                                                     │
                                                     ▼
                                            ┌─────────────────┐
                                            │ Ethereum Smart  │
                                            │    Contracts    │
                                            └─────────────────┘
                                                     │
                                                     ▼
                                               Blockchain
```

---

## 🧩 System Components

### Frontend

Built with:

```text
React
Vite
JavaScript
```

The frontend provides the user-facing interface for actors and consumers.

### Backend

Built using:

```text
Spring Boot
Java
REST APIs
Spring Data JPA
Hibernate
```

The backend is responsible for:

- Business logic
- Actor management
- Produce management
- Transfer processing
- History tracking
- Database persistence
- Blockchain interaction

### Blockchain Layer

Built using:

```text
Ethereum
Solidity
Web3j
```

Smart contracts record important supply-chain events on-chain.

### Database

The application supports a relational database architecture using:

```text
MySQL / PostgreSQL
JPA / Hibernate
```

The database stores application-level records such as:

- Actors
- Produce
- Transfers
- History
- Location-related information

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, JavaScript |
| Backend | Spring Boot, Java |
| API | REST |
| Blockchain | Ethereum |
| Smart Contracts | Solidity |
| Blockchain Integration | Web3j |
| Database | MySQL / PostgreSQL |
| Persistence | JPA / Hibernate |
| Mapping | ModelMapper |
| Boilerplate Reduction | Lombok |
| Smart Contract Tooling | Hardhat / Remix |

---

## 📂 Project Structure

```text
AgriChain/
│
├── backend/
│   │
│   ├── src/
│   │   └── main/
│   │       └── java/
│   │           └── com/
│   │               └── company/
│   │                   └── Decentralized_AgriChain_backend/
│   │                       ├── controllers/
│   │                       ├── services/
│   │                       ├── dtos/
│   │                       ├── entities/
│   │                       └── repositories/
│   │
│   └── pom.xml
│
├── frontend/
│   │
│   ├── src/
│   └── package.json
│
└── smart-contracts/
    │
    └── contracts/
```

---

# 🚀 Getting Started

## Prerequisites

Make sure the following tools are installed:

- Java 17+ or the Java version configured by the backend
- Maven
- Node.js
- npm
- MySQL or PostgreSQL
- Node.js / Hardhat for smart-contract development
- Access to an Ethereum-compatible test network if deploying contracts

---

## 1. Clone the Repository

```bash
git clone https://github.com/98001yash/AgriChain.git
cd AgriChain
```

---

# 2. Backend Setup

Navigate to the backend:

```bash
cd backend
```

Build the project:

```bash
mvn clean install
```

Run the application:

```bash
mvn spring-boot:run
```

The backend will start using the configured Spring Boot environment.

Make sure the database configuration and smart-contract settings are correctly configured before starting the backend.

---

# 3. Frontend Setup

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The Vite development server will provide the frontend application URL in the terminal.

---

# 4. Smart Contract Setup

Navigate to the smart-contract directory:

```bash
cd smart-contracts
```

Smart contracts can be compiled and deployed using **Hardhat** or **Remix**.

After deployment:

1. Deploy the required smart contracts to your selected Ethereum-compatible network.
2. Obtain the deployed contract address.
3. Configure the backend with the deployed contract address.
4. Configure the appropriate RPC/network settings.
5. Ensure the backend wallet/account has the required permissions and funds for testnet transactions.

---

# 🔗 Blockchain Workflow

The blockchain interaction follows this general flow:

```text
User Action
    │
    ▼
React Frontend
    │
    ▼
Spring Boot REST API
    │
    ▼
Business Logic
    │
    ▼
Web3j
    │
    ▼
Solidity Smart Contract
    │
    ▼
Ethereum Network
    │
    ▼
Transaction Recorded On-Chain
```

The relational database continues to support application-level data while the blockchain provides an immutable record of important operations.

---

# 🔄 Produce Lifecycle

A typical produce lifecycle can be represented as:

```text
┌──────────────┐
│    Farmer    │
│ Creates Crop │
└──────┬───────┘
       │
       │ Transfer
       ▼
┌──────────────┐
│ Distributor  │
└──────┬───────┘
       │
       │ Transfer
       ▼
┌──────────────┐
│   Retailer   │
└──────┬───────┘
       │
       │ Sale
       ▼
┌──────────────┐
│   Consumer   │
└──────────────┘
```

Each transfer can contribute to the permanent history of the produce.

---

# 🧾 Traceability Model

A produce history can conceptually look like:

```text
Produce #1024

Farmer
  │
  ├── Timestamp
  ├── Location
  └── Transaction
       │
       ▼
Distributor
  │
  ├── Timestamp
  ├── Location
  └── Transaction
       │
       ▼
Retailer
  │
  ├── Timestamp
  ├── Location
  └── Transaction
       │
       ▼
Consumer
```

This allows the complete journey of the produce to be reconstructed.

---

# 🔮 Future Enhancements

The following capabilities are planned for future iterations:

### 📱 QR-Based Consumer Verification

Attach a QR code to produce so consumers can scan it and retrieve its verified supply-chain history.

### 🗺️ Visual Journey Map

Display the geographical journey of produce using the recorded location information.

### 💰 Escrow and Automated Settlement

Introduce smart-contract-based escrow and automated settlements between supply-chain participants.

### 📊 Predictive Analytics

Use historical supply-chain and market data to provide:

- Crop demand prediction
- Pricing insights
- Supply forecasting

### 🗳️ Decentralized Governance

Enable participating stakeholders to vote on platform-level decisions through decentralized governance mechanisms.

### ⭐ Reputation System

Introduce reputation and loyalty mechanisms for verified participants.

### 🛒 Direct Marketplace

Provide a marketplace for consumers to discover and purchase verified agricultural produce.

---

# 🔐 Security Considerations

For production deployment:

- Keep blockchain private keys outside source control.
- Store database credentials in environment variables or a secrets manager.
- Never commit API keys, wallet private keys, or passwords.
- Validate all incoming API requests.
- Restrict smart-contract administrative functions.
- Use an Ethereum testnet during development.
- Apply proper access control for farmer, distributor, retailer, and administrator operations.

---

# 🧪 Development Workflow

A recommended development workflow is:

```text
Implement Feature
      ↓
Run Backend Tests
      ↓
Test REST API
      ↓
Test Database State
      ↓
Test Smart Contract
      ↓
Verify Blockchain Transaction
      ↓
Test Frontend Integration
```

---

# 📌 Project Status

| Component | Status |
|---|---|
| Actor Management | ✅ Implemented |
| Produce Management | ✅ Implemented |
| Produce Transfers | ✅ Implemented |
| Supply Chain History | ✅ Implemented |
| Ethereum Integration | ✅ Implemented |
| React Frontend | ✅ Implemented |
| QR Verification | 🔄 Planned |
| Journey Map | 🔄 Planned |
| Escrow Payments | 🔄 Planned |
| Predictive Analytics | 🔄 Planned |
| Governance | 🔄 Planned |
| Reputation System | 🔄 Planned |
| Marketplace | 🔄 Planned |

---

# 🤝 Contributing

Contributions and suggestions are welcome.

### Development Process

```bash
git checkout -b feature/your-feature-name
```

Make your changes and run the relevant tests.

Commit your changes:

```bash
git add .
git commit -m "Add meaningful commit message"
```

Push your branch:

```bash
git push origin feature/your-feature-name
```

Then open a Pull Request.

---

# 📜 License

This project is licensed under the **MIT License**.

See the `LICENSE` file for details.

---

# 🙏 Acknowledgements

This project is built using and inspired by:

- Ethereum
- Solidity
- Web3j
- Spring Boot
- React
- Vite
- Hardhat
- Hibernate
- JPA

---

# 👨‍💻 Author
Yash chauhan

**Yash Chauhan**

Building backend systems, distributed applications, and blockchain-based solutions with Java, Spring Boot, and modern infrastructure.
