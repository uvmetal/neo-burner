
# Neo-Burner

![neo-burner](/src/images/neo-burner-burning-logo-alt-3.png?raw=true "neo-burner")
![neo-burner](/src/images/neo-burner-ss.png?raw=true "neo-burner")

neo-burner is the electron desktop frontend for neo-paper CLI. neo-burner-web is the react frontend to a sails API for event administration and user conversion.

Create Neo "burner" wallet that will facilitate the requirements mentioned in [Workflow](#workflow) below. The goal is to translate event participation to measurable Neo Smart Economy wallet conversion with event management, tracking, and reporting.

This project leverages earlier work for the paper wallet [neo-paper](https://github.com/cityofzion/neo-paper).

 This version currently does not support wallet conversion, i.e., it can generate accounts linked to events and their respective PDFs for print out, but the web piece is in dev so any conversion would have to be done through the provided neo-burner paper wallet URL configuration, if needed. Skip to [Feature List](#feature-list) for full detail.

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

## Neo-Burner

## Technology
* Node.js
* Electron
* React
* Neon-js

## Workflow

This sections describes the overall process at a high level. There are three main parts: an event organizer interface or UI/UX, an event attendee interface, and a database component that works with these.

1. **Event Organizer** requires a simple interface that allows the following:

  1.1. Generate a unique "burner account" address/private key with QR code representation for each event attendee.

  1.2. Link each burner account to an event that has a configurable amount of Neo/Gas associated for receipt within a configurable time-limit via a database where the following must be met:

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

  2.1. Capture a QR code by web or mobile that loads in an account address/private key that is already linked to a database as described above.

  2.2. In order to claim the funds the event attendee will need to have downloaded a full wallet from the Neo Smart Economy.

  2.3. The attendee UI/UX will provide a wizard process where the following flow occurs:

    1. User is presented with an interface to scan a QR code.

    2. The QR code loads event detail information and messages from the organizer into the UI/UX that at minimum displays event detail and an amount of Neo or Gas that can be claimed if the requirements are met.

    3. The user accepts and clicks a link from a list of Neo Smart Economy wallet download links to download a wallet. This link **MUST** internally track which wallet was downloaded so that it can be communicated to the database for tracking. Ideally, the database / api server will furnish an event record that will correlate and track wallet download redirect so a report of event wallet conversion can be estimated.

    4. User leaves burner wallet and installs the wallet software and generates an account. This process should be clear and documented with an information interface that can easily be returned to if the user loses his place in this wizard.

    5. Have a shortcut burner wallet event attendee UI/UX button where the wallet and address that was used/generated can be entered.

    6. User initiates transfer to the wallet account.

    7. User event attendee interface contacts database with the following information:

     1. Event ID

     2. Wallet that the user installed

     3. Address of the account created in the wallet

    8. Database checks that the time limit for the event ID is valid and, if so, sends the funds to the wallet.

    9. User is presented a confirmation message and transaction ID link.

3. **Database** must be written that does the following:

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
  * Additional point-of-sale (PoS) system to accompany mobile product. (Potential integration of Neow3j tools https://github.com/neow3j/neow3j)
  * Support for suggesting wallets.
  * Support for URL links.
  * Support for simple ability to change UI (i.e., for differing events or outreach).
* Nice to Have
  * Ability to airdrop non-fungible tokens (NFT) to previously active wallet addresses.
  * Ability to integrate a quiz or interactive feature.
* Does Have
	* Account generation
	* Save/Export generated accounts
	* Import accounts previously generated
	* Customize HTML template (images, layout, etc) by specifying a location to export the default template. You then customize that.
	* Generate a PDF from the default or customized HTML template
	* There is currently no in-app HTML editor: DIY4NOW
	* Saves user settings (paths, filenames, templates, etc) in electron user data settings so they can be recalled between desktop sessions.


# Install Software

`yarn`

# Development

Run an interactive dev version packaged with Electron. This is currently the only method that will generate a working neo-burner desktop app. This version currently does not support wallet conversion, i.e., it can generate accounts linked to events and their respective PDFs for print out, but the web piece is in dev so any conversion would have to be done through the provided neo-burner paper wallet URL configuration.

`yarn dev`

Run an interactive dev react version.

`yarn start`

## Build

Only build the software. Do not package it.

`yarn prepack` or `yarn build`

## Create the Package

To build a Linux .deb package for amd64 run the command below. Note: this is still being tested. It should work at this point on Ubuntu 18.04, but stick to `yarn dev` if you need to generate some paper wallets for an event and `yarn dist` isn't working.

NOTE: Dark mode doesn't work in the dist .deb package.

NOTE: The .deb package is a bit of a kludge right now as the node_modules required for several pdf parts are included in the public folder during `yarn dist`.

To build and package a distribution file with Electron and send it to the `./dist/` folder do:

`yarn dist`

## Run or Install the Package

This isn't necessary for this project, but is left to be reviewed for later. You may need to change the version number in your package name, i.e.: `neo-burner\ 0.0.4.AppImage` to whatever you see in the `./dist` folder.

The following should be suitable to install on Linux. This has been tested on Ubuntu 18.04

```
cd ./dist
./neo-burner\ 0.9.0.AppImage
```

For complete installation on Ubuntu 18.04 Linux to default directory /opt/ use:

```
cd ./dist
sudo dpkg -i neo-burner_0.9.0_amd64.deb
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

-	Complete "neo-burner-server". This is a web piece that allows paper wallets created by neo-burner to be converted to other wallets, if completed within a given time period, to receive limited-time special-offer event-specific payout to the new address created in the new wallet.
- Refine UI
- Lots more testing
- Maybe implement an in-app HTML editor to modify the default template used for PDF generation.


# Learn More
