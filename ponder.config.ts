import dotenv from "dotenv";
import { createConfig, factory } from "ponder";
import { http, parseAbiItem } from "viem";
import { DepositHandlerABI } from "./abis/DepositHandlerABI";
import { MarketFactoryABI } from "./abis/MarketFactoryABI";
import { OrderHandlerABI } from "./abis/OrderHandlerABI";
import { PositionHandlerABI } from "./abis/PositionHandlerABI";
import { MarketHandlerABI } from "./abis/MarketHandlerABI";
import { OracleABI } from "./abis/OracleABI";
import { WithdrawHandlerABI } from "./abis/WithdrawHandlerABI";
import { CuratorABI } from "./abis/CuratorABI";
import { AssetVaultABI } from "./abis/AssetVaultABI";
import { CuratorFactoryABI } from "./abis/CuratorFactoryABI";
import { VaultFactoryABI } from "./abis/VaultFactoryABI";
import { CuratorRegistryABI } from "./abis/CuratorRegistryABI";

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
    WithdrawHandler: {
      network: "monadTestnet",
      abi: WithdrawHandlerABI,
      address: process.env.WITHDRAW_HANDLER_ADDRESS as `0x${string}`,
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
    Curator: {
      network: "monadTestnet",
      abi: CuratorABI,
      address: factory({
        address: process.env.CURATOR_FACTORY_ADDRESS as `0x${string}`,
        event: parseAbiItem("event CuratorContractDeployed(address indexed curator, address indexed curatorContract, string name)"),
        parameter: "curator",
      }),
      startBlock: process.env.STARTED_BLOCK as unknown as number,
    },
    AssetVault: {
      network: "monadTestnet",
      abi: AssetVaultABI,
      address: factory({
        address: process.env.VAULT_FACTORY_ADDRESS as `0x${string}`,
        event: parseAbiItem("event VaultDeployed(address indexed curator, address indexed vault, address indexed asset, string name)"),
        parameter: "vault",
      }),
      startBlock: process.env.STARTED_BLOCK as unknown as number,
    },
    CuratorRegistry: {
      network: "monadTestnet",
      abi: CuratorRegistryABI,
      address: process.env.CURATOR_REGISTRY_ADDRESS as `0x${string}`,
      startBlock: process.env.STARTED_BLOCK as unknown as number,
    },
    CuratorFactory: {
      network: "monadTestnet",
      abi: CuratorFactoryABI,
      address: process.env.CURATOR_FACTORY_ADDRESS as `0x${string}`,
      startBlock: process.env.STARTED_BLOCK as unknown as number,
    },
    VaultFactory: {
      network: "monadTestnet",
      abi: VaultFactoryABI,
      address: process.env.VAULT_FACTORY_ADDRESS as `0x${string}`,
      startBlock: process.env.STARTED_BLOCK as unknown as number,
    },
  },
});
