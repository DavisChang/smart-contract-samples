// node ganacheTest.js

const Web3 = require('web3');

const GanacheRpcServer = 'http://127.0.0.1:8545';
const web3 = new Web3(new Web3.providers.HttpProvider(GanacheRpcServer));
console.log(web3);

const GanacheAddress1 = '0xa1eF58670368eCCB27EdC6609dea0fEFC5884f09';
const GanacheAddress2 = '0xc2A3cB7d4BF24e456051E3a710057ac61f5dB133';

web3.eth.getBalance(GanacheAddress1)
  .then(data => {
    console.log('getBalance:', data);
    console.log('ether:', web3.utils.fromWei(data));
  });

web3.eth.sendTransaction({
  from: GanacheAddress1,
  to: GanacheAddress2,
  value: web3.utils.toWei('1', 'ether')
}).then(result => {
  console.log('transaction result:', result);
});

// const ABI = 'ABI';
// const contractAddress = 'contractAddress';
// new web3.eth.Contract(ABI, contractAddress);