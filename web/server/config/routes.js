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

  '/api/v1/account/logout':                           { action: 'account/logout' },
  'PUT   /api/v1/account/update-password':            { action: 'account/update-password' },
  'PUT   /api/v1/account/update-profile':             { action: 'account/update-profile' },
  'PUT   /api/v1/account/update-billing-card':        { action: 'account/update-billing-card' },
  'PUT   /api/v1/entrance/login':                        { action: 'entrance/login' },
  'POST  /api/v1/entrance/signup':                       { action: 'entrance/signup' },
  'POST  /api/v1/entrance/send-password-recovery-email': { action: 'entrance/send-password-recovery-email' },
  'POST  /api/v1/entrance/update-password-and-login':    { action: 'entrance/update-password-and-login' },
  'POST  /api/v1/deliver-contact-form-message':          { action: 'deliver-contact-form-message' },

  // Neo-One API Interface
  'GET /api/v1/neo-one/accounts':                     { action: 'neo-one/accounts' },
  'GET /api/v1/neo-one/blocks':                       { action: 'neo-one/blocks' },
  'GET /api/v1/neo-one/contracts':                    { action: 'neo-one/contracts' },
  'GET /api/v1/neo-one/events':                       { action: 'neo-one/events' },
  'GET /api/v1/neo-one/transactions':                 { action: 'neo-one/transactions' },

  // Neo-One API for server, network, and contract management
  'GET /api/v1/neo-one/server/start':                 { action: 'neo-one/server/start' },
  'GET /api/v1/neo-one/server/status':                { action: 'neo-one/server/status' },
  'GET /api/v1/neo-one/server/stop':                  { action: 'neo-one/server/stop' },

  'GET /api/v1/neo-one/network/activate':             { action: 'neo-one/network/activate' },
  'GET /api/v1/neo-one/network/create':               { action: 'neo-one/network/create' },
  'GET /api/v1/neo-one/network/deactivate':           { action: 'neo-one/network/deactivate' },
  'GET /api/v1/neo-one/network/delete':               { action: 'neo-one/network/delete' },
  'GET /api/v1/neo-one/network/describe':             { action: 'neo-one/network/describe' },
  'GET /api/v1/neo-one/network/get':                  { action: 'neo-one/network/get' },
  'GET /api/v1/neo-one/network/start':                { action: 'neo-one/network/start' },
  'GET /api/v1/neo-one/network/status':               { action: 'neo-one/network/status' },
  'GET /api/v1/neo-one/network/stop':                 { action: 'neo-one/network/stop' },

  'GET /api/v1/neo-one/wallet/activate':              { action: 'neo-one/wallet/activate' },
  'GET /api/v1/neo-one/wallet/create':                { action: 'neo-one/wallet/create' },
  'GET /api/v1/neo-one/wallet/deactivate':            { action: 'neo-one/wallet/deactivate' },
  'GET /api/v1/neo-one/wallet/delete':                { action: 'neo-one/wallet/delete' },
  'GET /api/v1/neo-one/wallet/describe':              { action: 'neo-one/wallet/describe' },
  'GET /api/v1/neo-one/wallet/get':                   { action: 'neo-one/wallet/get' },

  'GET /api/v1/neo-one/neotracker/create':            { action: 'neo-one/neotracker/create' },
  'GET /api/v1/neo-one/neotracker/delete':            { action: 'neo-one/neotracker/delete' },
  'GET /api/v1/neo-one/neotracker/describe':          { action: 'neo-one/neotracker/describe' },
  'GET /api/v1/neo-one/neotracker/get':               { action: 'neo-one/neotracker/get' },
  'GET /api/v1/neo-one/neotracker/start':             { action: 'neo-one/neotracker/start' },
  'GET /api/v1/neo-one/neotracker/status':            { action: 'neo-one/neotracker/status' },
  'GET /api/v1/neo-one/neotracker/stop':              { action: 'neo-one/neotracker/stop' },

  'GET /api/v1/neo-one/init':                         { action: 'neo-one/init' },
  'GET /api/v1/neo-one/bootstrap':                    { action: 'neo-one/bootstrap' },
  'GET /api/v1/neo-one/build':                        { action: 'neo-one/build' },
  'GET /api/v1/neo-one/verify':                       { action: 'neo-one/verify' },
  'GET /api/v1/neo-one/version':                      { action: 'neo-one/version' },

};
