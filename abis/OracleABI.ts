export const OracleABI = [
	{
		type: "constructor",
		inputs: [
			{ name: "_minBlockInterval", type: "uint256", internalType: "uint256" },
			{ name: "_maxBlockInterval", type: "uint256", internalType: "uint256" },
		],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "MAX_PRICE_DEVIATION",
		inputs: [],
		outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "PRICE_PRECISION",
		inputs: [],
		outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "SCALING_FACTOR",
		inputs: [],
		outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "getPrice",
		inputs: [{ name: "token", type: "address", internalType: "address" }],
		outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "maxBlockInterval",
		inputs: [],
		outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "maxPriceAge",
		inputs: [{ name: "", type: "address", internalType: "address" }],
		outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "minBlockInterval",
		inputs: [],
		outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "minSigners",
		inputs: [{ name: "", type: "address", internalType: "address" }],
		outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "owner",
		inputs: [],
		outputs: [{ name: "", type: "address", internalType: "address" }],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "prices",
		inputs: [{ name: "", type: "address", internalType: "address" }],
		outputs: [
			{ name: "value", type: "uint256", internalType: "uint256" },
			{ name: "timestamp", type: "uint256", internalType: "uint256" },
			{ name: "blockNumber", type: "uint256", internalType: "uint256" },
			{ name: "minBlockInterval", type: "uint256", internalType: "uint256" },
			{ name: "maxBlockInterval", type: "uint256", internalType: "uint256" },
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "renounceOwnership",
		inputs: [],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "setMaxPriceAge",
		inputs: [
			{ name: "token", type: "address", internalType: "address" },
			{ name: "_maxAge", type: "uint256", internalType: "uint256" },
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "setMinSigners",
		inputs: [
			{ name: "token", type: "address", internalType: "address" },
			{ name: "_minSigners", type: "uint256", internalType: "uint256" },
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "setPrices",
		inputs: [
			{ name: "tokens", type: "address[]", internalType: "address[]" },
			{
				name: "signedPrices",
				type: "tuple[]",
				internalType: "struct Oracle.SignedPrice[]",
				components: [
					{ name: "price", type: "uint256", internalType: "uint256" },
					{ name: "timestamp", type: "uint256", internalType: "uint256" },
					{ name: "blockNumber", type: "uint256", internalType: "uint256" },
					{ name: "signature", type: "bytes", internalType: "bytes" },
				],
			},
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "setSigner",
		inputs: [
			{ name: "token", type: "address", internalType: "address" },
			{ name: "signer", type: "address", internalType: "address" },
			{ name: "isActive", type: "bool", internalType: "bool" },
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "signers",
		inputs: [
			{ name: "", type: "address", internalType: "address" },
			{ name: "", type: "address", internalType: "address" },
		],
		outputs: [{ name: "", type: "bool", internalType: "bool" }],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "transferOwnership",
		inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "event",
		name: "MinSignersUpdate",
		inputs: [
			{
				name: "token",
				type: "address",
				indexed: false,
				internalType: "address",
			},
			{
				name: "minSigners",
				type: "uint256",
				indexed: false,
				internalType: "uint256",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "OwnershipTransferred",
		inputs: [
			{
				name: "previousOwner",
				type: "address",
				indexed: true,
				internalType: "address",
			},
			{
				name: "newOwner",
				type: "address",
				indexed: true,
				internalType: "address",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "PriceUpdate",
		inputs: [
			{
				name: "token",
				type: "address",
				indexed: false,
				internalType: "address",
			},
			{
				name: "price",
				type: "uint256",
				indexed: false,
				internalType: "uint256",
			},
			{
				name: "timestamp",
				type: "uint256",
				indexed: false,
				internalType: "uint256",
			},
			{
				name: "blockNumber",
				type: "uint256",
				indexed: false,
				internalType: "uint256",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "SignerUpdate",
		inputs: [
			{
				name: "token",
				type: "address",
				indexed: false,
				internalType: "address",
			},
			{
				name: "signer",
				type: "address",
				indexed: false,
				internalType: "address",
			},
			{ name: "isActive", type: "bool", indexed: false, internalType: "bool" },
		],
		anonymous: false,
	},
	{
		type: "error",
		name: "BlockIntervalInvalid",
		inputs: [
			{ name: "id", type: "uint256", internalType: "uint256" },
			{ name: "blockNumber", type: "uint256", internalType: "uint256" },
			{ name: "previousBlockNumber", type: "uint256", internalType: "uint256" },
		],
	},
	{ type: "error", name: "InsufficientSigners", inputs: [] },
	{ type: "error", name: "InvalidPrice", inputs: [] },
	{ type: "error", name: "InvalidSignature", inputs: [] },
	{ type: "error", name: "InvalidSigner", inputs: [] },
	{
		type: "error",
		name: "OwnableInvalidOwner",
		inputs: [{ name: "owner", type: "address", internalType: "address" }],
	},
	{
		type: "error",
		name: "OwnableUnauthorizedAccount",
		inputs: [{ name: "account", type: "address", internalType: "address" }],
	},
	{ type: "error", name: "PriceDeviationTooLarge", inputs: [] },
	{ type: "error", name: "ReentrancyGuardReentrantCall", inputs: [] },
	{
		type: "error",
		name: "StalePrice",
		inputs: [
			{ name: "timestamp", type: "uint256", internalType: "uint256" },
			{ name: "priceTimestamp", type: "uint256", internalType: "uint256" },
			{ name: "maxPriceAge", type: "uint256", internalType: "uint256" },
		],
	},
] as const;
