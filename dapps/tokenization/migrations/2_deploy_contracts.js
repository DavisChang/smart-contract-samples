require("dotenv").config({ path: "../.env" });
const { web3 } = require("@openzeppelin/test-helpers/src/setup");
const SimpleStorage = artifacts.require("SimpleStorage");
const ComplexStorage = artifacts.require("ComplexStorage");

const TutorialToken = artifacts.require("TutorialToken");
const TokenSale = artifacts.require("TokenSale");
const KYC = artifacts.require("KYC");

module.exports = async (deployer) => {
  await deployer.deploy(SimpleStorage);
  await deployer.deploy(ComplexStorage);

  await deployer.deploy(KYC);
  const initialSupply = process.env.INITIAL_TOKEN_SUPPLY;
  await deployer.deploy(TutorialToken, initialSupply);

  const rate = 1;
  const accounts = await web3.eth.getAccounts();
  await deployer.deploy(TokenSale, rate, accounts[0], TutorialToken.address, KYC.address);
  const instance = await TutorialToken.deployed();
  await instance.transfer(TokenSale.address, initialSupply);
};
