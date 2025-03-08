import { ponder } from "ponder:registry";
import { deposit, fundingFee, liquidation, market, openInterest, order, position, price as tokenPrice } from "ponder:schema";

ponder.on("MarketFactory:MarketCreated", async ({ event, context }) => {
  await context.db.insert(market).values({
    id: event.args.marketToken,
    longToken: event.args.longToken,
    shortToken: event.args.shortToken,
    marketToken: event.args.marketToken,
    timestamp: Number(event.block.timestamp),
    blockNumber: Number(event.block.number),
    transactionHash: event.transaction.hash,
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

  await context.db.insert(deposit).values({
    id: existingDeposit.id,
    key: existingDeposit.key,
    account: existingDeposit.account,
    receiver: existingDeposit.receiver,
    uiFeeReceiver: existingDeposit.uiFeeReceiver,
    marketToken: existingDeposit.marketToken,
    initialLongToken: existingDeposit.initialLongToken,
    initialShortToken: existingDeposit.initialShortToken,
    executionFee: existingDeposit.executionFee?.toString(),
    initialLongTokenAmount: existingDeposit.initialLongTokenAmount?.toString(),
    initialShortTokenAmount: existingDeposit.initialShortTokenAmount?.toString(),
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

  await context.db.insert(deposit).values({
    id: existingDeposit.id,
    key: event.args.key.toString(),
    account: existingDeposit.account,
    receiver: existingDeposit.receiver,
    uiFeeReceiver: existingDeposit.uiFeeReceiver,
    marketToken: existingDeposit.marketToken,
    initialLongToken: existingDeposit.initialLongToken,
    initialShortToken: existingDeposit.initialShortToken,
    executionFee: existingDeposit.executionFee?.toString(),
    initialLongTokenAmount: existingDeposit.initialLongTokenAmount?.toString(),
    initialShortTokenAmount: existingDeposit.initialShortTokenAmount?.toString(),
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
    initialCollateralDeltaAmount: event.args.initialCollateralDeltaAmount.toString(),
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

  await context.db.insert(order).values({
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

  await context.db.insert(order).values({
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
  await context.db.insert(position).values({
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
  }).onConflictDoUpdate({
    sizeInTokens: event.args.sizeInTokens.toString(),
    sizeInUsd: event.args.sizeInUsd.toString(),
    collateralAmount: event.args.collateralAmount.toString(),
    increasedAtTime: Number(event.args.increasedAtTime),
    timestamp: Number(event.block.timestamp),
  });
});

ponder.on("PositionHandler:PositionDecreased", async ({ event, context }) => {
  await context.db.insert(position).values({
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
  }).onConflictDoUpdate({
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

  await context.db.insert(position).values({
    id: existingPosition.id,
    liquidatedAtTime: Number(event.block.timestamp),
  }).onConflictDoUpdate({
    liquidatedAtTime: Number(event.block.timestamp),
  });

  await context.db.insert(liquidation).values({
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
  }).onConflictDoUpdate({
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

  await context.db.insert(tokenPrice).values({
    id: `${event.block.number}-${event.transaction.hash}`,
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