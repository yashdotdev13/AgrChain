const { ethers } = require("hardhat");

async function main() {
  const AgriChain = await ethers.getContractFactory("AgriChain");
  const agrichain = await AgriChain.deploy();
  await agrichain.waitForDeployment();
  console.log("AgriChain deployed to:", agrichain.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
