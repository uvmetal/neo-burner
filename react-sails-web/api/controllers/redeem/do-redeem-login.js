module.exports = {


  friendlyName: 'Redeem Wallet Login',


  description: 'Login to redeem a paper or qr code wallet.',


  inputs: {

    data: {
      type: 'string'
    },

    type: {
      type: 'string'
    },

  },


  exits: {

    success: {
      description: 'The requesting data for the account has been successfully logged in.',
      extendedDescription:
`Under the covers, this stores the id of the logged-in user in the session
as the \`userId\` key.  The next time this user agent sends a request, assuming
it includes a cookie (like a web browser), Sails will automatically make this
user id available as req.session.userId in the corresponding action.  (Also note
that, thanks to the included "custom" hook, when a relevant request is received
from a logged-in user, that user's entire record from the database will be fetched
and exposed as \`req.me\`.)`
    },

    badCombo: {
      description: `The provided data does not match an account.`,
      responseType: 'unauthorized'
      // ^This uses the custom `unauthorized` response located in `api/responses/unauthorized.js`.
      // To customize the generic "unauthorized" response across this entire app, change that file
      // (see api/responses/unauthorized).
      //
      // To customize the response for _only this_ action, replace `responseType` with
      // something else.  For example, you might set `statusCode: 498` and change the
      // implementation below accordingly (see http://sailsjs.com/docs/concepts/controllers).
    }

  },


  fn: async function (inputs,exits) {
    sails.log('inputs: '+inputs.data+' '+inputs.type)

    let privateDataTypeLabel
    let privateDataType = inputs.type
    let privateData = inputs.data
    let address

    // Recover the account from the provided data: bip, wif, or pk
    if (privateDataType === 'bip') {
      address = 'a bip converted address'
      privateDataTypeLabel = 'Mnemonic'
    } else if (type === 'wif') {
      address = 'a wif converted address'
      privateDataTypeLabel = 'WIF'
    } else if (type === 'pk') {
      address = 'a pk converted address'
      privateDataTypeLabel = 'Private Key'
    } else throw 'badCombo'

    let account, event
    // account = await Accounts.findOne({address: address})

    if (account) {
      // Search the event database for an event with that account
      // event =  await Event.findOne({id: this.req.me.id});
    }

    // else throw 'badCombo'

    // If everything works out we'll set up a session object for this account to redeem so the account data can be reviewed.

    sails.log.info('Creating account to redeem session object.')

    let accountToRedeem = {
      eventName: 'mock event name',
      accountAddress: address,
      privateDataTypeLabel: privateDataTypeLabel,
      privateData: privateData
    }

    this.req.session.accountToRedeem = accountToRedeem
    // All done.

    sails.log.debug(this.req.session.accountToRedeem)

    return this.res.status(200).send(accountToRedeem)
  }


};
