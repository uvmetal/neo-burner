// accounts.js

// Generate 'n' Neo Smart Economy accounts and store them to accounts.json.
// node accounts n

// accounts.json format


const fs = require('fs')
const util = require('util')
const { default: Neon, wallet, api, rpc } = require("@cityofzion/neon-js")
const bip39 = require('bip39')

// We don't actually need to specifiy a network until it comes time to invoke some asset transfers.
// This is just a placeholder and FOR EDUCATIONAL PURPOSES
const NETWORK = "TestNet" // or "TestNet"
const apiProvider = new api.neoscan.instance(
  // "https://api.neoscan.io/api/main_net"
  "https://neoscan-testnet.io/api/test_net"
)

const provider = new api.neoscan.instance("TestNet")

export function generateAccounts (amount, name, url) {

  if (!name) name = 'Neo-Burner Event'
  if (!url) url = 'Neo-Burner URL'

  let AMOUNT = amount
  if (!AMOUNT) AMOUNT=1

  let accounts = []
  let bip39Mnemonic

  for (let a=0; a<AMOUNT; a++) {

    let result = ''

    result = new wallet.Account(wallet.generatePrivateKey())

    console.log('\nCreated wallet!: '+util.inspect(result, {depth: null}))
    console.log('WIF: '+result.WIF)

    bip39Mnemonic = bip39.entropyToMnemonic(result._privateKey)
    console.log('BIP-39 Mnemonic: \n'+bip39Mnemonic)

    let reversedPK = bip39.mnemonicToEntropy(bip39Mnemonic)
    console.log('Mnemonic Reversed Back to PK: \n'+reversedPK)

    //     if (PK.toLowerCase() !== reversedPK.toLowerCase()) {
    //       console.log('Seed did not reverse to private key. Please try again.')
    //       console.log('Got: \n'+reversedPK+' and should have been: \n'+PK)
    //       return
    //     }

    accounts.push({
      name: name,
      url: url,
      address: result._address, // maintain compatibility with the rest of AG's work
      pk: result._privateKey,   // maintain compatibility with the rest of AG's work
      _address:result._address,
      _privateKey: result._privateKey,
      _publicKey: result._publicKey,
      _scriptHash: result._scriptHash,
      _WIF: result.WIF,
      _bip39: bip39Mnemonic,
      _bip39Verify: reversedPK
    })

    iterate(accounts, '')
    // fs.writeFileSync("./data/accounts.json", JSON.stringify(accounts).toString())
  }
  return accounts
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
