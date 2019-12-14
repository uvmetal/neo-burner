module.exports = {


  friendlyName: 'Transactions',


  description: 'Neo-One Transactions',


  inputs: {
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

  },


  fn: async function (inputs) {

    // All done.
    return;

  }


};
