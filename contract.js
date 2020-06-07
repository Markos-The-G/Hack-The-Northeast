exports.abi = [
  {
    "inputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "constructor"
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "x",
        "type": "string"
      }
    ],
    "name": "set",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "get",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "returnBountyAddresses",
    "outputs": [
      {
        "internalType": "address payable[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_address",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_requirement",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_bountyAmount",
        "type": "uint256"
      }
    ],
    "name": "addNewBounty",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_accuracy",
        "type": "uint256"
      },
      {
        "internalType": "address payable",
        "name": "_submitter",
        "type": "address"
      },
      {
        "internalType": "address payable",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "addNewSubmission",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_submitter",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "payment",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_submitter",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "address payable",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "partialPayment",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_submitter",
        "type": "address"
      },
      {
        "internalType": "address payable",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "fullPayment",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "returnTempBountyArray",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "components": [
              {
                "internalType": "address payable",
                "name": "submitter",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "accuracy",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "bountyName",
                "type": "string"
              }
            ],
            "internalType": "struct Main.submission[]",
            "name": "submissions",
            "type": "tuple[]"
          },
          {
            "internalType": "uint256",
            "name": "requirement",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "bountyAmount",
            "type": "uint256"
          }
        ],
        "internalType": "struct Main.bounty[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "deleteTempBountyArray",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "retreieveTempBountyArray",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "returnTempSubmissionArray",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address payable",
            "name": "submitter",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "accuracy",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "bountyName",
            "type": "string"
          }
        ],
        "internalType": "struct Main.submission[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "deleteTempSubmissionArray",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_submitter",
        "type": "address"
      }
    ],
    "name": "retrieveTempSubmissionArray",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "statistics",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
exports.address = '0xa3f150De117A8FCb51A57206FEf47FA5dE78cF5f';