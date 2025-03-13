export const GTXOracleServiceManagerABI = [
	{
		type: "function",
		name: "allTaskHashes",
		inputs: [{ name: "taskIndex", type: "uint32", internalType: "uint32" }],
		outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "allTaskResponses",
		inputs: [
			{ name: "operator", type: "address", internalType: "address" },
			{ name: "taskIndex", type: "uint32", internalType: "uint32" },
		],
		outputs: [{ name: "", type: "bytes", internalType: "bytes" }],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "getPrice",
		inputs: [
			{
				name: "_tokenAddress",
				type: "address",
				internalType: "address",
			},
		],
		outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "getSources",
		inputs: [
			{
				name: "_tokenAddress",
				type: "address",
				internalType: "address",
			},
		],
		outputs: [
			{
				name: "",
				type: "tuple[]",
				internalType: "struct IGTXOracleServiceManager.Source[]",
				components: [
					{ name: "name", type: "string", internalType: "string" },
					{
						name: "identifier",
						type: "string",
						internalType: "string",
					},
					{ name: "network", type: "string", internalType: "string" },
				],
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "initialize",
		inputs: [
			{
				name: "_marketFactory",
				type: "address",
				internalType: "address",
			},
			{
				name: "_minBlockInterval",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "_maxBlockInterval",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "latestTaskNum",
		inputs: [],
		outputs: [{ name: "", type: "uint32", internalType: "uint32" }],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "requestNewOracleTask",
		inputs: [
			{
				name: "_tokenAddress",
				type: "address",
				internalType: "address",
			},
			{
				name: "_tokenAddress2",
				type: "address",
				internalType: "address",
			},
			{ name: "_tokenPair", type: "string", internalType: "string" },
			{
				name: "_sources",
				type: "tuple[]",
				internalType: "struct IGTXOracleServiceManager.Source[]",
				components: [
					{ name: "name", type: "string", internalType: "string" },
					{
						name: "identifier",
						type: "string",
						internalType: "string",
					},
					{ name: "network", type: "string", internalType: "string" },
				],
			},
		],
		outputs: [{ name: "taskIndex", type: "uint32", internalType: "uint32" }],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "requestOraclePriceTask",
		inputs: [
			{
				name: "_tokenAddress",
				type: "address",
				internalType: "address",
			},
		],
		outputs: [{ name: "taskIndex", type: "uint32", internalType: "uint32" }],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "respondToOracleTask",
		inputs: [
			{
				name: "task",
				type: "tuple",
				internalType: "struct IGTXOracleServiceManager.OracleTask",
				components: [
					{
						name: "tokenAddress",
						type: "address",
						internalType: "address",
					},
					{
						name: "tokenAddress2",
						type: "address",
						internalType: "address",
					},
					{
						name: "taskCreatedBlock",
						type: "uint32",
						internalType: "uint32",
					},
					{ name: "isNewData", type: "bool", internalType: "bool" },
					{ name: "tokenPair", type: "string", internalType: "string" },
					{
						name: "sources",
						type: "tuple[]",
						internalType: "struct IGTXOracleServiceManager.Source[]",
						components: [
							{ name: "name", type: "string", internalType: "string" },
							{
								name: "identifier",
								type: "string",
								internalType: "string",
							},
							{
								name: "network",
								type: "string",
								internalType: "string",
							},
						],
					},
				],
			},
			{ name: "price", type: "uint256", internalType: "uint256" },
			{
				name: "referenceTaskIndex",
				type: "uint32",
				internalType: "uint32",
			},
			{ name: "signature", type: "bytes", internalType: "bytes" },
			{
				name: "proof",
				type: "tuple",
				internalType: "struct Reclaim.Proof",
				components: [
					{
						name: "claimInfo",
						type: "tuple",
						internalType: "struct Claims.ClaimInfo",
						components: [
							{
								name: "provider",
								type: "string",
								internalType: "string",
							},
							{
								name: "parameters",
								type: "string",
								internalType: "string",
							},
							{
								name: "context",
								type: "string",
								internalType: "string",
							},
						],
					},
					{
						name: "signedClaim",
						type: "tuple",
						internalType: "struct Claims.SignedClaim",
						components: [
							{
								name: "claim",
								type: "tuple",
								internalType: "struct Claims.CompleteClaimData",
								components: [
									{
										name: "identifier",
										type: "bytes32",
										internalType: "bytes32",
									},
									{
										name: "owner",
										type: "address",
										internalType: "address",
									},
									{
										name: "timestampS",
										type: "uint32",
										internalType: "uint32",
									},
									{
										name: "epoch",
										type: "uint32",
										internalType: "uint32",
									},
								],
							},
							{
								name: "signatures",
								type: "bytes[]",
								internalType: "bytes[]",
							},
						],
					},
				],
			},
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "event",
		name: "Initialize",
		inputs: [
			{
				name: "marketFactory",
				type: "address",
				indexed: false,
				internalType: "address",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "NewOracleTaskCreated",
		inputs: [
			{
				name: "taskIndex",
				type: "uint32",
				indexed: true,
				internalType: "uint32",
			},
			{
				name: "task",
				type: "tuple",
				indexed: false,
				internalType: "struct IGTXOracleServiceManager.OracleTask",
				components: [
					{
						name: "tokenAddress",
						type: "address",
						internalType: "address",
					},
					{
						name: "tokenAddress2",
						type: "address",
						internalType: "address",
					},
					{
						name: "taskCreatedBlock",
						type: "uint32",
						internalType: "uint32",
					},
					{ name: "isNewData", type: "bool", internalType: "bool" },
					{ name: "tokenPair", type: "string", internalType: "string" },
					{
						name: "sources",
						type: "tuple[]",
						internalType: "struct IGTXOracleServiceManager.Source[]",
						components: [
							{ name: "name", type: "string", internalType: "string" },
							{
								name: "identifier",
								type: "string",
								internalType: "string",
							},
							{
								name: "network",
								type: "string",
								internalType: "string",
							},
						],
					},
				],
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "OraclePriceUpdated",
		inputs: [
			{
				name: "tokenAddress",
				type: "address",
				indexed: true,
				internalType: "address",
			},
			{
				name: "tokenPair",
				type: "string",
				indexed: true,
				internalType: "string",
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
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "OracleSourceCreated",
		inputs: [
			{
				name: "tokenAddress",
				type: "address",
				indexed: true,
				internalType: "address",
			},
			{
				name: "tokenPair",
				type: "string",
				indexed: true,
				internalType: "string",
			},
			{
				name: "sources",
				type: "tuple[]",
				indexed: false,
				internalType: "struct IGTXOracleServiceManager.Source[]",
				components: [
					{ name: "name", type: "string", internalType: "string" },
					{
						name: "identifier",
						type: "string",
						internalType: "string",
					},
					{ name: "network", type: "string", internalType: "string" },
				],
			},
			{
				name: "operator",
				type: "address",
				indexed: false,
				internalType: "address",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "OracleTaskResponded",
		inputs: [
			{
				name: "taskIndex",
				type: "uint32",
				indexed: true,
				internalType: "uint32",
			},
			{
				name: "task",
				type: "tuple",
				indexed: false,
				internalType: "struct IGTXOracleServiceManager.OracleTask",
				components: [
					{
						name: "tokenAddress",
						type: "address",
						internalType: "address",
					},
					{
						name: "tokenAddress2",
						type: "address",
						internalType: "address",
					},
					{
						name: "taskCreatedBlock",
						type: "uint32",
						internalType: "uint32",
					},
					{ name: "isNewData", type: "bool", internalType: "bool" },
					{ name: "tokenPair", type: "string", internalType: "string" },
					{
						name: "sources",
						type: "tuple[]",
						internalType: "struct IGTXOracleServiceManager.Source[]",
						components: [
							{ name: "name", type: "string", internalType: "string" },
							{
								name: "identifier",
								type: "string",
								internalType: "string",
							},
							{
								name: "network",
								type: "string",
								internalType: "string",
							},
						],
					},
				],
			},
			{
				name: "operator",
				type: "address",
				indexed: false,
				internalType: "address",
			},
			{
				name: "signature",
				type: "bytes",
				indexed: false,
				internalType: "bytes",
			},
		],
		anonymous: false,
	},
	{
		type: "error",
		name: "BlockIntervalInvalid",
		inputs: [
			{ name: "id", type: "uint256", internalType: "uint256" },
			{ name: "blockNumber", type: "uint256", internalType: "uint256" },
			{
				name: "previousBlockNumber",
				type: "uint256",
				internalType: "uint256",
			},
		],
	},
	{ type: "error", name: "InvalidClaimOwner", inputs: [] },
	{ type: "error", name: "InvalidPrice", inputs: [] },
	{ type: "error", name: "InvalidSignature", inputs: [] },
	{ type: "error", name: "InvalidToken", inputs: [] },
	{
		type: "error",
		name: "OperatorAlreadyResponded",
		inputs: [
			{ name: "id", type: "uint256", internalType: "uint256" },
			{ name: "operator", type: "address", internalType: "address" },
		],
	},
	{ type: "error", name: "PriceDeviationTooLarge", inputs: [] },
	{
		type: "error",
		name: "SourcesAlreadyExist",
		inputs: [{ name: "token", type: "address", internalType: "address" }],
	},
	{
		type: "error",
		name: "SourcesEmpty",
		inputs: [{ name: "token", type: "address", internalType: "address" }],
	},
	{ type: "error", name: "StalePrice", inputs: [] },
	{ type: "error", name: "SuppliedTaskMismatch", inputs: [] },
] as const;
