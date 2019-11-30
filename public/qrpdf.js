// qrpdf.js

// Create pdf of qr codes containing all the wallet information for an account passed on the command line.
// This uses template.html to produce generated.html which produces generated.pdf.
// The private qr also contains a BIP-39 recovery seed.

// node qrpdf <public address> <private key> <URL> <WIF>


const pdf = require('html-pdf')
const bip39 = require('bip39')
const qr = require('qr-image')
const fs = require('fs')
const util = require('util')
// const WIF = require('wif')
const exec = util.promisify(require('child_process').exec)
const merge = require('easy-pdf-merge')

let defly = true

let sources = []

let URL = process.argv[2] ? process.argv[2] : 'https://O3.network'

exports.gen = async function (path, finalWalletPath, filename, accounts, callback) {
  let account

  let i = 0

  function g(account) {
    makePdf(account.address, account.pk, account.url, account._WIF, path, () => {
      let name = account.address
      console.log('GENERATED: '+name+' ++++++++++++++++++++++++++++++++\n');
      fs.rename(path+'generated.pdf', path+name+'.pdf', () => {
        sources[i] = (''+path+name+'.pdf')
        i++
        if (i < accounts.length ) g(accounts[i])

        else {
          merge(sources, path+filename, function(err) {
            console.log('merging: '+path+filename)
            if (err)
            return console.log(err)
            console.log('\nSuccess')
            // var i = sources.length
            sources.forEach(function(filepath) {
              console.log('Cleaning up '+filepath)
              try {
                if (fs.existsSync(filepath))  {
                  fs.unlinkSync(filepath)
                }
              } catch(e){
                console.log(e)
              }
            })
            fs.copyFileSync(path+filename, finalWalletPath+filename)
            callback()
          })
        }
      })
    })
  }

  g(accounts[i])
}

function makePdf(address, privateKey, url, wif, path, callback) {
  const COMPRESS = false

  const publicAddress = address
  const PK = privateKey
  const URL = url
  const WIF = wif

  let bip39Mnemonic

  if (PK) {
    console.log('Input Private Key: \n'+PK)

    bip39Mnemonic = bip39.entropyToMnemonic(PK)
    console.log('BIP-39 Mnemonic: \n'+bip39Mnemonic)

    let reversedPK = bip39.mnemonicToEntropy(bip39Mnemonic)
    console.log('Mnemonic Reversed Back to PK: \n'+reversedPK)

    if (PK.toLowerCase() !== reversedPK.toLowerCase()) {
      console.log('Seed did not reverse to private key. Please try again.')
      console.log('Got: \n'+reversedPK+' and should have been: \n'+PK)
      return
    }
  }

  let pkLink

  if (COMPRESS) {
    function pkToUrl(pk) {
      // return base64url(web3.utils.hexToBytes(pk))
      return null
    }
    let encoded = pkToUrl(PK)
    pkLink = URL+'/pk#'+encoded
  } else {
    pkLink = PK.replace('0x','')
  }

  console.log('----------------------------------------------')

  console.log('pkLink: '+pkLink)

  let pub = qr.image(publicAddress, { type: 'png' })
  pub.pipe(require('fs').createWriteStream(path+'public.png'))
  console.log('Public Address: '+publicAddress)

  url = qr.image(URL, { type: 'png' })
  url.pipe(require('fs').createWriteStream(path+'url.png'))
  console.log('URL: '+URL)

  let priv = qr.image(WIF, { type: 'png' })
  priv.pipe(require('fs').createWriteStream(path+'private.png'))
  console.log('WIF: '+WIF)

  let bipqr = qr.image(bip39Mnemonic, { type: 'png' })
  bipqr.pipe(require('fs').createWriteStream(path+'bip39.png'))
  console.log('BIP-39: '+bip39Mnemonic)
  console.log('----------------------------------------------')

  fs.readFile(path+'template.html', 'utf8', (err,data) => {
    if (err) {
      return console.log(err)
    }
    // var result = data.replace(/\*\*PUBLIC\*\*/g,publicAddress.substring(0,9)+'......'+publicAddress.substring(publicAddress.length-8))
    let result = data.replace(/\*\*PUBLIC\*\*/g,publicAddress)
    result = result.replace(/\*\*URL\*\*/g,URL)
    result = result.replace(/'\.\//g, '\'file://'+path+'/')

    fs.writeFile(path+'generated.html', result, 'utf8', function (err) {
      if (err) {
        return console.log(err)
      }

      // fs.appendFile('addresses.txt',publicAddress+'\n', function (err) {
      //   if (err) throw err
      // })

      // let cwd = 'file://' + process.cwd() + '/'

      // console.log(`cwd: ${cwd}`)
      console.log(`path: ${path}`)

      let html = fs.readFileSync(path+'/generated.html', 'utf8')
      let options = {
        // Rendering options
        format: 'Letter',
        // 'base': cwd, // Base path that's used to load files (images, css, js) when they aren't referenced using a host
        'base': 'file://'+path, // Base path that's used to load files (images, css, js) when they aren't referenced using a host
      }

      pdf.create(html, options).toFile(path+'/generated.pdf', function(err, res) {
        if (err) return console.log(err)
        console.log('res: '+util.inspect(res, {depth: null}))
        callback()
      })
    })
  })
}
