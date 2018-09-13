pragma solidity ^0.4.18;

import './DaobaseWallet.sol';
import './DaobaseToken.sol';
import './DaobaseCrowdsale.sol';

// This is a 'wrapper'. It constructs the token, then the crowdsale.
contract DaobaseTokenFactory {
  DaobaseWallet public wallet;  
  DaobaseToken public token;
  DaobaseCrowdsale public crowdsale;

  constructor(
    // The owners of the token
    address[] _owners,
    // Token name
    string _name,
    // Token symbol
    string _symbol,
    // The decimals for token
    uint8 _decimals,
    // The initial supply for the token
    uint256 _initialSupply,
    // Start time of crowdsale
    uint256 _openingTime,
    // End of crowdsale
    uint256 _closingTime,
    // Price
    uint256 _rate,
    // The hard cap
    uint256 _cap,
    // The soft cap
    uint256 _goal
  ) public {

    require(_owners[0] == msg.sender, "sent from unexpected address");

    wallet = new DaobaseWallet(
      _owners,
      2);
      
    // Create the token
    token = new DaobaseToken(
      _name,
      _symbol,
      _decimals,
      _initialSupply,
      this);

    // Create the crowdsale
    crowdsale = new DaobaseCrowdsale(
      _openingTime,
      _closingTime,
      _rate,
      wallet,
      _cap,
      token,
      _goal);

    // Transfer the initial funds
    token.transfer(crowdsale, _initialSupply);
  }
}
