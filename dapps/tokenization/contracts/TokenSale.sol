// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Crowdsale.sol";
import "./KYC.sol";

contract TokenSale is Crowdsale {
  KYC kyc;
  constructor(
    uint256 rate,
    address payable wallet,
    IERC20 token,
    KYC _kyc
  ) Crowdsale(rate, wallet, token) {
    kyc = _kyc;
  }

  function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override {
    super._preValidatePurchase(beneficiary, weiAmount);
    require(kyc.completeKyc(msg.sender), "KYC not completed, purchase not allow");
  }
}
