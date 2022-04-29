export const address = "0x1E484be44D576Dc18C07a68116130F572B903d0C";
export const abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nid",
        type: "uint256",
      },
    ],
    name: "activeVoter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "party",
        type: "string",
      },
      {
        internalType: "int256",
        name: "age",
        type: "int256",
      },
      {
        internalType: "string",
        name: "qualification",
        type: "string",
      },
      {
        internalType: "string",
        name: "nidnumber",
        type: "string",
      },
    ],
    name: "Addcandidate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "voter",
        type: "address",
      },
    ],
    name: "giveRightToVote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposal",
        type: "uint256",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nid",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "email",
        type: "string",
      },
      {
        internalType: "address",
        name: "voteraddress",
        type: "address",
      },
    ],
    name: "Voterregistation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "candidatepersons",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "party",
        type: "string",
      },
      {
        internalType: "int256",
        name: "age",
        type: "int256",
      },
      {
        internalType: "string",
        name: "qualification",
        type: "string",
      },
      {
        internalType: "string",
        name: "nidnumber",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "voteCount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "retriveCandidate",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "party",
            type: "string",
          },
          {
            internalType: "int256",
            name: "age",
            type: "int256",
          },
          {
            internalType: "string",
            name: "qualification",
            type: "string",
          },
          {
            internalType: "string",
            name: "nidnumber",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "voteCount",
            type: "uint256",
          },
        ],
        internalType: "struct Evoting.Candidate[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "retriveVoter",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "nid",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "email",
            type: "string",
          },
          {
            internalType: "int256",
            name: "status",
            type: "int256",
          },
          {
            internalType: "address",
            name: "voteraddress",
            type: "address",
          },
        ],
        internalType: "struct Evoting.Voterregister[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "voterregisters",
    outputs: [
      {
        internalType: "uint256",
        name: "nid",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "email",
        type: "string",
      },
      {
        internalType: "int256",
        name: "status",
        type: "int256",
      },
      {
        internalType: "address",
        name: "voteraddress",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "voters",
    outputs: [
      {
        internalType: "uint256",
        name: "vote",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "voted",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "weight",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
