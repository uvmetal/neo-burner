/**
 * cloud.setup.js
 *
 * Configuration for this Sails app's generated browser SDK ("Cloud").
 *
 * Above all, the purpose of this file is to provide endpoint definitions,
 * each of which corresponds with one particular route+action on the server.
 *
 * > This file was automatically generated.
 * > (To regenerate, run `sails run rebuild-cloud-sdk`)
 */

Cloud.setup({

  /* eslint-disable */
  methods: {"confirmEmail":{"verb":"GET","url":"/email/confirm","args":["token"]},"redeemAccountOverview":{"verb":"GET","url":"/redeem-account","args":[]},"doRedeemLogin":{"verb":"PUT","url":"/api/v1/redeem/do-redeem-login","args":["data","type"]},"logout":{"verb":"GET","url":"/api/v1/account/logout","args":[]},"setPayoutAddress":{"verb":"POST","url":"/api/v1/redeem/set-payout-address","args":[]},"login":{"verb":"PUT","url":"/api/v1/entrance/login","args":["emailAddress","password","rememberMe"]},"list":{"verb":"POST","url":"/api/v1/admin/wallet/list","args":[]},"add":{"verb":"POST","url":"/api/v1/admin/event/add","args":[]},"remove":{"verb":"DELETE","url":"/api/v1/admin/event/remove","args":[]},"edit":{"verb":"PATCH","url":"/api/v1/admin/event/edit","args":[]},"addAccounts":{"verb":"POST","url":"/api/v1/admin/event/add-accounts","args":[]},"removeAccounts":{"verb":"DELETE","url":"/api/v1/admin/event/remove-accounts","args":[]},"report":{"verb":"POST","url":"/api/v1/admin/event/report","args":[]},"create":{"verb":"POST","url":"/api/v1/admin/wallet/create","args":[]},"delete":{"verb":"DELETE","url":"/api/v1/admin/wallet/delete","args":[]},"view":{"verb":"GET","url":"/admin/wallet/view","args":[]},"defundWallet":{"verb":"POST","url":"/api/v1/admin/wallet/defund-wallet","args":[]},"linkEvents":{"verb":"POST","url":"/api/v1/admin/wallet/link-events","args":[]},"editMaintenance":{"verb":"PATCH","url":"/api/v1/admin/wallet/edit-maintenance","args":[]},"editPermissions":{"verb":"PATCH","url":"/api/v1/admin/wallet/edit-permissions","args":[]},"updatePassword":{"verb":"PUT","url":"/api/v1/account/update-password","args":["password"]},"updateProfile":{"verb":"PUT","url":"/api/v1/account/update-profile","args":["fullName","emailAddress","isSuperAdmin"]},"updateBillingCard":{"verb":"PUT","url":"/api/v1/account/update-billing-card","args":["stripeToken","billingCardLast4","billingCardBrand","billingCardExpMonth","billingCardExpYear"]},"signup":{"verb":"POST","url":"/api/v1/entrance/signup","args":["emailAddress","password","fullName"]},"sendPasswordRecoveryEmail":{"verb":"POST","url":"/api/v1/entrance/send-password-recovery-email","args":["emailAddress"]},"updatePasswordAndLogin":{"verb":"POST","url":"/api/v1/entrance/update-password-and-login","args":["password","token"]},"deliverContactFormMessage":{"verb":"POST","url":"/api/v1/deliver-contact-form-message","args":["emailAddress","topic","fullName","message"]}}
  /* eslint-enable */

});
