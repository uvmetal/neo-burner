module.exports = {


  friendlyName: 'View redeem login',


  description: 'Display "Login" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/redeem/redeem-login',
    },

    redirect: {
      description: 'The requesting user is already logged in.',
      responseType: 'redirect'
    }

  },


  fn: async function () {

    // if (this.req.me) {
    //   throw {redirect: '/redeem/view-redeem-login'};
    // }

    return {};

  }


};
