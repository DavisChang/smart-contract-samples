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
$ truffle unbox react 

```

Compile:              truffle compile

Migrate:              truffle migrate

Test contracts:       truffle test

Test dapp:            cd client && npm test

Run dev server:       cd client && npm run start

Build for production: cd client && npm run build
