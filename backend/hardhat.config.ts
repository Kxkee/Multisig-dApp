import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const PRIVATE_KEY = `${MM_PRIVATE_KEY}`;

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 31337
    },
    sepolia: {
      url: `${SEPOLIA_URL}`,
      accounts: [PRIVATE_KEY],
    }
  }
};

export default config;