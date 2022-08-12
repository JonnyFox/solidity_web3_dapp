<template>
  <div id="main">
    <h1
      v-if="!contract"
      @click="connect()"
      :class="{ clickable: true, extended: connecting }"
    >
      <span>Connect to blockchain</span>
      <div v-show="connecting" class="dot-pulse" />
    </h1>
    <h1 v-else class="mt-3">
      <div class="info-container">
        <h1
          @click="getOwner"
          :class="{ clickable: true, extended: gettingData }"
        >
          <span>Get owner</span>
          <div v-show="gettingData" class="dot-pulse" />
        </h1>
        <pre>{{ contractResult }}</pre>
      </div>
      <div class="info-container">
        <h1
        @click="setOwner"
        :class="{ clickable: true, extended: settingData }"
        >
        <span>Set owner</span>
        <div v-show="settingData" class="dot-pulse" />
        </h1>
        <input class="owner-input" type="text" v-model="ownerName" />
      </div>
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
      connecting: false,
      gettingData: false,
      settingData: false,
      contractResult: null,
      ownerName: "",
      defaultAccount: null,
    }
  },
  methods: {

    // Connect to local blockchain
    connect() {
      let web3 = new Web3("http://127.0.0.1:8545")

      // Get the available accounts
      web3.eth.getAccounts().then((accounts) => {
        // Get the first account and set it as the default account
        this.defaultAccount = accounts[0]

        this.connecting = true

        // Create a new contract instance
        this.randomDelay(() => {
          this.contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
          this.connecting = false
        })
      })
    },
    getOwner() {
      this.gettingData = true
      this.randomDelay(() => {
        this.contract.methods
          .getOwner()
          .call()
          .then((result) => {
            this.contractResult = JSON.stringify({'name': result['0'], 'age': result['1']})
            this.gettingData = false
          })
      })
    },
   setOwner() {
    this.settingData = true
    const values = this.ownerName.split(',')
      this.randomDelay(() => {
        this.contract.methods
          .setOwner(values[0], values.length > 1 ? +values[1] : 0)
          .send({ from: this.defaultAccount })
          .then(() =>{
            this.settingData = false
            this.getOwner()
          })
      })
    },
    
    // Add some delay to the calls 
    randomDelay(action) {
      this.loading = true
      setTimeout(() => {
        action()
        this.loading = false
      }, Math.random() * 3000)
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
  display: flex;
  margin: 1rem;
  cursor: pointer;
  border: 1px solid #aaa;
  padding: 1rem;
  opacity: 0.3;
  border-radius: 5px;
  transition: all 0.5s ease-in-out;
  align-items: baseline;
}
.clickable.extended {
  padding-right: 2rem;
}
.owner-input {
  margin: 1rem;
  cursor: pointer;
  border: 1px solid #aaa;
  background-color: #444;
  color: #aaa;
  padding: 1rem;
  opacity: 0.3;
  border-radius: 5px;
  transition: all 0.5s ease-in-out;
}
.owner-input:focus {
  opacity: 1;
}
.owner-input:hover {
  opacity: 1;
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
.info-container {
  display: flex;
  align-items: baseline;
}
</style>
