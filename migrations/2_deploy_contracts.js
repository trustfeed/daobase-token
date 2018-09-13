const DaobaseTokenFactory = artifacts.require('./DaobaseTokenFactory.sol');

module.exports = function (deployer, network, accounts) {
  const openingTime = Date.now() / 1000;
  const closingTime = openingTime + 100 * 60 * 60 * 24;
  const rate = 10000;
  const hardCap = 25000;
  const softCap = 5000;
  const name = 'DaobaseToken';
  const symbol = 'DBT';
  const decimals = 18;
  const init = 10000000000;
   return deployer
    .then(() => {
      return deployer
    .deploy(
      DaobaseTokenFactory,
      [accounts[0], accounts[1]],
      name,
      symbol,
      decimals,
      init,
      openingTime,
      closingTime,
      rate,
      hardCap,
      softCap);
  });
}
