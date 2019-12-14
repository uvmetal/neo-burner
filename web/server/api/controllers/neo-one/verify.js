// From: https://neo-one.io/docs/environment-setup
// For local network and smart contract management, you should install
//
// @neo-one/cli - Provides the neo-one cli command which manages common tasks like building and deploying smart contracts and spinning up local networks.

const cli_1 = require('@neo-one/cli')
const util = require('util')
const { spawn } = require('child_process')

module.exports = {


  friendlyName: 'Verify',


  description: 'Verify Neo-One installation.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    const p = spawn(sails.config.globals.neoone.serverPath, ['verify'])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })

    // All done.
    return

  }


};
