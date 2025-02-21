import { ponder } from "ponder:registry";
import { cancelledDeposit, cancelledOrder, deposit, market, pendingDeposit, pendingOrder, price as tokenPrice } from "ponder:schema";

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
  const deposit = event.args.deposit;

  await context.db.insert(pendingDeposit).values({
    id: event.args.key.toString(),
    key: event.args.key.toString(),
    account: deposit.account,
    receiver: deposit.receiver,
    uiFeeReceiver: deposit.uiFeeReceiver,
    marketToken: deposit.marketToken,
    initialLongToken: deposit.initialLongToken,
    initialShortToken: deposit.initialShortToken,
    executionFee: deposit.executionFee.toString(),
    initialLongTokenAmount: deposit.initialLongTokenAmount.toString(),
    initialShortTokenAmount: deposit.initialShortTokenAmount.toString(),
    timestamp: Number(event.block.timestamp),
    blockNumber: Number(event.block.number),
    transactionHash: event.transaction.hash,
  });
});

ponder.on("DepositHandler:DepositExecuted", async ({ event, context }) => {
  const pendingDepositData = await context.db.find(pendingDeposit, {
    id: event.args.key.toString(),
  });

  if (!pendingDepositData) {
    return;
  }

  await context.db.insert(deposit).values({
    id: event.args.key.toString(),
    key: event.args.key.toString(),
    account: pendingDepositData.account,
    receiver: pendingDepositData.receiver,
    uiFeeReceiver: pendingDepositData.uiFeeReceiver,
    marketToken: pendingDepositData.marketToken,
    initialLongToken: pendingDepositData.initialLongToken,
    initialShortToken: pendingDepositData.initialShortToken,
    executionFee: pendingDepositData.executionFee?.toString(),
    initialLongTokenAmount: pendingDepositData.initialLongTokenAmount?.toString(),
    initialShortTokenAmount: pendingDepositData.initialShortTokenAmount?.toString(),
    timestamp: Number(event.block.timestamp),
    blockNumber: Number(event.block.number),
    transactionHash: event.transaction.hash,
  });

  await context.db.delete(pendingDeposit, {
    id: event.args.key.toString(),
  });
});

ponder.on("DepositHandler:DepositCancelled", async ({ event, context }) => {
  const pendingDepositData = await context.db.find(pendingDeposit, {
    id: event.args.key.toString(),
  });

  if (!pendingDepositData) {
    return;
  }

  await context.db.insert(cancelledDeposit).values({
    id: event.args.key.toString(),
    key: event.args.key.toString(),
    account: pendingDepositData.account,
    receiver: pendingDepositData.receiver,
    uiFeeReceiver: pendingDepositData.uiFeeReceiver,
    marketToken: pendingDepositData.marketToken,
    initialLongToken: pendingDepositData.initialLongToken,
    initialShortToken: pendingDepositData.initialShortToken,
    executionFee: pendingDepositData.executionFee?.toString(),
    initialLongTokenAmount: pendingDepositData.initialLongTokenAmount?.toString(),
    initialShortTokenAmount: pendingDepositData.initialShortTokenAmount?.toString(),
    timestamp: Number(event.block.timestamp),
    blockNumber: Number(event.block.number),
    transactionHash: event.transaction.hash,
  });

  await context.db.delete(pendingDeposit, {
    id: event.args.key.toString(),
  });
});

ponder.on("OrderHandler:OrderCreated", async ({ event, context }) => {
  const order = event.args.deposit;

  await context.db.insert(pendingOrder).values({
    id: `${event.block.number}-${event.transaction.hash}`,
    key: Number(event.args.key),
    account: order.account,
    receiver: order.receiver,
    cancellationReceiver: order.cancellationReceiver,
    callbackContract: order.callbackContract,
    uiFeeReceiver: order.uiFeeReceiver,
    marketToken: order.marketToken,
    initialCollateralToken: order.initialCollateralToken,
    orderType: Number(order.orderType),
    sizeDeltaUsd: order.sizeDeltaUsd.toString(),
    initialCollateralDeltaAmount: order.initialCollateralDeltaAmount.toString(),
    triggerPrice: order.triggerPrice.toString(),
    acceptablePrice: order.acceptablePrice.toString(),
    executionFee: order.executionFee.toString(),
    updatedAtTime: Number(order.updatedAtTime),
    validFromTime: Number(order.validFromTime),
    isLong: order.isLong,
    isFrozen: order.isFrozen,
    timestamp: Number(event.block.timestamp),
    blockNumber: Number(event.block.number),
    transactionHash: event.transaction.hash,
  });
});

ponder.on("OrderHandler:OrderCancelled", async ({ event, context }) => {
  await context.db.insert(cancelledOrder).values({
    id: `${event.block.number}-${event.transaction.hash}`,
    key: event.args.key.toString(),
    timestamp: Number(event.block.timestamp),
    blockNumber: Number(event.block.number),
    transactionHash: event.transaction.hash,
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
