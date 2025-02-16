import { ponder } from "ponder:registry";
import { depositCancellation, depositCreation, market, orderCancellation, orderCreation } from "ponder:schema";

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
  
  await context.db.insert(depositCreation).values({
    id: `${event.block.number}-${event.transaction.hash}`,
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

ponder.on("DepositHandler:DepositCancelled", async ({ event, context }) => {
  await context.db.insert(depositCancellation).values({
    id: `${event.block.number}-${event.transaction.hash}`,
    key: event.args.key.toString(),
    timestamp: Number(event.block.timestamp),
    blockNumber: Number(event.block.number),
    transactionHash: event.transaction.hash,
  });
});

ponder.on("OrderHandler:OrderCreated", async ({ event, context }) => {
  const order = event.args.deposit;
  
  await context.db.insert(orderCreation).values({
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
  await context.db.insert(orderCancellation).values({
    id: `${event.block.number}-${event.transaction.hash}`,
    key: event.args.key.toString(),
    timestamp: Number(event.block.timestamp),
    blockNumber: Number(event.block.number),
    transactionHash: event.transaction.hash,
  });
});