require("dotenv").config({ path: "../.env" });
const {
  BN,           // Big Number support
  constants,    // Common constants, like the zero address and largest integers
  expectEvent,  // Assertions for emitted events
  expectRevert, // Assertions for transactions that should fail
} = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS } = constants;
const { expect } = require('chai');

const TutorialToken = artifacts.require("TutorialToken");

contract("TutorialToken", accounts => {

  const [deployerAccount, recipient, anotherAccount] = accounts;
  
  beforeEach( async () => {
    const initialSupply = process.env.INITIAL_TOKEN_SUPPLY;
    this.myToken = await TutorialToken.new(initialSupply);
  });

  it("all tokens should be in account", async () => {
    console.log('test-helpers:', { ZERO_ADDRESS, BN1: new BN(1) });
    
    const instance = this.myToken;
    const totalSupply = await instance.totalSupply();
    const balance = await instance.balanceOf(deployerAccount);

    // same test but different code 
    assert.equal(totalSupply.toNumber(), balance.toNumber(), "The balance was not the same");
    expect(totalSupply).to.be.bignumber.equal(balance);
  });


  it("is possible to send tokens between accounts", async () => {
    const sendToken = new BN(1);
    const instance = this.myToken;
    const totalSupply = await instance.totalSupply();

    const receipt = await instance.transfer(recipient, sendToken);
    expectEvent(receipt, 'Transfer', {
      from: deployerAccount,
      to: recipient,
      value: sendToken,
    });

    expect(await instance.balanceOf(deployerAccount)).to.be.bignumber.equal(totalSupply.sub(sendToken));
    expect(await instance.balanceOf(recipient)).to.be.bignumber.equal(sendToken);
  })

  it("is not posible to send more tokens than available in total", async () => {
    const instance = this.myToken;
    const deployerBalance = await instance.balanceOf(deployerAccount);

    await expectRevert(
      instance.transfer(recipient, new BN(deployerBalance + 1)),
      'ERC20: transfer amount exceeds balance',
    );
    expect(await instance.balanceOf(deployerAccount)).to.be.bignumber.equal(deployerBalance);
  })
});
