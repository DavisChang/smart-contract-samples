// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/14ca3aeb798d9b9be31df86ae7ef8b8f760caa4c/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/14ca3aeb798d9b9be31df86ae7ef8b8f760caa4c/contracts/utils/math/SafeMath.sol";

contract Allowance is Ownable {
    using SafeMath for uint;
    event AllowanceChanged(address indexed _forWho, address indexed _fromWho, uint _oldAmount, uint _newAmount);
    mapping(address => uint) public allowance;

    modifier ownerOrAllance(uint _amount) {
        require(owner() == msg.sender || allowance[msg.sender] >= _amount, "You are not allowed");
        _;
    }
    
    function addAllowance(address _who, uint _amount) public onlyOwner {
        emit AllowanceChanged(_who, msg.sender, allowance[_who], _amount);
        allowance[_who] = _amount;
    }

    function reduceAllowance(address _who, uint _amount) internal {
        emit AllowanceChanged(_who, msg.sender, allowance[_who], SafeMath.sub(allowance[_who], _amount));
        allowance[_who] = SafeMath.sub(allowance[_who], _amount);
    }
}

contract SharedWallet is Allowance {
    event ReceivedMoney(address indexed _who, uint _amount);
    event WithdrawnMoney(address indexed _from, address indexed _to, uint _amount);

    function renounceOwnership() public view override onlyOwner {
        revert("Can't renounce ownership");
    }

    function withdrawMoney(address payable _to, uint _amount) public ownerOrAllance(_amount) {
        require(_amount <= address(this).balance, "There are not enough funds in this smart contract");
        if (owner() != msg.sender) {
            reduceAllowance(msg.sender, _amount);
        }
        emit WithdrawnMoney(msg.sender, _to, _amount);
        _to.transfer(_amount);
    }

    receive() external payable {
        emit ReceivedMoney(msg.sender, msg.value);
    }
}
