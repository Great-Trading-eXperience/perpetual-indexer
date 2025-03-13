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
import { GTXOracleServiceManagerABI } from "./abis/GTXOracleServiceManagerABI";

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
			network: process.env.NETWORK as
				| "mainnet"
				| "anvil"
				| "arbitrumSepolia"
				| "conduit"
				| "sepolia"
				| "riseTestnet"
				| "monadTestnet",
			abi: MarketFactoryABI,
			address: process.env.MARKET_FACTORY_ADDRESS as `0x${string}`,
			startBlock: process.env.STARTED_BLOCK as unknown as number,
		},
		OrderHandler: {
			network: process.env.NETWORK as
				| "mainnet"
				| "anvil"
				| "arbitrumSepolia"
				| "conduit"
				| "sepolia"
				| "riseTestnet"
				| "monadTestnet",
			abi: OrderHandlerABI,
			address: process.env.ORDER_HANDLER_ADDRESS as `0x${string}`,
			startBlock: process.env.STARTED_BLOCK as unknown as number,
		},
		DepositHandler: {
			network: process.env.NETWORK as
				| "mainnet"
				| "anvil"
				| "arbitrumSepolia"
				| "conduit"
				| "sepolia"
				| "riseTestnet"
				| "monadTestnet",
			abi: DepositHandlerABI,
			address: process.env.DEPOSIT_HANDLER_ADDRESS as `0x${string}`,
			startBlock: process.env.STARTED_BLOCK as unknown as number,
		},
		PositionHandler: {
			network: process.env.NETWORK as
				| "mainnet"
				| "anvil"
				| "arbitrumSepolia"
				| "conduit"
				| "sepolia"
				| "riseTestnet"
				| "monadTestnet",
			abi: PositionHandlerABI,
			address: process.env.POSITION_HANDLER_ADDRESS as `0x${string}`,
			startBlock: process.env.STARTED_BLOCK as unknown as number,
		},
		WithdrawHandler: {
			network: process.env.NETWORK as
				| "mainnet"
				| "anvil"
				| "arbitrumSepolia"
				| "conduit"
				| "sepolia"
				| "riseTestnet"
				| "monadTestnet",
			abi: WithdrawHandlerABI,
			address: process.env.WITHDRAW_HANDLER_ADDRESS as `0x${string}`,
			startBlock: process.env.STARTED_BLOCK as unknown as number,
		},
		MarketHandler: {
			network: process.env.NETWORK as
				| "mainnet"
				| "anvil"
				| "arbitrumSepolia"
				| "conduit"
				| "sepolia"
				| "riseTestnet"
				| "monadTestnet",
			abi: MarketHandlerABI,
			address: process.env.MARKET_HANDLER_ADDRESS as `0x${string}`,
			startBlock: process.env.STARTED_BLOCK as unknown as number,
		},
		Oracle: {
			network: process.env.NETWORK as
				| "mainnet"
				| "anvil"
				| "arbitrumSepolia"
				| "conduit"
				| "sepolia"
				| "riseTestnet"
				| "monadTestnet",
			abi: OracleABI,
			address: process.env.ORACLE_ADDRESS as `0x${string}`,
			startBlock: process.env.STARTED_BLOCK as unknown as number,
		},
		Curator: {
			network: process.env.NETWORK as
				| "mainnet"
				| "anvil"
				| "arbitrumSepolia"
				| "conduit"
				| "sepolia"
				| "riseTestnet"
				| "monadTestnet",
			abi: CuratorABI,
			address: factory({
				address: process.env.CURATOR_FACTORY_ADDRESS as `0x${string}`,
				event: parseAbiItem(
					"event CuratorContractDeployed(address indexed curator, address indexed curatorContract, string name)"
				),
				parameter: "curator",
			}),
			startBlock: process.env.STARTED_BLOCK as unknown as number,
		},
		AssetVault: {
			network: process.env.NETWORK as
				| "mainnet"
				| "anvil"
				| "arbitrumSepolia"
				| "conduit"
				| "sepolia"
				| "riseTestnet"
				| "monadTestnet",
			abi: AssetVaultABI,
			address: factory({
				address: process.env.VAULT_FACTORY_ADDRESS as `0x${string}`,
				event: parseAbiItem(
					"event VaultDeployed(address indexed curator, address indexed vault, address indexed asset, string name)"
				),
				parameter: "vault",
			}),
			startBlock: process.env.STARTED_BLOCK as unknown as number,
		},
		CuratorRegistry: {
			network: process.env.NETWORK as
				| "mainnet"
				| "anvil"
				| "arbitrumSepolia"
				| "conduit"
				| "sepolia"
				| "riseTestnet"
				| "monadTestnet",
			abi: CuratorRegistryABI,
			address: process.env.CURATOR_REGISTRY_ADDRESS as `0x${string}`,
			startBlock: process.env.STARTED_BLOCK as unknown as number,
		},
		CuratorFactory: {
			network: process.env.NETWORK as
				| "mainnet"
				| "anvil"
				| "arbitrumSepolia"
				| "conduit"
				| "sepolia"
				| "riseTestnet"
				| "monadTestnet",
			abi: CuratorFactoryABI,
			address: process.env.CURATOR_FACTORY_ADDRESS as `0x${string}`,
			startBlock: process.env.STARTED_BLOCK as unknown as number,
		},
		VaultFactory: {
			network: process.env.NETWORK as
				| "mainnet"
				| "anvil"
				| "arbitrumSepolia"
				| "conduit"
				| "sepolia"
				| "riseTestnet"
				| "monadTestnet",
			abi: VaultFactoryABI,
			address: process.env.VAULT_FACTORY_ADDRESS as `0x${string}`,
			startBlock: process.env.STARTED_BLOCK as unknown as number,
		},
		OracleAVS: {
			network: process.env.NETWORK as
				| "mainnet"
				| "anvil"
				| "arbitrumSepolia"
				| "conduit"
				| "sepolia"
				| "riseTestnet"
				| "monadTestnet",
			abi: GTXOracleServiceManagerABI,
			address: process.env.GTX_ORACLE_SERVICE_MANAGER_ADDRESS as `0x${string}`,
			startBlock: process.env.STARTED_BLOCK as unknown as number,
		},
	},
});
