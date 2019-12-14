// From: https://neo-one.io/docs/environment-setup
// For local network and smart contract management, you should install
//
// @neo-one/cli - Provides the neo-one cli command which manages common tasks like building and deploying smart contracts and spinning up local networks.

const cli_1 = require('@neo-one/cli')
const util = require('util')
const { spawn } = require('child_process')

module.exports = {

  friendlyName: 'Start',


  description: 'Start the Neo-One server. There should be only one server so identifying it is handled automatically.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    const p = spawn(sails.config.globals.neoone.serverPath, ['init'])

    console.log('sails __dirname: '+__dirname)
    console.log('sails process.cwd(): '+process.cwd())

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)

      const regex = /.*\(pid=([0-9].*)\)\n/
      const found = data.toString().replace(regex, '$1')
      console.log(`found ${found}`)
      sails.config.globals.neoone.serverPID = found
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })

    // All done.
    return
  }
};
