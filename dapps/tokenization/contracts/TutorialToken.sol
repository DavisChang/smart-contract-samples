// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TutorialToken is ERC20 {
    constructor() ERC20("TutorialToken", "TT") {
        _mint(msg.sender, 12000 * 10 ** 18);
    }
}
