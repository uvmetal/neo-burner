// accounts.js

// Generate 'n' Neo Smart Economy accounts and store them to accounts.json.
// node accounts n

// accounts.json format


const fs = require('fs')
const util = require('util')
const { default: Neon, wallet, api, rpc } = require("@cityofzion/neon-js")

// We don't actually need to specifiy a network until it comes time to invoke some asset transfers.
// This is just a placeholder and FOR EDUCATIONAL PURPOSES
const NETWORK = "TestNet" // or "TestNet"
const apiProvider = new api.neoscan.instance(
  // "https://api.neoscan.io/api/main_net"
  "https://neoscan-testnet.io/api/test_net"
)

const provider = new api.neoscan.instance("TestNet")

// TODO:  Let's add some commander-style command line processing, but this will do for now.
// Thanks AG!

// TODO: Save accounts.json by event name as command line option
// TODO: Add ferrite-style modularity and command line options

let AMOUNT = process.argv[2]
if(!AMOUNT) AMOUNT=2

let accounts

for (let a=0; a<AMOUNT; a++) {

  let result = ''

  result = new wallet.Account(wallet.generatePrivateKey())

  console.log('\nCreated wallet!: '+util.inspect(result, {depth: null}))
  console.log('WIF: '+result.WIF)

  try {
    accounts = JSON.parse(fs.readFileSync("./accounts.json").toString())
  } catch(e){
    accounts = []
  }

  accounts.push({
    address: result._address, // maintain compatibility with the rest of AG's work
    pk: result._privateKey,   // maintain compatibility with the rest of AG's work
    _address:result._address,
    _privateKey: result._privateKey,
    _publicKey: result._publicKey,
    _scriptHash: result._scriptHash,
    _WIF: result.WIF
  })

  iterate(accounts, '')

  fs.writeFileSync("./accounts.json",JSON.stringify(accounts).toString())
}

function iterate(obj, stack) {
  for (var property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (typeof obj[property] == "object") {
        iterate(obj[property], stack + '.' + property)
      } else {
        console.log(property + "  " + obj[property])
      }
    }
  }
}
