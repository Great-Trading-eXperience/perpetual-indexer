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
  isExecuted: t.boolean(),
  isCancelled: t.boolean(),
  updatedAtTime: t.integer(),
  timestamp: t.integer(),
  blockNumber: t.integer(),
  transactionHash: t.text(),
}));

export const order = onchainTable("order", (t) => ({
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
  isExecuted: t.boolean(),
  isCancelled: t.boolean(),
  timestamp: t.integer(),
  blockNumber: t.integer(),
  transactionHash: t.text(),
}));

export const position = onchainTable("position", (t) => ({
  id: t.text().primaryKey(),
  key: t.text(),
  account: t.text(),
  marketToken: t.text(),
  collateralToken: t.text(),
  sizeInUsd: t.numeric(),
  sizeInTokens: t.numeric(),
  collateralAmount: t.numeric(),
  cumulativeFundingFee: t.numeric(),
  cumulativeBorrowingFee: t.numeric(),
  increasedAtTime: t.integer(),
  decreasedAtTime: t.integer(),
  isLong: t.boolean(),
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

export const liquidation = onchainTable("liquidation", (t) => ({
  id: t.text().primaryKey(),
  key: t.text(),
  account: t.text(),
  marketToken: t.text(),
  collateralToken: t.text(),
  collateralAmount: t.numeric(),
  liquidationFee: t.numeric(),
  liquidationPrice: t.numeric(),
  liquidator: t.text(),
  timestamp: t.integer(),
  blockNumber: t.integer(),
  transactionHash: t.text(),
}));

export const openInterest = onchainTable("openInterest", (t) => ({
  id: t.text().primaryKey(),
  market: t.text(),
  token: t.text(),
  openInterest: t.numeric(),
  timestamp: t.integer(),
  blockNumber: t.integer(),
  transactionHash: t.text(),
}));

export const fundingFee = onchainTable("fundingFee", (t) => ({
  id: t.text().primaryKey(),
  marketToken: t.text(),
  collateralToken: t.text(),
  fundingFee: t.numeric(),
  timestamp: t.integer(),
  blockNumber: t.integer(),
  transactionHash: t.text(),
}));