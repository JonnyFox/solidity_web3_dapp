import { CONTRACT_ABI, CONTRACT_ADDRESS } from './constants.js';

function connect() {
  
  // Create a new web3 instance specifying the local "Ganache provider"
  const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))

  // Take the first account
  web3.eth.defaultAccount = web3.eth.accounts[0]

  // Create a new contract instance using the ABI and the address
  window.contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
}

function invokeContract() {

  // Call the "getOwner" contract method getting the contract from the window object
  window.contract.methods.getOwner()
    .call()
    .then(result => {
        document.getElementById('status').innerHTML = `Result <br/><br/><pre>${JSON.stringify(result)}</pre>`
    })
}

setTimeout(() => {
    connect()

    document.getElementById('status').innerHTML = 'Invoking Smart contract method...'

    // Add some suspense to the demo before invoking the contract
    setTimeout(() => invokeContract(), Math.random() * 5000)
}, 2000)
