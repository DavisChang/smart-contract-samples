## Tokenization

Add .env into this project

```
INITIAL_TOKEN_SUPPLY = 1000000
MNEMONIC = "Add your Mnemonic Phrase...."
```

## Usage

```
$ npm install truffle -g

// Start Truffle Develop
$ truffle develop
truffle(develop)> migrate
truffle(develop)> test

// Use hdwallet-provider to get Metamask account
$ truffle develop
truffle migrate --network ganache_local

// Start project
$ npm install
$ npm start
```