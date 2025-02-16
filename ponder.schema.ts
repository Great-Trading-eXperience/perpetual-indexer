import { onchainTable } from "ponder";

export const market = onchainTable("market", (t) => ({
  id: t.text().primaryKey(),
  longToken: t.text(),
  shortToken: t.text(),
  marketToken: t.text(),
  timestamp: t.integer(),
  blockNumber: t.integer(),
  transactionHash: t.text(),
}));

export const depositCreation = onchainTable("deposit_creation", (t) => ({
  id: t.text().primaryKey(),
  key: t.numeric(),
  account: t.text(),
  receiver: t.text(),
  uiFeeReceiver: t.text(),
  marketToken: t.text(),
  initialLongToken: t.text(),
  initialShortToken: t.text(),
  executionFee: t.numeric(),
  initialLongTokenAmount: t.numeric(),
  initialShortTokenAmount: t.numeric(),
  timestamp: t.integer(),
  blockNumber: t.integer(),
  transactionHash: t.text(),
}));

export const depositCancellation = onchainTable("deposit_cancellation", (t) => ({
  id: t.text().primaryKey(),
  key: t.numeric(),
  timestamp: t.integer(),
  blockNumber: t.integer(),
  transactionHash: t.text(),
}));

export const orderCreation = onchainTable("order_creation", (t) => ({
  id: t.text().primaryKey(),
  key: t.integer(),
  account: t.text(),
  receiver: t.text(),
  cancellationReceiver: t.text(),
  callbackContract: t.text(),
  uiFeeReceiver: t.text(),
  marketToken: t.text(),
  initialCollateralToken: t.text(),
  orderType: t.integer(),
  sizeDeltaUsd: t.numeric(),
  initialCollateralDeltaAmount: t.numeric(),
  triggerPrice: t.numeric(),
  acceptablePrice: t.numeric(),
  executionFee: t.numeric(),
  updatedAtTime: t.integer(),
  validFromTime: t.integer(),
  isLong: t.boolean(),
  isFrozen: t.boolean(),
  timestamp: t.integer(),
  blockNumber: t.integer(),
  transactionHash: t.text(),
}));

export const orderCancellation = onchainTable("order_cancellation", (t) => ({
  id: t.text().primaryKey(),
  key: t.numeric(),
  timestamp: t.integer(),
  blockNumber: t.integer(),
  transactionHash: t.text(),
}));