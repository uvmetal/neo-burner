const cli_1 = require('@neo-one/cli')
const rxjs_1 = require("rxjs")
const server_client_1 = require("@neo-one/server-client")
const sqlite3 = require('sqlite3')
const promisify = require('bluebird')
const util = require('util')

module.exports = {

  friendlyName: 'Blocks',


  description: 'Neo-One Blocks',


  inputs: {
    index: {
      description: 'The index number of the block to look up. Block 0 is the first.',
      // By declaring a numeric example, Sails will automatically respond with `res.badRequest`
      // if the `userId` parameter is not a number.
      type: 'number',
      // By making the `userId` parameter required, Sails will automatically respond with
      // `res.badRequest` if it's left out.
      required: false
    },
    rpcurl: {
      description: 'The url of the RPC node to use.',
      // By declaring a numeric example, Sails will automatically respond with `res.badRequest`
      // if the `userId` parameter is not a number.
      type: 'string',
      // By making the `userId` parameter required, Sails will automatically respond with
      // `res.badRequest` if it's left out.
      required: false
    },
    network: {
      description: 'The Neo-One private net instance to use.',
      // By declaring a numeric example, Sails will automatically respond with `res.badRequest`
      // if the `userId` parameter is not a number.
      type: 'string',
      // By making the `userId` parameter required, Sails will automatically respond with
      // `res.badRequest` if it's left out.
      required: false
    }
  },


  exits: {
    // blocks: {
    //   statusCode: 200,
    //   responseType: 'jsonResponse',
    //   description: 'Return the block.'
    // }
  },


  fn: async function (inputs) {
    let req = this.req
    let res = this.res
    let rpcurl = inputs.rpcurl ? inputs.rpcurl : 'https://test1.cityofzion.io'
    let index = 0

    console.log('inputs: '+util.inspect(inputs, {depth: null}))

    const provider = new sails.Neon.api.neoscan.instance("TestNet")

    return provider.getRPCEndpoint().then(nodeUrl => {

      const client = sails.Neon.default.create.rpcClient(nodeUrl)

      return client.getBlockCount().then(count => {

        index = inputs.index ? inputs.index : count-1

        console.log('index: ' + index)

        return client.getBlock(index).then(response => {
          res.json(response)
        }).catch(error => {
          res.status(400).json(error)
        })
      }).catch(error => {
        res.status(400).json(error)
        return
      })
    }).catch(error => {
      res.status(400).json(error)
    })

    // All done.
    // return
  }
}
