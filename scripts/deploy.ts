import { ethers } from "hardhat";

async function main() {
  const List = await ethers.getContractFactory("List");
  const list = await List.deploy();

  await list.deployed();

  console.log("Deployed to:", list.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
