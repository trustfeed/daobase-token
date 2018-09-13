pragma solidity ^0.4.18;

import 'openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol';
import 'openzeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol';
import 'openzeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol';
import 'openzeppelin-solidity/contracts/crowdsale/distribution/RefundableCrowdsale.sol';
import './DaobaseToken.sol';

contract DaobaseCrowdsale is TimedCrowdsale, CappedCrowdsale, RefundableCrowdsale {
	constructor(
    // Start
    uint256 _openingTime,
    // End
    uint256 _closingTime,
    // Price
    uint256 _rate,
    // Owner address (soon to be multi-sig)
    address _wallet,
    // The hard cap
    uint256 _cap,
    // The token
    DaobaseToken _token,
    // The soft cap
    uint256 _goal
  )
    public                                                                                            
    Crowdsale(_rate, _wallet, _token)
    TimedCrowdsale(_openingTime, _closingTime)
    CappedCrowdsale(_cap)
    RefundableCrowdsale(_goal)
  {
    require(_goal <= _cap);
  }
}
