import dotenv from "dotenv";
import { createConfig } from "ponder";
import baseConfig from "./ponder.config";

dotenv.config();

const { networks: baseNetworks, contracts } = baseConfig;

const networks = {
  ...baseNetworks,
  monadTestnet: {
    ...baseNetworks.monadTestnet,
    pollingInterval: 2000,
    maxRequestsPerSecond: 25,
  },
};

export default createConfig({
  networks,
  contracts,
  database: {
    kind: "postgres",
    connectionString: process.env.PONDER_DATABASE_URL!,
  },
});