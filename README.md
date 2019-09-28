
# Neo-Burner

Create Neo burner wallet that will facilitate the requirements mentioned in [Workflow](#workflow) below. The goal is to translate event participation to measurable Neo Smart Economy wallet conversion with event management, tracking, and reporting.


<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Neo-Burner](#neo-burner)
- [Overview](#overview)
	- [Neo-Burner](#neo-burner)
	- [Technology](#technology)
	- [Workflow](#workflow)
	- [Feature List](#feature-list)
- [Install Software](#install-software)
- [Development](#development)
	- [Build](#build)
	- [Create the Package](#create-the-package)
	- [Run or Install the Package](#run-or-install-the-package)
	- [Clean](#clean)
	- [Errors](#errors)
- [Todo](#todo)
	- [Client](#client)
		- [State](#state)
		- [UI Components](#ui-components)
		- [UI Design](#ui-design)
- [Learn More](#learn-more)

<!-- /TOC -->

# Overview

Create Neo burner wallet that will facilitate the requirements mentioned in [Workflow](#workflow) below. The goal is to translate event participation to measurable Neo Smart Economy wallet conversion with event management, tracking, and reporting.

**Please note** the current UI/UX is a skeleton to be redesigned with a familiar and reusable pattern once the project requirements are assured.

## Neo-Burner

## Technology
* Node.js
* Electron
* React
* Redux
* Neon-js
* Smart Contract

## Workflow

This sections describes the overall process at a high level. There are three main parts: an event organizer interface or UI/UX, an event attendee interface, and a smart contract component that works with these.

1. **Event Organizer** requires a simple interface that allows the following:

  1.1. Generate a unique "burner account" address/private key with QR code representation for each event attendee.

  1.2. Link each burner account to an event that has a configurable amount of Neo/Gas associated for receipt within a configurable time-limit via a smart contract where the following must be met:

    1. If the funds for a given burner account are not retrieved within the time-limit they can be recovered by the event organizer.

    2. Reporting Interface: It would be nice to be able to anticipate the need to gather stats on these operations by event, amount, and with feedback as to which wallet was downloaded to retrieve the funds.

    3. Attempts by event attendee interface to recover funds beyond the prescribed time-limit should be declined and clearly explained to the attendee as to why.

  1.3. Print or otherwise digitally share QR codes by some form of messaging (email, text, etc) with event attendees.

  1.4. Start time-limit once all QR codes are distributed or whenever the event organizer desires.

  1.5. Check status of events to see how much time is left, who has claimed, and who hasn't.

  1.6. Close or cancel an event early?

  1.7. Extend or change the time limit?

  1.8. Easy event management setup.

2. **Event Attendee** requires a simple interface to do the following:

  2.1. Capture a QR code by web or mobile that loads in an account address/private key that is already linked to a smart contract as described above.

  2.2. In order to claim the funds the event attendee will need to have downloaded a full wallet from the Neo Smart Economy.

  2.3. The attendee UI/UX will provide a wizard process where the following flow occurs:

    1. User is presented with an interface to scan a QR code.

    2. The QR code loads event detail information and messages from the organizer into the UI/UX that at minimum displays event detail and an amount of Neo or Gas that can be claimed if the requirements are met.

    3. The user accepts and clicks a link from a list of Neo Smart Economy wallet download links to download a wallet. This link **MUST** internally track which wallet was downloaded so that it can be communicated to the smart contract for tracking.

    4. User leaves burner wallet and installs the wallet software and generates an account. This process should be clear and documented with an information interface that can easily be returned to if the user loses his place in this wizard.

    5. Have a shortcut burner wallet event attendee UI/UX button where the wallet and address that was used/generated can be entered.

    6. User initiates transfer to the wallet account.

    7. User event attendee interface ontacts smart contract with the following information:

     1. Event ID

     2. Wallet that the user installed

     3. Address of the account created in the wallet

    8. Smart contract checks that the time limit for the event ID is valid and, if so, sends the funds to the wallet.

    9. User is presented a confirmation message and transaction ID link.

3. **Smart Contract** must be written that does the following:

  3.1. Track and manage events for event organizer interface.

    1. Create and update events by ID.
      * Event ID
      * Event introduction message
      * Event fund transfer completion message
      * Time-limit for event wherein fund transfer requests are valid
      * Recover event statistics by ID

  3.2. Respond to event attendee client interface requests to transfer funds.
  
    1. Track event ID
    2. Track wallet that user installed
    3. Track address of the account created in the wallet
    4. Send funds to the wallet if the time-limit is valid

## Feature List
* Must Have
  * See Workflow above
* Should Have  
  * Additional point-of-sale (PoS) system to accompany mobile product.
  * Support for suggesting wallets.
  * Support for URL links.
  * Support for simple ability to change UI (i.e., for differing events or outreach).
* Nice to Have
  * Ability to airdrop non-fungible tokens (NFT) to previously active wallet addresses.
  * Ability to integrate a quiz or interactive feature.


# Install Software

`yarn`

# Development

Run an interactive dev version packaged with Electron.

`yarn dev`

Run an interactive dev react version.

`yarn start`

## Build

Only build the software. Do not package it.

`yarn prepack` or `yarn build`

## Create the Package

This isn't necessary for this project, but is left to be reviewed for later.

To build and package a distribution file with Electron and send it to the `./dist/` folder do:

`yarn package`

## Run or Install the Package

This isn't necessary for this project, but is left to be reviewed for later.

The following should be suitable to install on Linux. This has been tested on Ubuntu 18.04

```
cd ./dist
./\ 0.1.0.AppImage
```

For complete installation on Ubuntu 18.04 Linux to default directory /opt/ use:

```
cd ./dist
sudo dpkg -i _0.1.0_amd64.deb
sudo chown -R youruser.youruser /opt//
```


## Clean

Delete the ``./dist/`` folder. This can grow quite large.

`yarn clean`

## Errors

If during the course of development on Linux you should encounter an error along the lines of the following please check the instructions at the link below.

```
Error: ENOSPC
```

https://stackoverflow.com/questions/22475849/node-js-what-is-enospc-error-and-how-to-solve?lq=1


# Todo

Create project board for the following:

## Client

The client or front end is the user interface that tightly couples with the server and focuses on presenting those server controls to the user.

### State
(front-end)
* Add state management with redux before the prop passing and state lifting gets out of hand


### UI Components
* Componentize network status button overlay flyout
* Abstract nav away from vertical/horizontal
* Event-driven flyout states
  - I.e., clicking hamburger doesn't close session status automatically
  - Ideally, this could be configurable flag
* Main UI panes do not scroll independently, consider best approach i.e., add scroll or not


### UI Design
* Theme - the current UI design and layout was for testing and example
* Dark Mode
* Flex nav flyout

# Learn More
