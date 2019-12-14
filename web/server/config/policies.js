/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  '*': 'is-logged-in',

  // Bypass the `is-logged-in` policy for:
  'entrance/*': true,
  'account/logout': true,
  'view-homepage-or-redirect': true,
  'view-faq': true,
  'view-contact': true,
  'legal/view-terms': true,
  'legal/view-privacy': true,
  'deliver-contact-form-message': true,
  'neo-one/accounts': true,
  'neo-one/blocks': true,
  'neo-one/contracts': true,
  'neo-one/events': true,
  'neo-one/transactions': true,

  'neo-one/network/start': true,
  'neo-one/network/stop': true,
  'neo-one/network/status': true,

  'neo-one/server/start': true,
  'neo-one/server/stop': true,
  'neo-one/server/status': true,

};
