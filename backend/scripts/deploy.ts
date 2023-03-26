import { ethers } from "hardhat";

async function main() {
  const quorumRequired = 1;
  const Multisig = await ethers.getContractFactory("MultisigWallet");
  const multisig = await Multisig.deploy(
      [PRIVATE_KEY],
      quorumRequired,
  );

  await multisig.deployed();

  console.log(
    `Multisig contract deployed to ${multisig.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
