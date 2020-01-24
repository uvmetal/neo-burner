module.exports = {


  friendlyName: 'Logout',


  description: 'Logout redeem.',


  inputs: {

  },


  exits: {
    success: {
      description: 'The requesting user agent has been successfully logged out of the redeem process.'
    },

    redirect: {
      description: 'The requesting user agent looks to be a web browser.',
      extendedDescription: 'After logging out from a web browser, the user is redirected away.',
      responseType: 'redirect'
    }
  },


  fn: async function (inputs) {

    delete this.req.session.accountToRedeem

    if (!this.req.wantsJSON) {
      throw {redirect: '/login'};
    }
  }


};
