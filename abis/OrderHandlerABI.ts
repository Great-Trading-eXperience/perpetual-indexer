export const OrderHandlerABI = [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "_orderVault",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_wnt",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "cancelOrder",
    "inputs": [
      {
        "name": "_dataStore",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_key",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "createOrder",
    "inputs": [
      {
        "name": "_dataStore",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_account",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_params",
        "type": "tuple",
        "internalType": "struct OrderHandler.CreateOrderParams",
        "components": [
          {
            "name": "receiver",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "cancellationReceiver",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "callbackContract",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "uiFeeReceiver",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "market",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "initialCollateralToken",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "orderType",
            "type": "uint8",
            "internalType": "enum OrderHandler.OrderType"
          },
          {
            "name": "sizeDeltaUsd",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "initialCollateralDeltaAmount",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "triggerPrice",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "acceptablePrice",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "executionFee",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "validFromTime",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "isLong",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "autoCancel",
            "type": "bool",
            "internalType": "bool"
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "orderVault",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "wnt",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "event",
    "name": "OrderCancelled",
    "inputs": [
      {
        "name": "key",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OrderCreated",
    "inputs": [
      {
        "name": "key",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "deposit",
        "type": "tuple",
        "indexed": false,
        "internalType": "struct OrderHandler.Order",
        "components": [
          {
            "name": "account",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "receiver",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "cancellationReceiver",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "callbackContract",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "uiFeeReceiver",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "marketToken",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "initialCollateralToken",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "orderType",
            "type": "uint8",
            "internalType": "enum OrderHandler.OrderType"
          },
          {
            "name": "sizeDeltaUsd",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "initialCollateralDeltaAmount",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "triggerPrice",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "acceptablePrice",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "executionFee",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "updatedAtTime",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "validFromTime",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "isLong",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "isFrozen",
            "type": "bool",
            "internalType": "bool"
          }
        ]
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "InitialCollateralTokenDoesNotExist",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InsufficientExecutionFee",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InsufficientWntAmountForExecutionFee",
    "inputs": [
      {
        "name": "initialCollateralDeltaAmount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "executionFee",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "type": "error",
    "name": "MarketDoesNotExist",
    "inputs": []
  },
  {
    "type": "error",
    "name": "OrderTypeCannotBeCreated",
    "inputs": [
      {
        "name": "orderType",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  }
] as const;