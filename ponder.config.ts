import dotenv from "dotenv";
import { createConfig } from "ponder";
import { http } from "viem";
import { DepositHandlerABI } from "./abis/DepositHandlerABI";
import { MarketFactoryABI } from "./abis/MarketFactoryABI";
import { OrderHandlerABI } from "./abis/OrderHandlerABI";

dotenv.config();

export default createConfig({
  networks: {
    mainnet: {
      chainId: 1,
      transport: http(process.env.PONDER_RPC_URL_1),
    },
    anvil: {
      chainId: 31337,
      transport: http(process.env.PONDER_RPC_URL_2),
    },
    arbitrumSepolia: {
      chainId: 421614,
      transport: http(process.env.PONDER_RPC_URL_3),
    },
    conduit: {
      chainId: 911867,
      transport: http(process.env.PONDER_RPC_URL_4),
    },
    sepolia: {
      chainId: 11155111,
      transport: http(process.env.PONDER_RPC_URL_5),
    },
  },
  contracts: {
    MarketFactory: {
      network: "anvil",
      abi: MarketFactoryABI,
      address: process.env.MARKET_FACTORY_ADDRESS as `0x${string}`,
      startBlock: process.env.STARTED_BLOCK as unknown as number,
    },
    OrderHandler: {
      network: "anvil",
      abi: OrderHandlerABI,
      address: process.env.ORDER_HANDLER_ADDRESS as `0x${string}`,
      startBlock: process.env.STARTED_BLOCK as unknown as number,
    },
    DepositHandler: {
      network: "anvil",
      abi: DepositHandlerABI,
      address: process.env.DEPOSIT_HANDLER_ADDRESS as `0x${string}`,
      startBlock: process.env.STARTED_BLOCK as unknown as number,
    },
  },
});
