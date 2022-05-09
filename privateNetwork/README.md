## Private Network

To create a blockchain node that uses this genesis block, run the following command. This imports and sets the canonical genesis block for your chain.


Start Geth
```
$ geth --syncmode light // "full", "light", "snap"
$ geth attach

// Create a new account
> personal.newAccount()
```

Initializing (Private Network)
```
$ geth init --datadir data genesis.json 
```

Attach
```
$ geth attach data/geth.ipc
$ geth attach data/geth.ipc --exec admin.nodeInfo.enr

// Get accounts
> eth.accounts

// Create a new accounts
> personal.newAccount()

// Mining
> miner.setEtherbase(eth.account[0])
> miner.start(1)
> web3.fromWei(web3.eth.getBalance(eth.accounts[0]), "ether")
```
