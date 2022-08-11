<template>
  <div id="main">
    <h1 v-if="!contract" @click="connect()" class="clickable"> Connect wallet </h1>
    <!-- call-contract button is visible if the wallet is connected -->
    <h1 v-else-if="!invoked" @click="invokeContractMethod" class="clickable">Invoke contract</h1>
    <div v-else-if="loading" class="loading"><h1>Invoking</h1><div class="dot-pulse"></div></div>
    <h1 v-else class="mt-3">
      Result
      <br/><br/><pre>{{ contractResult }}</pre>
    </h1>
  </div>
</template>

<script>
import Web3 from "web3"
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./constants"
export default {
  name: "App",

  data() {
    return {
      contract: null,
      invoked: false,
      loading: false,
      contractResult: null,
    }
  },
  methods: {
    connect() {
      let web3 = new Web3(
        new Web3.providers.HttpProvider("http://127.0.0.1:8545")
      )

      web3.eth.defaultAccount = web3.eth.accounts[0]

      let contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)

      this.contract = contract
    },
    invokeContractMethod() {
      // this calls the contract
      this.invoked = this.loading = true
      const self = this

      setTimeout(() => {
        this.loading = false
        this.contract.methods
          .getOwner()
          .call()
          .then(result => self.contractResult = JSON.stringify(result))
      }, Math.random() * 10000)
    },
  },
  computed: {
    isConnected() {
      return !!this.contract
    },
  },
}
</script>

<style>
#main {
  display: flex;
  justify-content: center;
}
.clickable {
  cursor: pointer;
  border: 1px solid #aaa;
  padding: 1rem;
  opacity: .3;
  border-radius: 5px;
  transition: all .5s ease-in-out;
}
.clickable:hover {
  opacity: 1;
  border-radius: 15px;
}
.loading {
  display: flex;
  align-items: baseline;
}
.loading > h1 {
  margin-right: 2rem;
}
</style>
