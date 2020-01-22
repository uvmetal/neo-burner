module.exports = {


  friendlyName: 'View account overview',


  description: 'Display "Account Overview" page.',


  exits: {

    success: {
      // viewTemplatePath: 'pages/redeem/redeem-account-overview',
      description: 'The requesting data for the account has been successfully logged in.',

    }

  },


  fn: async function (req, res) {


    sails.log.debug(this.req.session.accountToRedeem)
    return this.req.session.accountToRedeeom

    return exits.success({
       message: 'User has been created successfully.',
       data: this.req.session.accountToRedeem
    })
  }

};
