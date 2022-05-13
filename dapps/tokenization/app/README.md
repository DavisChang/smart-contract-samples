# Getting Started with Create React App

## How to use web3
If you are using create-react-app version >=5 you may run into issues building. This is because NodeJS polyfills are not included in the latest version of create-react-app. [Web3 and Create-react-app](https://github.com/ChainSafe/web3.js#web3-and-create-react-app)

## Usage

```
// Start Truffle Develop
$ truffle develop
truffle(develop)> migrate

// Use hdwallet-provider to get Metamask account
$ truffle develop
truffle migrate --network ganache_local

// Start project
$ npm install
$ npm start
```


## Let your test account get ether within Metamask
1. Copy private and import to Metamask
2. Use the account we have in Metamask, and create transaction from truffle in order to deploy smart contract (Owner issue)

```
$ truffle develop
truffle(develop)> web3.eth.sendTransaction({ to: "Put your Metamask account address here", from: accounts[0], value: web3.utils.toWei("2", "ether") })
```

## online
[Demo website](https://davischang.github.io/smart-contract-samples/)


