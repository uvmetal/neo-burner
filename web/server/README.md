# server

A [Sails v1](https://sailsjs.com) API for neo-burner.


### Links

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)


### Version info

<!-- Internally, Sails used [`sails-generate@1.16.13`](https://github.com/balderdashy/sails-generate/tree/v1.16.13/lib/core-generators/new). -->


This project's boilerplate is based on an expanded seed app provided by the [Sails core team](https://sailsjs.com/about) to make it easier for you to build on top of ready-made features like authentication, enrollment, email verification, and billing.  For more information, [drop us a line](https://sailsjs.com/support).


<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->


# Architecture

This project leverages earlier work for the paper wallet [neo-paper](https://github.com/cityofzion/neo-paper), [neo-burner](https://github.com/cityofzion/neo-burner), and [neo-burner-web](https://github.com/cityofzion/neo-burner/web).


## Server

The server API tightly integrates with neo-burner-web (future todo integration of paper/burner) for event administration and user conversion.

## Client

The client is [neo-burner-web](https://github.com/cityofzion/neo-burner/web).


## API Structure

* Admin
  - Login
  - Escrow Wallet Manager (CRUD)
    - per event (see event payout database schema)
    - Escrow Recovery Time and Period
      - If payout window isn't met, any funds allocated for user conversion will be remitted to a configurable admin address.
      - This process should be a regular maintenance process, most likely daily at beginning of day 00:00.
* User
  - Private Key Login
  - Use a redemption nonce? Does this really help?
  - Download Wallet
    - Choose a Wallet (Neon, O3, et al?) and download.
    - Track in database (see event payout database schema)
    - Configure Wallet
    - Setup new address in the new wallet to receive funds
    - Enter the new address and request fund transfer from correlated event escrow wallet to the new wallet
    - Track every step in database. Hot mirror to co-location for **security**?

## Event Payout Database Schema

* Event Name - A string description of the event
* Event URL - A URL for the event website, if any
* Payout Amount - This is how much gets paid on conversion (todo: add triggers other than wallet conversion?)
* Payout Window - This is the window of opportunity. If nothing happens within this date range, no funds are transferred and a maintenance process will recover escrow funds recovery time.
* Payout Account Addresses
  * hasPaid
  * hasDownloaded
  * whichDownload
  * hasLoggedIn
  * loggedInIp
  * despositAccount
* Admin Wallet Address Source

# Future
