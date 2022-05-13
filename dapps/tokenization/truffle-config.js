const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config({ path: "./.env" });
const mnemonicPhrase = process.env.MNEMONIC || 'add MNEMONIC into .env';

const provider = new HDWalletProvider({
  mnemonic: mnemonicPhrase,
  providerOrUrl: "http://127.0.0.1:8545",
  addressIndex: 0
});

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  networks: {
    develop: { // default with truffle unbox is 7545, but we can use develop to test changes, ex. truffle migrate --network develop
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    ganache_local: { // truffle(develop)> truffle migrate --network ganache_local
      provider: function() {
        return provider;
      },
      network_id: "*"
    },
    rinkeby_infura: { // truffle(develop)> truffle migrate --network rinkeby_infura
      provider: function() {
        return new HDWalletProvider({
          mnemonic: mnemonicPhrase,
          providerOrUrl: "https://rinkeby.infura.io/v3/e4e78d6fafca40e880b03921dcc20422",
          addressIndex: 0
        });
      },
      network_id: 4
    },
  },
  // Compilers <https://trufflesuite.com/docs/truffle/reference/configuration/#solc>
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  },
};
