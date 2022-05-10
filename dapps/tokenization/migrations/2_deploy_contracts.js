const SimpleStorage = artifacts.require("SimpleStorage");
const TutorialToken = artifacts.require("TutorialToken");
const ComplexStorage = artifacts.require("ComplexStorage");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  const initialSupply = 1000000;
  deployer.deploy(TutorialToken, initialSupply);
  deployer.deploy(ComplexStorage);
};
