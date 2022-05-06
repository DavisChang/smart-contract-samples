# smart-contract-samples

## Getting Started

Get Ganache UI - https://trufflesuite.com/ganache/

```
$ npm install -g ganache

// Truffle v5.5.12 - a development framework for Ethereum
$ npm install -g truffle
```

## Development

- Developer Networks (Ganache)
    - Unit testing
    - Fast
    - Non-Persistent
- Test Networks
    - Persistent, but can be deleted
    - Real-Blockchain
    - Beta Release
- Main Network
    - Persistent
    - Real-Blockchain
    - Costs Money

## Truffle

A development framework for Ethereum. [Link](https://trufflesuite.com/boxes/react/)

```
// install project
$ truffle unbox react

// Truffle Development
$ truffle develop
// Truffle Compile
truffle(develop)> compile
// Truffle Migrate
truffle(develop)> migrate
// Truffle Test contracts
truffle(develop)> test

// Run dev server
$ cd client && npm run start
// Test dapp
$ cd client && npm test
// Build for production
$ cd client && npm run build
```

### Import Truffle Generated Account To Metamask

Copy a account private key, then open Metamask to click "Import Account"

