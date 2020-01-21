/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝
  'GET /':                   { action: 'view-homepage-or-redirect' },
  'GET /welcome/:unused?':   { action: 'dashboard/view-welcome' },

  'GET /faq':                { action:   'view-faq' },
  'GET /legal/terms':        { action:   'legal/view-terms' },
  'GET /legal/privacy':      { action:   'legal/view-privacy' },
  'GET /contact':            { action:   'view-contact' },

  'GET /signup':             { action: 'entrance/view-signup' },
  'GET /email/confirm':      { action: 'entrance/confirm-email' },
  'GET /email/confirmed':    { action: 'entrance/view-confirmed-email' },

  'GET /login':              { action: 'entrance/view-login' },
  'GET /password/forgot':    { action: 'entrance/view-forgot-password' },
  'GET /password/new':       { action: 'entrance/view-new-password' },

  'GET /account':            { action: 'account/view-account-overview' },
  'GET /account/password':   { action: 'account/view-edit-password' },
  'GET /account/profile':    { action: 'account/view-edit-profile' },


  'GET /redeem-login':       { action: 'entrance/view-redeem-login' },
  'GET /redeem-account':     { action: 'redeem/redeem-account-overview' },


  //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗   ┬   ╔╦╗╔═╗╦ ╦╔╗╔╦  ╔═╗╔═╗╔╦╗╔═╗
  //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗  ┌┼─   ║║║ ║║║║║║║║  ║ ║╠═╣ ║║╚═╗
  //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝  └┘   ═╩╝╚═╝╚╩╝╝╚╝╩═╝╚═╝╩ ╩═╩╝╚═╝
  '/terms':                   '/legal/terms',
  '/logout':                  '/api/v1/account/logout',


  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝
  // …


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  // Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
  // from the Parasails library, or by using those method names as the `action` in <ajax-form>.

  // redeem user functions
  // -----------------------------------------------
  // 'POST /api/v1/redeem/login': { action: 'redeem/login' },
  'PUT /api/v1/redeem/do-redeem-login': { action: 'redeem/do-redeem-login' },
  'POST /api/v1/redeem/do-redeem-login': { action: 'redeem/do-redeem-login' },

  'POST /api/v1/redeem/logout': { action: 'redeem/logout' },

  // This should only be accessible by a private key paper wallet / qr wallet holder.
  // The destination is the address of the mobile or desktop wallet as setup during the redemption wizard in burner.
  // Payout should be triggered for next payout round if within the redemption payout window
  'POST /api/v1/redeem/set-payout-address': { action: 'redeem/set-payout-address' },


  // admin user management functions
  // -----------------------------------------------
  // login (email, pasword)
  'POST /api/v1/admin/login': { action: 'admin/login' },

  // logout (email, password)
  'POST /api/v1/admin/logout': { action: 'admin/logout' },

  // list admins
  'POST /api/v1/admin/list': { action: 'admin/list' },

  // add admin (email, password)
  'POST /api/v1/admin/add': { action: 'admin/add' },

  // remove admin (email, password, keepUserAccount)
  'DELETE /api/v1/admin/remove': { action: 'admin/remove' },

  // edit admin (emai, password, walletPermissions)
  'PATCH /api/v1/admin/edit': { action: 'admin/edit' },


  // admin event management functions
  // -----------------------------------------------
  // add event
  'POST /api/v1/admin/event/add': { action: 'admin/event/add' },

  // list events
  'POST /api/v1/admin/event/list': { action: 'admin/event/list' },

  // remove event
  'DELETE /api/v1/admin/event/remove': { action: 'admin/event/remove' },

  // edit event
  'PATCH /api/v1/admin/event/edit': { action: 'admin/event/edit' },

  // add accounts to event
  'POST /api/v1/admin/event/add-accounts': { action: 'admin/event/add-accounts' },

  // remove accounts fromt event
  'DELETE /api/v1/admin/event/remove-accounts': { action: 'admin/event/remove-accounts' },

  // show status report of event -- all payouts, redemptions, which wallets, IPs, etc
  'POST /api/v1/admin/event/report': { action: 'admin/event/report' },


  // admin wallet management functions
  // -----------------------------------------------
  // create wallet
  'POST /api/v1/admin/wallet/create': { action: 'admin/wallet/create' },

  // delete wallet
  'DELETE /api/v1/admin/wallet/delete': { action: 'admin/wallet/delete' },

  // list wallets
  'POST /api/v1/admin/wallet/list': { action: 'admin/wallet/list' },

  // view wallet
  'GET /admin/wallet/view': { action: 'admin/wallet/view' },

  // send funds from wallet / defund wallet
  'POST /api/v1/admin/wallet/defund-wallet': { action: 'admin/wallet/defund-wallet' },

  // link events to wallet
  'POST /api/v1/admin/wallet/link-events': { action: 'admin/wallet/link-events' },

  // set wallet maintenance period
  'PATCH /api/v1/admin/wallet/edit-maintenance': { action: 'admin/wallet/edit-maintenance' },

  // set wallet admin permissions
   'PATCH /api/v1/admin/wallet/edit-permissions': { action: 'admin/wallet/edit-permissions' },



  '/api/v1/account/logout':                           { action: 'account/logout' },
  'PUT   /api/v1/account/update-password':            { action: 'account/update-password' },
  'PUT   /api/v1/account/update-profile':             { action: 'account/update-profile' },
  'PUT   /api/v1/account/update-billing-card':        { action: 'account/update-billing-card' },
  'PUT   /api/v1/entrance/login':                        { action: 'entrance/login' },
  'POST  /api/v1/entrance/signup':                       { action: 'entrance/signup' },
  'POST  /api/v1/entrance/send-password-recovery-email': { action: 'entrance/send-password-recovery-email' },
  'POST  /api/v1/entrance/update-password-and-login':    { action: 'entrance/update-password-and-login' },
  'POST  /api/v1/deliver-contact-form-message':          { action: 'deliver-contact-form-message' },
};
