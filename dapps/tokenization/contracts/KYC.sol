// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract KYC is Ownable {
  mapping(address => bool) allowed;

  function setKycCompleted(address _address) public onlyOwner {
    allowed[_address] = true;
  }
  
  function setKycRevoked(address _address) public onlyOwner {
    allowed[_address] = false;
  }

  function completeKyc(address _address) public view returns(bool) {
    return allowed[_address];
  }
}
