const {
  decodeLogs
} = require('../helpers/decodeLogs');

var DaobaseTokenFactory = artifacts.require('DaobaseTokenFactory');
var DaobaseToken = artifacts.require('DaobaseToken');
var DaobaseCrowdsale = artifacts.require('DaobaseCrowdsale');

const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract('DaobaseToken', function ([creator, _]) {
  let instance, crowdsale, crowdsaleAddr, token;
  DaobaseTokenFactory.deployed()
    .then(i => {
      instance = i;
      return instance.crowdsale.call();
    }).then(c => {
        let crowdsaleFactory = web3.eth.contract(DaobaseCrowdsale.abi);
        crowdsale = crowdsaleFactory.at(c);
        crowdsaleAddr = c;
        return instance.token.call();
    }).then(t => {
      let tokenFact = web3.eth.contract(DaobaseToken.abi);
      token = tokenFact.at(t);
    })
    .catch(console.log);

  it('has a name', async function () {
    (await token.name()).should.equal('DaobaseToken');
  });

  it('has a symbol', async function () {
    (await token.symbol()).should.equal('DBT');
  });

  it('has 18 decimals', async function () {
    (await token.decimals()).should.be.bignumber.equal(18);
  });

  it('assigns the initial total supply to the crowdsale', async function () {
    const totalSupply = await token.totalSupply();
    const crowdsaleBalance = await token.balanceOf(crowdsaleAddr);

    crowdsaleBalance.should.be.bignumber.equal(totalSupply);
  });
});