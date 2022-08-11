const CONTRACT_ADDRESS = "0xa92e03A6672B92556134b0BfBe1F96bFE5536862";
const CONTRACT_ABI = 
	[
		{
			"inputs": [],
			"name": "age",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getOwner",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "name",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "_name",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "_age",
					"type": "uint256"
				}
			],
			"name": "setOwner",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	]
export { CONTRACT_ADDRESS, CONTRACT_ABI };
