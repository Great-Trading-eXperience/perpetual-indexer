import { ponder } from "ponder:registry";
import {
	allocation,
	assetVault,
	curator,
	curatorVaultDeposit,
	curatorVaultWithdrawal,
	deposit,
	fundingFee,
	liquidation,
	market,
	openInterest,
	order,
	position,
	size,
	price as tokenPrice,
	source as sourcePrice,
} from "ponder:schema";

ponder.on("MarketFactory:MarketCreated", async ({ event, context }) => {
	await context.db.insert(market).values({
		id: event.args.marketToken,
		name: event.args.marketName,
		longToken: event.args.longToken,
		shortToken: event.args.shortToken,
		marketToken: event.args.marketToken,
		timestamp: Number(event.block.timestamp),
		blockNumber: Number(event.block.number),
		transactionHash: event.transaction.hash,
	});
});

ponder.on("MarketFactory:MarketActivation", async ({ event, context }) => {
	await context.db
		.insert(market)
		.values({
			id: event.args.marketToken,
			isActive: event.args.status === 1,
		})
		.onConflictDoUpdate({
			isActive: event.args.status === 1,
		});
});

ponder.on("DepositHandler:DepositCreated", async ({ event, context }) => {
	const depositData = event.args.deposit;

	await context.db.insert(deposit).values({
		id: event.args.key.toString(),
		key: event.args.key.toString(),
		account: depositData.account,
		receiver: depositData.receiver,
		uiFeeReceiver: depositData.uiFeeReceiver,
		marketToken: depositData.marketToken,
		initialLongToken: depositData.initialLongToken,
		initialShortToken: depositData.initialShortToken,
		executionFee: depositData.executionFee.toString(),
		initialLongTokenAmount: depositData.initialLongTokenAmount.toString(),
		initialShortTokenAmount: depositData.initialShortTokenAmount.toString(),
		timestamp: Number(event.block.timestamp),
		blockNumber: Number(event.block.number),
		transactionHash: event.transaction.hash,
	});
});

ponder.on("DepositHandler:DepositExecuted", async ({ event, context }) => {
	const existingDeposit = await context.db.find(deposit, {
		id: event.args.key.toString(),
	});

	if (!existingDeposit) {
		return;
	}

	await context.db
		.insert(deposit)
		.values({
			id: existingDeposit.id,
			key: existingDeposit.key,
			account: existingDeposit.account,
			receiver: existingDeposit.receiver,
			uiFeeReceiver: existingDeposit.uiFeeReceiver,
			marketToken: existingDeposit.marketToken,
			initialLongToken: existingDeposit.initialLongToken,
			initialShortToken: existingDeposit.initialShortToken,
			executionFee: existingDeposit.executionFee?.toString(),
			initialLongTokenAmount:
				existingDeposit.initialLongTokenAmount?.toString(),
			initialShortTokenAmount:
				existingDeposit.initialShortTokenAmount?.toString(),
			isExecuted: true,
			updatedAtTime: Number(event.block.timestamp),
		})
		.onConflictDoUpdate({
			isExecuted: true,
			updatedAtTime: Number(event.block.timestamp),
		});
});

ponder.on("DepositHandler:DepositCancelled", async ({ event, context }) => {
	const existingDeposit = await context.db.find(deposit, {
		id: event.args.key.toString(),
	});

	if (!existingDeposit) {
		return;
	}

	await context.db
		.insert(deposit)
		.values({
			id: existingDeposit.id,
			key: event.args.key.toString(),
			account: existingDeposit.account,
			receiver: existingDeposit.receiver,
			uiFeeReceiver: existingDeposit.uiFeeReceiver,
			marketToken: existingDeposit.marketToken,
			initialLongToken: existingDeposit.initialLongToken,
			initialShortToken: existingDeposit.initialShortToken,
			executionFee: existingDeposit.executionFee?.toString(),
			initialLongTokenAmount:
				existingDeposit.initialLongTokenAmount?.toString(),
			initialShortTokenAmount:
				existingDeposit.initialShortTokenAmount?.toString(),
			isCancelled: true,
			updatedAtTime: Number(event.block.timestamp),
		})
		.onConflictDoUpdate({
			isCancelled: true,
			updatedAtTime: Number(event.block.timestamp),
		});
});

ponder.on("OrderHandler:OrderCreated", async ({ event, context }) => {
	await context.db.insert(order).values({
		id: event.args.key.toString(),
		key: Number(event.args.key),
		account: event.args.account,
		receiver: event.args.receiver,
		cancellationReceiver: event.args.cancellationReceiver,
		callbackContract: event.args.callbackContract,
		uiFeeReceiver: event.args.uiFeeReceiver,
		marketToken: event.args.marketToken,
		initialCollateralToken: event.args.initialCollateralToken,
		orderType: Number(event.args.orderType),
		sizeDeltaUsd: event.args.sizeDeltaUsd.toString(),
		initialCollateralDeltaAmount:
			event.args.initialCollateralDeltaAmount.toString(),
		triggerPrice: event.args.triggerPrice.toString(),
		acceptablePrice: event.args.acceptablePrice.toString(),
		executionFee: event.args.executionFee.toString(),
		updatedAtTime: Number(event.args.updatedAtTime),
		validFromTime: Number(event.args.validFromTime),
		isLong: event.args.isLong,
		isFrozen: event.args.isFrozen,
		timestamp: Number(event.block.timestamp),
		blockNumber: Number(event.block.number),
		transactionHash: event.transaction.hash,
	});
});

ponder.on("OrderHandler:OrderCancelled", async ({ event, context }) => {
	const existingOrder = await context.db.find(order, {
		id: event.args.key.toString(),
	});

	if (!existingOrder) {
		return;
	}

	await context.db
		.insert(order)
		.values({
			id: existingOrder.id,
			isCancelled: true,
			updatedAtTime: Number(event.block.timestamp),
		})
		.onConflictDoUpdate({
			isCancelled: true,
			updatedAtTime: Number(event.block.timestamp),
		});
});

ponder.on("OrderHandler:OrderProcessed", async ({ event, context }) => {
	const existingOrder = await context.db.find(order, {
		id: event.args.key.toString(),
	});

	if (!existingOrder) {
		return;
	}

	await context.db
		.insert(order)
		.values({
			id: existingOrder.id,
			isExecuted: true,
			updatedAtTime: Number(event.block.timestamp),
		})
		.onConflictDoUpdate({
			isExecuted: true,
			updatedAtTime: Number(event.block.timestamp),
		});
});

ponder.on("PositionHandler:PositionIncreased", async ({ event, context }) => {
	const price = Number(event.args.sizeInUsd) / Number(event.args.sizeInTokens);

	const existingSize = await context.db.find(size, {
		id: `${event.args.market}-${price.toString()}`,
	});

	await context.db
		.insert(size)
		.values({
			id: `${event.args.market}-${price.toString()}`,
			marketToken: event.args.market,
			price: price.toString(),
			size: existingSize
				? (Number(existingSize.size) + Number(event.args.sizeInUsd)).toString()
				: event.args.sizeInUsd.toString(),
			timestamp: Number(event.block.timestamp),
			blockNumber: Number(event.block.number),
			transactionHash: event.transaction.hash,
		})
		.onConflictDoUpdate({
			price: price.toString(),
			size: existingSize
				? (Number(existingSize.size) + Number(event.args.sizeInUsd)).toString()
				: event.args.sizeInUsd.toString(),
			timestamp: Number(event.block.timestamp),
		});

	await context.db
		.insert(position)
		.values({
			id: event.args.positionKey.toString(),
			key: event.args.positionKey.toString(),
			account: event.args.account,
			marketToken: event.args.market,
			isLong: event.args.isLong,
			collateralToken: event.args.collateralToken,
			sizeInTokens: event.args.sizeInTokens.toString(),
			sizeInUsd: event.args.sizeInUsd.toString(),
			collateralAmount: event.args.collateralAmount.toString(),
			cumulativeFundingFee: event.args.cumulativeFundingFee.toString(),
			cumulativeBorrowingFee: event.args.cumulativeBorrowingFee.toString(),
			increasedAtTime: Number(event.args.increasedAtTime),
			timestamp: Number(event.block.timestamp),
			blockNumber: Number(event.block.number),
			transactionHash: event.transaction.hash,
		})
		.onConflictDoUpdate({
			sizeInTokens: event.args.sizeInTokens.toString(),
			sizeInUsd: event.args.sizeInUsd.toString(),
			collateralAmount: event.args.collateralAmount.toString(),
			increasedAtTime: Number(event.args.increasedAtTime),
			timestamp: Number(event.block.timestamp),
		});
});

ponder.on("PositionHandler:PositionDecreased", async ({ event, context }) => {
	const price = Number(event.args.sizeInUsd) / Number(event.args.sizeInTokens);

	const existingSize = await context.db.find(size, {
		id: `${event.args.market}-${price.toString()}`,
	});

	await context.db
		.insert(size)
		.values({
			id: `${event.args.market}-${price.toString()}`,
			marketToken: event.args.market,
			price: price.toString(),
			size: existingSize
				? (Number(existingSize.size) - Number(event.args.sizeInUsd)).toString()
				: event.args.sizeInUsd.toString(),
			timestamp: Number(event.block.timestamp),
			blockNumber: Number(event.block.number),
			transactionHash: event.transaction.hash,
		})
		.onConflictDoUpdate({
			price: price.toString(),
			size: existingSize
				? (Number(existingSize.size) - Number(event.args.sizeInUsd)).toString()
				: event.args.sizeInUsd.toString(),
			timestamp: Number(event.block.timestamp),
		});

	await context.db
		.insert(position)
		.values({
			id: event.args.positionKey.toString(),
			key: event.args.positionKey.toString(),
			account: event.args.account,
			marketToken: event.args.market,
			isLong: event.args.isLong,
			collateralToken: event.args.collateralToken,
			sizeInTokens: event.args.sizeInTokens.toString(),
			sizeInUsd: event.args.sizeInUsd.toString(),
			collateralAmount: event.args.collateralAmount.toString(),
			decreasedAtTime: Number(event.args.decreasedAtTime),
			timestamp: Number(event.block.timestamp),
			blockNumber: Number(event.block.number),
			transactionHash: event.transaction.hash,
		})
		.onConflictDoUpdate({
			sizeInTokens: event.args.sizeInTokens.toString(),
			sizeInUsd: event.args.sizeInUsd.toString(),
			collateralAmount: event.args.collateralAmount.toString(),
			decreasedAtTime: Number(event.args.decreasedAtTime),
			timestamp: Number(event.block.timestamp),
		});
});

ponder.on("PositionHandler:PositionLiquidated", async ({ event, context }) => {
	const existingPosition = await context.db.find(position, {
		id: event.args.positionKey.toString(),
	});

	if (!existingPosition) {
		return;
	}

	await context.db
		.insert(position)
		.values({
			id: existingPosition.id,
			liquidatedAtTime: Number(event.block.timestamp),
		})
		.onConflictDoUpdate({
			liquidatedAtTime: Number(event.block.timestamp),
		});

	await context.db
		.insert(liquidation)
		.values({
			id: `${event.block.number}-${event.transaction.hash}`,
			key: event.args.positionKey.toString(),
			account: event.args.account,
			marketToken: event.args.market,
			collateralToken: event.args.collateralToken,
			collateralAmount: event.args.collateralAmount.toString(),
			liquidationFee: event.args.liquidationFee.toString(),
			liquidationPrice: event.args.liquidationPrice.toString(),
			liquidator: event.args.liquidator,
			timestamp: Number(event.block.timestamp),
			blockNumber: Number(event.block.number),
			transactionHash: event.transaction.hash,
		})
		.onConflictDoUpdate({
			collateralAmount: event.args.collateralAmount.toString(),
			liquidationFee: event.args.liquidationFee.toString(),
			liquidationPrice: event.args.liquidationPrice.toString(),
			liquidator: event.args.liquidator,
			timestamp: Number(event.block.timestamp),
		});
});

ponder.on("Oracle:PriceUpdate", async ({ event, context }) => {
	const price = event.args.price;
	const token = event.args.token;

	await context.db
		.insert(tokenPrice)
		.values({
			id: token,
			token,
			price: price.toString(),
			timestamp: Number(event.block.timestamp),
			blockNumber: Number(event.block.number),
			transactionHash: event.transaction.hash,
		})
		.onConflictDoUpdate({
			token,
			price: price.toString(),
			timestamp: Number(event.block.timestamp),
		});
});

ponder.on("OracleAVS:OraclePriceUpdated", async ({ event, context }) => {
	const price = event.args.price;
	const token = event.args.tokenAddress;

	await context.db
		.insert(tokenPrice)
		.values({
			id: token,
			token,
			name: event.args.tokenPair,
			price: price.toString(),
			timestamp: Number(event.block.timestamp),
			blockNumber: Number(event.block.number),
			transactionHash: event.transaction.hash,
		})
		.onConflictDoUpdate({
			token,
			price: price.toString(),
			timestamp: Number(event.block.timestamp),
		});
});

ponder.on("OracleAVS:OracleSourceCreated", async ({ event, context }) => {
	const sources = event.args.sources;
	const token = event.args.tokenAddress;

	for (const source of sources) {
		const value = {
			id: `${token}-${source.name}`,
			priceId: token,
			...source,
		};
		await context.db.insert(sourcePrice).values(value).onConflictDoNothing();
	}
});

ponder.on("MarketHandler:OpenInterestSet", async ({ event, context }) => {
	await context.db.insert(openInterest).values({
		id: `${event.block.number}-${event.transaction.hash}`,
		market: event.args.market,
		token: event.args.token,
		openInterest: event.args.amount.toString(),
		timestamp: Number(event.block.timestamp),
	});
});

ponder.on("MarketHandler:FundingFeeSet", async ({ event, context }) => {
	await context.db.insert(fundingFee).values({
		id: `${event.block.number}-${event.transaction.hash}`,
		market: event.args.market,
		fundingFee: event.args.amount.toString(),
		timestamp: Number(event.block.timestamp),
	});
});

ponder.on("CuratorRegistry:CuratorAdded", async ({ event, context }) => {
	await context.db.insert(curator).values({
		id: event.args.curatorAddress,
		name: event.args.name,
		timestamp: Number(event.block.timestamp),
	});
});

ponder.on(
	"CuratorFactory:CuratorContractDeployed",
	async ({ event, context }) => {
		await context.db
			.insert(curator)
			.values({
				id: event.args.curatorContract,
				curator: event.args.curator,
				name: event.args.name ?? "-",
				contractAddress: event.args.curatorContract,
				timestamp: Number(event.block.timestamp),
			})
			.onConflictDoUpdate({
				name: event.args.name,
				contractAddress: event.args.curatorContract,
				timestamp: Number(event.block.timestamp),
			});
	}
);

ponder.on("VaultFactory:VaultDeployed", async ({ event, context }) => {
	await context.db.insert(assetVault).values({
		id: event.args.vault,
		curator: event.args.curator,
		asset: event.args.asset,
		name: event.args.name,
		timestamp: Number(event.block.timestamp),
	});
});

ponder.on("AssetVault:MarketAdded", async ({ event, context }) => {
	await context.db
		.insert(allocation)
		.values({
			id: `${event.block.number}-${event.transaction.hash}`,
			assetVault: event.log.address,
			marketToken: event.args.market,
			allocation: event.args.allocationPercentage.toString(),
			curator: event.transaction.from,
			timestamp: Number(event.block.timestamp),
			transactionHash: event.transaction.hash,
		})
		.onConflictDoUpdate({
			assetVault: event.log.address,
			allocation: event.args.allocationPercentage.toString(),
			curator: event.transaction.from,
			timestamp: Number(event.block.timestamp),
		});
});

ponder.on("AssetVault:MarketUpdated", async ({ event, context }) => {
	await context.db
		.insert(allocation)
		.values({
			id: `${event.block.number}-${event.transaction.hash}`,
			assetVault: event.log.address,
			marketToken: event.args.market,
			allocation: event.args.allocationPercentage.toString(),
			curator: event.transaction.from,
			timestamp: Number(event.block.timestamp),
		})
		.onConflictDoUpdate({
			allocation: event.args.allocationPercentage.toString(),
			timestamp: Number(event.block.timestamp),
		});
});

ponder.on("AssetVault:Deposit", async ({ event, context }) => {
	const assetVaultData = await context.db.find(assetVault, {
		id: event.transaction.to as string,
	});

	if (!assetVaultData) {
		return;
	}

	const tvl = Number(assetVaultData.tvl) + Number(event.args.assets);

	await context.db
		.insert(assetVault)
		.values({
			id: assetVaultData.id,
			tvl: tvl.toString(),
			timestamp: Number(event.block.timestamp),
		})
		.onConflictDoUpdate({
			tvl: tvl.toString(),
			timestamp: Number(event.block.timestamp),
		});

	await context.db.insert(curatorVaultDeposit).values({
		id: `${event.block.number}-${event.transaction.hash}`,
		assetVault: event.transaction.to,
		amount: event.args.assets.toString(),
		shares: event.args.shares.toString(),
		user: event.args.user,
		timestamp: Number(event.block.timestamp),
		blockNumber: Number(event.block.number),
		transactionHash: event.transaction.hash,
	});
});

ponder.on("AssetVault:Withdraw", async ({ event, context }) => {
	const assetVaultData = await context.db.find(assetVault, {
		id: event.transaction.to as string,
	});

	if (!assetVaultData) {
		return;
	}

	const tvl = Number(assetVaultData.tvl) - Number(event.args.assets);

	await context.db
		.insert(assetVault)
		.values({
			id: assetVaultData.id,
			tvl: tvl.toString(),
			timestamp: Number(event.block.timestamp),
		})
		.onConflictDoUpdate({
			tvl: tvl.toString(),
			timestamp: Number(event.block.timestamp),
		});

	await context.db.insert(curatorVaultWithdrawal).values({
		id: `${event.block.number}-${event.transaction.hash}`,
		assetVault: event.transaction.to,
		amount: event.args.assets.toString(),
		shares: event.args.shares.toString(),
		user: event.args.user,
		timestamp: Number(event.block.timestamp),
		blockNumber: Number(event.block.number),
		transactionHash: event.transaction.hash,
	});
});
