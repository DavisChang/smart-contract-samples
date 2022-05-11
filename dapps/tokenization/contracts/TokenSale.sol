// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Crowdsale.sol";

contract TokenSale is Crowdsale {
  constructor(uint256 rate, address payable wallet, IERC20 token) Crowdsale(rate, wallet, token) {
  }
}
