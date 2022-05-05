// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract SupplyChain {
    enum State { Created, Paid, Delivered }

    struct S_Item {
        string _identifier;
        uint _itemPrice;
        State _state;
    }

    mapping(uint => S_Item) public items;
    uint itemIndex;

    event SupplyChainStep(uint _itemIndex, uint _step);

    function createItem(string memory _identifier, uint _itemPrice) public {
        items[itemIndex]._identifier = _identifier;
        items[itemIndex]._itemPrice = _itemPrice;
        items[itemIndex]._state = State.Created;
        emit SupplyChainStep(itemIndex, uint(State.Created));
        itemIndex++;
    }

    function triggerPayment(uint _itemIndex) public payable {
        require(items[_itemIndex]._itemPrice == msg.value, "Only full payments accepted");
        require(items[_itemIndex]._state == State.Created, "Item state must in Created");
        items[_itemIndex]._state = State.Paid;
        emit SupplyChainStep(_itemIndex, uint(State.Paid));
    }

    function triggerDispatch(uint _itemIndex) public {
        require(items[_itemIndex]._state == State.Paid, "Item state must in Paid");
        items[_itemIndex]._state = State.Delivered;
        emit SupplyChainStep(_itemIndex, uint(State.Delivered));
    }
}
