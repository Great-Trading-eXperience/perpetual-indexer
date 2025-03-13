import { onchainTable, relations } from "ponder";

export const market = onchainTable("market", (t) => ({
  id: t.text().primaryKey(),
  name: t.text(),
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

export const withdraw = onchainTable("withdraw", (t) => ({
  id: t.text().primaryKey(),
  key: t.numeric(),
  account: t.text(),
  receiver: t.text(),
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
  liquidatedAtTime: t.integer(),
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

export const size = onchainTable("size", (t) => ({
  id: t.text().primaryKey(),
  marketToken: t.text(),
  price: t.numeric(),
  size: t.numeric(),
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

export const curator = onchainTable("curator", (t) => ({
  id: t.text().primaryKey(),
  curator: t.text(),
  name: t.text(),
  uri: t.text(),
  contractAddress: t.text(),
  timestamp: t.integer(),
  blockNumber: t.integer(),
  transactionHash: t.text(),
}));

export const assetVault = onchainTable("assetVault", (t) => ({
  id: t.text().primaryKey(),
  curator: t.text(),
  name: t.text(),
  asset: t.text(),
  token: t.text(),
  tvl: t.numeric(),
  tokenName: t.text(),
  tokenSymbol: t.text(),
  timestamp: t.integer(),
  blockNumber: t.integer(),
  transactionHash: t.text(),
}));

export const allocation = onchainTable("allocation", (t) => ({
  id: t.text().primaryKey(),
  assetVault: t.text(),
  marketToken : t.text(),
  allocation: t.numeric(),
  curator: t.text(),
  timestamp: t.integer(),
  blockNumber: t.integer(),
  transactionHash: t.text(),
}));

export const curatorVaultDeposit = onchainTable("curatorVaultDeposit", (t) => ({
  id: t.text().primaryKey(),
  assetVault: t.text(),
  amount: t.numeric(),
  shares: t.numeric(),
  user: t.text(),
  timestamp: t.integer(),
  blockNumber: t.integer(),
  transactionHash: t.text(),
}));

export const curatorVaultWithdrawal = onchainTable("curatorVaultWithdrawal", (t) => ({
  id: t.text().primaryKey(),
  assetVault: t.text(),
  amount: t.numeric(),
  shares: t.numeric(),
  user: t.text(),
  timestamp: t.integer(),
  blockNumber: t.integer(),
  transactionHash: t.text(),
}));

export const curatorVaultDepositRelations = relations(curatorVaultDeposit, ({ one }) => ({
  assetVault: one(assetVault, { fields: [curatorVaultDeposit.assetVault], references: [assetVault.id] }),
}));

export const curatorVaultWithdrawalRelations = relations(curatorVaultWithdrawal, ({ one }) => ({
  assetVault: one(assetVault, { fields: [curatorVaultWithdrawal.assetVault], references: [assetVault.id] }),
}));

export const curatorRelations = relations(curator, ({ many }) => ({
  assetVaults: many(assetVault),
}));

export const assetVaultRelations = relations(assetVault, ({ one }) => ({
  curator: one(curator, { fields: [assetVault.curator], references: [curator.id] }),
}));

export const assetVaultAllocationRelations = relations(assetVault, ({ many }) => ({
  allocations: many(allocation),
}));

export const allocationRelations = relations(allocation, ({ one }) => ({
  assetVault: one(assetVault, { fields: [allocation.assetVault], references: [assetVault.id] }),
}));

export const curatorDeployedVaultsRelations = relations(curator, ({ many }) => ({
  deployedVaults: many(assetVault),
}));

export const assetVaultCuratorRelations = relations(assetVault, ({ one }) => ({
  curator: one(curator, { fields: [assetVault.curator], references: [curator.id] }),
}));
