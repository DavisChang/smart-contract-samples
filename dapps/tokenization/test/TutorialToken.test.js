const {
  BN,           // Big Number support
  constants,    // Common constants, like the zero address and largest integers
  expectEvent,  // Assertions for emitted events
  expectRevert, // Assertions for transactions that should fail
} = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS } = constants;
const { expect } = require('chai');

const TutorialToken = artifacts.require("TutorialToken");

contract("TutorialToken Test", accounts => {
  it("all token should be in account", async () => {
    console.log('test-helpers:', { ZERO_ADDRESS, BN1: new BN(1) });
    
    const instance = await TutorialToken.deployed();
    const totalSupply = await instance.totalSupply();
    const balance = await instance.balanceOf(accounts[0]);

    // same test but different code 
    assert.equal(totalSupply.toNumber(), balance.toNumber(), "The balance was not the same");
    expect(totalSupply).to.be.bignumber.equal(balance);
  });
});
