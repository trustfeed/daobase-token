module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 7545,
      'network_id': '*' // Match any network id
    },
    rinkeby: {
      host: 'localhost', // Connect to geth on the specified
      port: 8545,
      'network_id': 4, // 4 - rinkeby
      gas: 5612388, // Gas limit used for deploys
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};

// $ geth --rinkeby --rpc --rpcapi db,eth,net,web3,personal --unlock="0xc24f4e6056ef68b9468028b004e347f71b43b9ed"