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
$ truffle develop             // Truffle Development
truffle(develop)> compile     // Truffle Compile
truffle(develop)> migrate     // Truffle Migrate
truffle(develop)> test        // Truffle Test contracts

$ cd client && npm run start  // Run dev server
$ cd client && npm test       // Test dapp
$ cd client && npm run build  // Build for production
```

### Import Truffle Generated Account To Metamask
Copy a account private key, then open Metamask to click "Import Account"


### Infura

Create a new project in [Infura](https://infura.io/). Deploy smart contract to Rinkeby network.

```
$ truffle develop
truffle(develop)> truffle migrate --network rinkeby_infura // Migrate to Rinkeby network
```
