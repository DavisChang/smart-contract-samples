// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/14ca3aeb798d9b9be31df86ae7ef8b8f760caa4c/contracts/access/Ownable.sol";

contract SharedWallet is Ownable {
    event Received(address, uint);
    mapping(address => uint) public allowance;

    modifier ownerOrAllance(uint _amount) {
        require(owner() == msg.sender || allowance[msg.sender] >= _amount, "You are not allowed");
        _;
    }
    
    function addAllowance(address _who, uint _amount) public onlyOwner {
        allowance[_who] = _amount;
    }

    function reduceAllowance(address _who, uint _amount) internal {
        allowance[_who] -= _amount;
    }

    function withdrawMoney(address payable _to, uint _amount) public ownerOrAllance(_amount) {
        require(_amount <= address(this).balance, "There are not enough funds in this smart contract");
        if (owner() != msg.sender) {
            reduceAllowance(msg.sender, _amount);
        }
        _to.transfer(_amount);
    }

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
}
