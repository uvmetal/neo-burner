# Turn-key Neo Private Nets and Orchestration

## Goals
* Provide developers a "download-and-double-click" solution to deploy a Neo privatenet
* Make system completely GUI-based with no cli knowledge required to operate
* Design modern and attractive UI to show Neo's tooling at the same polish level of Ethereum's
* Provide UX with easy transition for users migrating from Ethereum/Ganache
* Easy integration with other Neo tools like neo-python or neocompiler.io

## Technology
* Node.js
* Electron
* React
* Neon-js
* Neo-One's TypeScript NeoVM implementation

## Feature List
* Must Have
  * Quickstart
  * Accounts browser
  * Blocks browser
  * Transactions browser
  * Logs/Notifications browser
  * Neoscan-compatible API (required for Neon-js)
  * Neo-cli compatible RPC API
  * Contracts browser
  * Dynamic update support
* Should Have  
  * One-click chain reset
  * Blocks created on-demand
* Nice to Have
  * Multiple workspace configurations
  * Contract storage browser
  * Simple chain export and sharing
