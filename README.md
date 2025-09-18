# 🌾 Decentralized AgriChain  

A **blockchain-powered supply chain platform** to track agricultural produce from farm to consumer.  
It ensures **transparency**, **fair pricing**, and **traceability** by recording every transaction on-chain.  

---

## 🚀 Features  

### ✅ Current Features  
- **Actors Management**: Farmers, Distributors, Retailers (with location details).  
- **Produce Management**: Add produce with quantity, owner, and description.  
- **Produce Transfer**: Transfer produce between actors with status, reason, comments.  
- **History Tracking**: Store produce history (from actor → to actor) with timestamp & location.  
- **Blockchain Integration**: All key operations recorded on Ethereum smart contracts.  

### 📝 Future Features  
- QR code on produce for consumer verification.  
- Visual journey map of produce (geolocation-based tracking).  
- Automated escrow payments & smart contract-based settlement.  
- Predictive analytics for crop demand & pricing.  
- Stakeholder voting & decentralized governance.  
- Loyalty/reputation system for actors.  
- Integrated direct marketplace for verified produce.  

---

## 🛠️ Tech Stack  

| Layer            | Technology                  |
|-----------------|---------------------------|
| **Frontend**     | React + Vite (JavaScript) |
| **Backend**      | Spring Boot (Java, REST APIs) |
| **Blockchain**   | Ethereum (Solidity Smart Contracts, Web3j integration) |
| **Database**     | MySQL / PostgreSQL (JPA/Hibernate) |
| **Others**       | Lombok, ModelMapper, Web3j |


## 📂 Project Structure  
---
AgriChain/
│
├── backend/ # Spring Boot backend
│ ├── src/main/java/com/company/Decentralized_AgriChain_backend
│ │ ├── controllers/ # REST controllers
│ │ ├── services/ # Business logic
│ │ ├── dtos/ # Data Transfer Objects
│ │ ├── entities/ # JPA Entities
│ │ └── repositories/ # Data access layer
│ ├── pom.xml
│
├── frontend/ # React + Vite frontend
│ ├── src/
│ ├── package.json
│
└── smart-contracts/ # Solidity smart contracts
└── contracts/



---

## ⚙️ Installation & Setup  

### Clone the Repository  
git clone https://github.com/98001yash/AgriChain.git
cd agrichain


2️⃣ Backend Setup (Spring Boot)
cd backend
mvn clean install
mvn spring-boot:run


3️⃣ Frontend Setup (React + Vite)
cd frontend
npm install
npm run dev


4️⃣ Smart Contracts

Navigate to smart-contracts/
Compile and deploy using Hardhat/Remix to your testnet.
Update contract address in the backend config.


🗺️ Architecture Diagram
Farmer/Distributor/Retailer  →  Frontend (React)  
         ↓ REST API  
       Backend (Spring Boot)  
         ↓ Web3j  
     Ethereum Smart Contract  
         ↓ Blockchain  
 Consumer scans QR → sees full history  


📜 License
This project is licensed under the MIT License.

🤝 Acknowledgements
Ethereum & Web3j for blockchain integration.
Spring Boot for backend services.
React + Vite for frontend.
Hardhat for smart contract compilation.








