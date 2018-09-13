var DaobaseTokenFactory = artifacts.require('DaobaseTokenFactory');
var DaobaseToken = artifacts.require('DaobaseToken');
var DaobaseCrowdsale = artifacts.require('DaobaseCrowdsale');

contract('DaobaseTokenFactory', function (accounts) {
  it('Buy token', function () {
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

        return token.balanceOf.call(crowdsaleAddr);
      }).then(b => {
        console.log('crowdsale balance:', b.valueOf());
        return crowdsale.openingTime.call();
      }).then(o => {
        console.log('opening time:', new Date(o.valueOf() * 1000));
        crowdsale.buyTokens.sendTransaction(
          accounts[5],
          {
            from: accounts[5],
            value: 2000,
            gas: 1000000,
          },
          (err, r) => {
            console.log(err, r);
            token.balanceOf.call(accounts[5], (err, b) => {
              console.log(err, b.valueOf());
            });
          }
        );
      })
      .catch(console.log);
    //
    //        return web3.eth.sendTransaction({
    //          from: accounts[2],
    //          to: crowdsale,
    //          value: '1000',
    //          gas: '1000000',
    //          gasPrice: '1',
    //        });
    //      }).then(r => {
    //    	console.log(r);
    //      });
  });
});
