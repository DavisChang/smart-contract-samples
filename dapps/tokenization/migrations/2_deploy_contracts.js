require("dotenv").config({ path: "../.env" });
const { web3 } = require("@openzeppelin/test-helpers/src/setup");
const SimpleStorage = artifacts.require("SimpleStorage");
const ComplexStorage = artifacts.require("ComplexStorage");

const TutorialToken = artifacts.require("TutorialToken");

module.exports = async (deployer) => {
  await deployer.deploy(SimpleStorage);
  await deployer.deploy(ComplexStorage);

  const initialSupply = process.env.INITIAL_TOKEN_SUPPLY;
  await deployer.deploy(TutorialToken, initialSupply);
};
