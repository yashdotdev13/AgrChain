const { expect } = require("chai");
const { ethers } = require("hardhat");

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"; // ethers v6 compatible

describe("AgriChain", function () {
  let agrichain;
  let owner, farmer1, farmer2, distributor1, retailer1, other;

  beforeEach(async function () {
    [owner, farmer1, farmer2, distributor1, retailer1, other] = await ethers.getSigners();

    const AgriChainFactory = await ethers.getContractFactory("AgriChain");
    agrichain = await AgriChainFactory.deploy();
  });

  describe("Registration", function () {
    it("Should register a farmer", async function () {
      await expect(agrichain.connect(farmer1).addFarmer("Alice"))
        .to.emit(agrichain, "FarmerAdded")
        .withArgs(farmer1.address, "Alice");

      const farmer = await agrichain.farmers(farmer1.address);
      expect(farmer.exists).to.be.true;
      expect(farmer.name).to.equal("Alice");
    });

    it("Should register distributor and retailer", async function () {
      await expect(agrichain.connect(distributor1).addDistributor("Distro"))
        .to.emit(agrichain, "DistributorAdded")
        .withArgs(distributor1.address, "Distro");

      await expect(agrichain.connect(retailer1).addRetailer("RetailX"))
        .to.emit(agrichain, "RetailerAdded")
        .withArgs(retailer1.address, "RetailX");

      const distributor = await agrichain.distributors(distributor1.address);
      const retailer = await agrichain.retailers(retailer1.address);
      expect(distributor.exists).to.be.true;
      expect(retailer.exists).to.be.true;
    });
  });

  describe("Produce Management", function () {
    beforeEach(async function () {
      // Register roles
      await agrichain.connect(farmer1).addFarmer("Alice");
      await agrichain.connect(distributor1).addDistributor("Distro");
      await agrichain.connect(retailer1).addRetailer("RetailX");
    });

    it("Should add a produce", async function () {
      await expect(agrichain.connect(farmer1).addProduce("Tomato", "Fresh red", 100))
        .to.emit(agrichain, "ProduceAdded");

      const produce = await agrichain.getProduce(1);
      expect(produce.name).to.equal("Tomato");
      expect(produce.quantity).to.equal(100);
      expect(produce.currentOwner).to.equal(farmer1.address);
      expect(produce.status).to.equal(0); // FARMER
    });

    it("Should add multiple produces", async function () {
      const names = ["Potato", "Carrot"];
      const descs = ["Fresh", "Organic"];
      const qtys = [50, 30];

      await agrichain.connect(farmer1).addMultipleProduces(names, descs, qtys);

      const produce1 = await agrichain.getProduce(1);
      const produce2 = await agrichain.getProduce(2);

      expect(produce1.name).to.equal("Potato");
      expect(produce2.name).to.equal("Carrot");
    });

    it("Should transfer produce Farmer -> Distributor -> Retailer -> Sold", async function () {
      await agrichain.connect(farmer1).addProduce("Tomato", "Fresh", 100);

      // Transfer to Distributor
      await expect(agrichain.connect(farmer1).transferToDistributor(1, distributor1.address))
        .to.emit(agrichain, "ProduceTransferred")
        .withArgs(1, farmer1.address, distributor1.address, 1); // DISTRIBUTOR

      let produce = await agrichain.getProduce(1);
      expect(produce.currentOwner).to.equal(distributor1.address);
      expect(produce.status).to.equal(1);

      // Transfer to Retailer
      await expect(agrichain.connect(distributor1).transferToRetailer(1, retailer1.address))
        .to.emit(agrichain, "ProduceTransferred")
        .withArgs(1, distributor1.address, retailer1.address, 2); // RETAILER

      produce = await agrichain.getProduce(1);
      expect(produce.currentOwner).to.equal(retailer1.address);
      expect(produce.status).to.equal(2);

      // Mark as sold
      await expect(agrichain.connect(retailer1).markAsSold(1))
        .to.emit(agrichain, "ProduceTransferred")
        .withArgs(1, retailer1.address, ZERO_ADDRESS, 3); // SOLD

      produce = await agrichain.getProduce(1);
      expect(produce.status).to.equal(3);
    });

    it("Should track produces per owner", async function () {
      await agrichain.connect(farmer1).addProduce("Tomato", "Fresh", 100);
      await agrichain.connect(farmer1).addProduce("Potato", "Fresh", 50);

      const owned = await agrichain.getProducesByOwner(farmer1.address);
      expect(owned.length).to.equal(2);
      expect(owned[0]).to.equal(1);
      expect(owned[1]).to.equal(2);
    });

    it("Should fail transfer if sender does not own the produce", async function () {
      await agrichain.connect(farmer1).addProduce("Tomato", "Fresh", 100);
      await agrichain.connect(farmer2).addFarmer("Bob"); // Register second farmer

      await expect(
        agrichain.connect(farmer2).transferToDistributor(1, distributor1.address)
      ).to.be.revertedWith("Not owner");
    });
  });
});
