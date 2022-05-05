// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
contract Item {
    uint public priceInWei;
    uint public index;
    uint public pricePaid;

    SupplyChain parentContract;

    constructor(SupplyChain _parentContract, uint _priceInWei, uint _index) {
        priceInWei = _priceInWei;
        index = _index;
        parentContract = _parentContract;
    }

    receive() external payable {
        require(pricePaid == 0, "Item is paid already");
        require(priceInWei == msg.value, "Only full payments allowed");
        pricePaid += msg.value;
        (bool success, ) = address(parentContract).call{ value: msg.value }(abi.encodeWithSignature("triggerPayment(uint256)", index));
        require(success, "The transaction wasn't successful, canceling");
    }
    fallback() external payable {
        
    }
}

contract SupplyChain {
    enum State { Created, Paid, Delivered }

    struct S_Item {
        Item _item;
        string _identifier;
        uint _itemPrice;
        State _state;
    }

    mapping(uint => S_Item) public items;
    uint itemIndex;

    event SupplyChainStep(uint _itemIndex, uint _step, address _itemAddress);

    function createItem(string memory _identifier, uint _itemPrice) public {
        Item item = new Item(this, _itemPrice, itemIndex);
        items[itemIndex]._item = item;
        items[itemIndex]._identifier = _identifier;
        items[itemIndex]._itemPrice = _itemPrice;
        items[itemIndex]._state = State.Created;
        emit SupplyChainStep(itemIndex, uint(State.Created), address(item));
        itemIndex++;
    }

    function triggerPayment(uint _itemIndex) public payable {
        require(items[_itemIndex]._itemPrice == msg.value, "Only full payments accepted");
        require(items[_itemIndex]._state == State.Created, "Item state must in Created");
        items[_itemIndex]._state = State.Paid;
        emit SupplyChainStep(_itemIndex, uint(State.Paid), address(items[_itemIndex]._item));
    }

    function triggerDispatch(uint _itemIndex) public {
        require(items[_itemIndex]._state == State.Paid, "Item state must in Paid");
        items[_itemIndex]._state = State.Delivered;
        emit SupplyChainStep(_itemIndex, uint(State.Delivered), address(items[_itemIndex]._item));
    }
}
