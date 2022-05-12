require("dotenv").config({ path: "../.env" });
const {
  BN,           // Big Number support
  constants,    // Common constants, like the zero address and largest integers
  expectEvent,  // Assertions for emitted events
  expectRevert, // Assertions for transactions that should fail
} = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const Token = artifacts.require("TutorialToken");
const TokenSale = artifacts.require("TokenSale");
const KYC = artifacts.require("KYC");

contract("TokenSale", accounts => {

  const [deployerAccount, recipient, anotherAccount] = accounts;

  beforeEach( async () => {
    this.myToken = await Token.deployed();
    this.myTokenSale = await TokenSale.deployed();
  });

  it("should not have any token in deployerAccount", async () => {
    const instance = this.myToken;
    const deployerBalance = await instance.balanceOf(deployerAccount);
    expect(deployerBalance).to.be.bignumber.equal(new BN(0));
  });

  it("should have all tokens in TokenSale smart contract", async () => {
    const instance = this.myToken;
    const tokenSaleBalance = await instance.balanceOf(this.myTokenSale.address);
    const totalSupply = await instance.totalSupply();
    expect(tokenSaleBalance).to.be.bignumber.equal(totalSupply);
  });

  it("should be able to buy some tokens", async () => {
    const initialBalance = await this.myToken.balanceOf(anotherAccount);
    const kycInstance = await KYC.deployed();

    await kycInstance.setKycCompleted(anotherAccount, { from: deployerAccount });
    const kycStatus = await kycInstance.completeKyc(anotherAccount);
    expect(kycStatus).to.be.equal(true);

    expectEvent(
      await this.myTokenSale.sendTransaction({
        from: anotherAccount,
        value: web3.utils.toWei("10", "wei")
      }),
      'TokensPurchased',
      {
        purchaser: anotherAccount,
        value: web3.utils.toWei("10", "wei"),
      }
    );
    expect(await this.myToken.balanceOf(anotherAccount)).to.be.bignumber.equal(initialBalance + 10);
  });
});
