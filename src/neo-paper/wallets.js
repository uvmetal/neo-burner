// wallets.js

// Call qrpdf.js for each account in accounts.json and merge the generated.pdf files into a single wallets.pdf for easy printing.

// node wallets.js [URL]

const util = require('util')
const exec = util.promisify(require('child_process').exec)
const merge = require('easy-pdf-merge')
const fs = require('fs')

let defly = true

let sources = []

let URL = process.argv[2] ? process.argv[2] : 'https://O3.network'

async function generate(accounts){
  let account

  for (let a in accounts) {
    account = accounts[a]
    const { stdout, stderr } = await exec('node qrpdf.js '+account.address+' '+account.pk+' '+URL+' '+account._WIF )

    if (stderr) {
      console.error(`error: ${stderr}`)
    }

    if (defly && stdout) console.log('\nstdout: \n'+stdout)

    let name = account.address
    console.log('Generated: '+name);
    await exec('mv generated.pdf '+name+'.pdf')
    sources[a] = (''+name+'.pdf')
  }

  merge(sources,'wallets.pdf',function(err) {
    if (err)
    return console.log(err)
    console.log('\nSuccess')
    var i = sources.length
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
  })
}

let accounts = JSON.parse(fs.readFileSync('./accounts.json').toString())
generate(accounts)
