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

export const pendingDeposit = onchainTable("pending_deposit", (t) => ({
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

export const deposit = onchainTable("deposit", (t) => ({
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

export const cancelledDeposit = onchainTable("cancelled_deposit", (t) => ({
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

export const pendingOrder = onchainTable("pending_order", (t) => ({
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

export const cancelledOrder = onchainTable("cancelled_order", (t) => ({
  id: t.text().primaryKey(),
  key: t.numeric(),
  timestamp: t.integer(),
  blockNumber: t.integer(),
  transactionHash: t.text(),
}));

export const price = onchainTable("price", (t) => ({
  id: t.text().primaryKey(),
  token: t.text(),
  price: t.numeric(),
  timestamp: t.integer(),
  blockNumber: t.integer(),
}));