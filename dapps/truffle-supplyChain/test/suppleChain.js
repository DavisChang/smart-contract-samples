const SupplyChain = artifacts.require("../contracts/SupplyChain.sol");
const Item = artifacts.require("../contracts/Item.sol");

contract("SupplyChain", accounts => {
  it("should not have any item", async () => {
    const supplyChainInstance = await SupplyChain.deployed();
    const item = await supplyChainInstance.items(0);
    assert.equal(item._itemPrice, 0);

  });
  it("should be able to add an item and pay the money", async () => {
    const supplyChainInstance = await SupplyChain.deployed();
    const itemName = "test1";
    const cost = 200;
    const index = 0;

    const result = await supplyChainInstance.createItem(itemName, cost,{ from: accounts[0] });
    assert.equal(result.logs[0].args._itemIndex, index);

    const item = await supplyChainInstance.items(index);
    assert.equal(item._identifier, itemName);
    assert.equal(item._itemPrice, cost);

    const itemAddress = item._item;
    const itemInstance = await Item.at(itemAddress);
    assert.equal(await itemInstance.index(), index);

    // Not pay yet
    assert.equal(await itemInstance.pricePaid(), 0);

    // pay the money
    await itemInstance.send(cost);
    assert.equal(await itemInstance.pricePaid(), cost);
  });
});
