export const MarketFactoryABI = [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "_dataStore",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "createMarket",
    "inputs": [
      {
        "name": "_longToken",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_shortToken",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "dataStore",
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
    "name": "MarketCreated",
    "inputs": [
      {
        "name": "marketToken",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "longToken",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "shortToken",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "MarketAlreadyExists",
    "inputs": [
      {
        "name": "longToken",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "shortToken",
        "type": "address",
        "internalType": "address"
      }
    ]
  }
] as const;
