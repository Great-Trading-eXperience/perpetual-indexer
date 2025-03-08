import dotenv from "dotenv";
import { createConfig } from "ponder";
import { http } from "viem";
import { DepositHandlerABI } from "./abis/DepositHandlerABI";
import { MarketFactoryABI } from "./abis/MarketFactoryABI";
import { OracleABI } from "./abis/OracleABI";
import { OrderHandlerABI } from "./abis/OrderHandlerABI";
import { PositionHandlerABI } from "./abis/PositionHandlerABI";
import { MarketHandlerABI } from "./abis/MarketHandlerABI";

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
    riseTestnet: {
      chainId: 4623992,
      transport: http(process.env.PONDER_RPC_URL_6),
    },
    monadTestnet: {
      chainId: 10143,
      transport: http(process.env.PONDER_RPC_URL_7),
    },
  },
  contracts: {
    MarketFactory: {
      network: "monadTestnet",
      abi: MarketFactoryABI,
      address: process.env.MARKET_FACTORY_ADDRESS as `0x${string}`,
      startBlock: process.env.STARTED_BLOCK as unknown as number,
    },
    OrderHandler: {
      network: "monadTestnet",
      abi: OrderHandlerABI,
      address: process.env.ORDER_HANDLER_ADDRESS as `0x${string}`,
      startBlock: process.env.STARTED_BLOCK as unknown as number,
    },
    DepositHandler: {
      network: "monadTestnet",
      abi: DepositHandlerABI,
      address: process.env.DEPOSIT_HANDLER_ADDRESS as `0x${string}`,
      startBlock: process.env.STARTED_BLOCK as unknown as number,
    },
    PositionHandler: {
      network: "monadTestnet",
      abi: PositionHandlerABI,
      address: process.env.POSITION_HANDLER_ADDRESS as `0x${string}`,
      startBlock: process.env.STARTED_BLOCK as unknown as number,
    },
    MarketHandler: {
      network: "monadTestnet",
      abi: MarketHandlerABI,
      address: process.env.MARKET_HANDLER_ADDRESS as `0x${string}`,
      startBlock: process.env.STARTED_BLOCK as unknown as number,
    },
    Oracle: {
      network: "monadTestnet",
      abi: OracleABI,
      address: process.env.ORACLE_ADDRESS as `0x${string}`,
      startBlock: process.env.STARTED_BLOCK as unknown as number,
    },
  },
});
