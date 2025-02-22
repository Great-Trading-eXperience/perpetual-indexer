import { ponder } from "ponder:registry";
import { position, order, deposit, market, price as tokenPrice } from "ponder:schema";

ponder.on("MarketFactory:MarketCreated", async ({ event, context }) => {
  await context.db.insert(market).values({
    id: `${event.block.number}-${event.transaction.hash}`,
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
  const orderData = event.args.deposit;

  await context.db.insert(order).values({
    id: `${event.block.number}-${event.transaction.hash}`,
    key: Number(event.args.key),
    account: orderData.account,
    receiver: orderData.receiver,
    cancellationReceiver: orderData.cancellationReceiver,
    callbackContract: orderData.callbackContract,
    uiFeeReceiver: orderData.uiFeeReceiver,
    marketToken: orderData.marketToken,
    initialCollateralToken: orderData.initialCollateralToken,
    orderType: Number(orderData.orderType),
    sizeDeltaUsd: orderData.sizeDeltaUsd.toString(),
    initialCollateralDeltaAmount: orderData.initialCollateralDeltaAmount.toString(),
    triggerPrice: orderData.triggerPrice.toString(),
    acceptablePrice: orderData.acceptablePrice.toString(),
    executionFee: orderData.executionFee.toString(),
    updatedAtTime: Number(orderData.updatedAtTime),
    validFromTime: Number(orderData.validFromTime),
    isLong: orderData.isLong,
    isFrozen: orderData.isFrozen,
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
    id: `${event.block.number}-${event.transaction.hash}`,
    key: event.args.positionKey.toString(),
    account: event.args.account,
    marketToken: event.args.market,
    collateralToken: event.args.collateralToken,
    sizeInTokens: event.args.sizeInTokens.toString(),
    sizeInUsd: event.args.sizeInUsd.toString(),
    collateralAmount: event.args.collateralAmount.toString(),
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
    id: `${event.block.number}-${event.transaction.hash}`,
    key: event.args.positionKey.toString(),
    account: event.args.account,
    marketToken: event.args.market,
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
