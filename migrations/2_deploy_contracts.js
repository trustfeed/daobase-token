const DaobaseToken = artifacts.require('./DaobaseToken.sol');

module.exports = deployer =>
  deployer.deploy(DaobaseToken);