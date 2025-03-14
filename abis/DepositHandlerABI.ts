export const DepositHandlerABI = [
	{
		type: "constructor",
		inputs: [
			{ name: "_dataStore", type: "address", internalType: "address" },
			{ name: "_depositVault", type: "address", internalType: "address" },
			{ name: "_marketHandler", type: "address", internalType: "address" },
			{ name: "_wnt", type: "address", internalType: "address" },
		],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "cancelDeposit",
		inputs: [{ name: "_key", type: "uint256", internalType: "uint256" }],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "createDeposit",
		inputs: [
			{ name: "_account", type: "address", internalType: "address" },
			{
				name: "_params",
				type: "tuple",
				internalType: "struct DepositHandler.CreateDepositParams",
				components: [
					{ name: "receiver", type: "address", internalType: "address" },
					{ name: "uiFeeReceiver", type: "address", internalType: "address" },
					{ name: "market", type: "address", internalType: "address" },
					{
						name: "initialLongToken",
						type: "address",
						internalType: "address",
					},
					{
						name: "initialShortToken",
						type: "address",
						internalType: "address",
					},
					{ name: "minMarketTokens", type: "uint256", internalType: "uint256" },
					{ name: "executionFee", type: "uint256", internalType: "uint256" },
				],
			},
		],
		outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "dataStore",
		inputs: [],
		outputs: [{ name: "", type: "address", internalType: "address" }],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "depositVault",
		inputs: [],
		outputs: [{ name: "", type: "address", internalType: "address" }],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "executeDeposit",
		inputs: [{ name: "_key", type: "uint256", internalType: "uint256" }],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "marketHandler",
		inputs: [],
		outputs: [{ name: "", type: "address", internalType: "address" }],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "wnt",
		inputs: [],
		outputs: [{ name: "", type: "address", internalType: "address" }],
		stateMutability: "view",
	},
	{
		type: "event",
		name: "DepositCancelled",
		inputs: [
			{ name: "key", type: "uint256", indexed: false, internalType: "uint256" },
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "DepositCreated",
		inputs: [
			{ name: "key", type: "uint256", indexed: false, internalType: "uint256" },
			{
				name: "deposit",
				type: "tuple",
				indexed: false,
				internalType: "struct DepositHandler.Deposit",
				components: [
					{ name: "account", type: "address", internalType: "address" },
					{ name: "receiver", type: "address", internalType: "address" },
					{ name: "uiFeeReceiver", type: "address", internalType: "address" },
					{ name: "marketToken", type: "address", internalType: "address" },
					{
						name: "initialLongToken",
						type: "address",
						internalType: "address",
					},
					{
						name: "initialShortToken",
						type: "address",
						internalType: "address",
					},
					{ name: "executionFee", type: "uint256", internalType: "uint256" },
					{
						name: "initialLongTokenAmount",
						type: "uint256",
						internalType: "uint256",
					},
					{
						name: "initialShortTokenAmount",
						type: "uint256",
						internalType: "uint256",
					},
				],
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "DepositExecuted",
		inputs: [
			{ name: "key", type: "uint256", indexed: false, internalType: "uint256" },
		],
		anonymous: false,
	},
	{ type: "error", name: "InsufficientExecutionFee", inputs: [] },
	{ type: "error", name: "MarketDoesNotExist", inputs: [] },
] as const;
