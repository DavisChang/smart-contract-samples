import { useEffect, useState } from 'react';
import './App.css';
import getWeb3 from "./utils/getWeb3";
import TutorialToken from "./contracts/TutorialToken.json"
import TokenSale from "./contracts/TokenSale.json"
import KYC from "./contracts/KYC.json"

function App() {
  const [Web3, setWeb3] = useState({});
  const [accounts, setAccounts] = useState([]);
  const [balance, setBalance] = useState(0);
  const [instances, setInstances] = useState({});
  const [kycAddress, setKycAddress] = useState('');
  const [tutorialTokenAddress, setTutorialTokenAddress] = useState('');
  const [tokenSaleAddress, setTokenSaleAddress] = useState('');

  useEffect(() => {
    const init = async () => {
      const Web3 = await getWeb3(setAccounts);
      const accounts = await Web3.eth.getAccounts();
      const networkId = await Web3.eth.net.getId();

      const TutorialTokenAddress = TutorialToken.networks[networkId] && TutorialToken.networks[networkId].address;
      const tutorialTokenInstance = new Web3.eth.Contract(TutorialToken.abi, TutorialTokenAddress);
      

      const TokenSaleAddress = TokenSale.networks[networkId] && TokenSale.networks[networkId].address;
      const tokenSaleInstance = new Web3.eth.Contract(TokenSale.abi, TokenSaleAddress);

      const kycInstance = new Web3.eth.Contract(
        KYC.abi,
        KYC.networks[networkId] && KYC.networks[networkId].address
      );

      await getBalanceByAddress(accounts[0], tutorialTokenInstance);

      setWeb3(Web3);
      setAccounts(accounts);
      setInstances({ tutorialTokenInstance, tokenSaleInstance, kycInstance });
      setTutorialTokenAddress(TutorialTokenAddress);
      setTokenSaleAddress(TokenSaleAddress);

      // listener
      tutorialTokenInstance.events.Transfer({ to: accounts[0] }).on('data', async () => {
        await getBalanceByAddress(accounts[0], tutorialTokenInstance);
      });
    }

    init();
  }, [])
  
  useEffect(() => {
    const { tutorialTokenInstance } = instances;
    const update = async () => {
      await getBalanceByAddress(accounts[0], tutorialTokenInstance);
    }
    if (tutorialTokenInstance) {
      update()
    }
  }, [accounts, instances]);

  const getBalanceByAddress = async (address, tutorialTokenInstance) => {
    const accountBalance = await tutorialTokenInstance.methods.balanceOf(address).call();
    setBalance(accountBalance)
  }

  const onChangeKyc = (e) => {
    setKycAddress(e.target.value);
  }

  const onSubmitKyc = async () => {
    const { kycInstance } = instances;
    try {
      await kycInstance.methods.setKycCompleted(kycAddress).send({ from: accounts[0] });
      alert("KYC is success!");
    } catch (e) {
      console.error(e);
    }
  }

  const onSubmitCheckKyc = async () => {
    const { kycInstance } = instances;
    try {
      const status = await kycInstance.methods.completeKyc(kycAddress).call();
      alert(`${kycAddress}: \n KYC is ${status ? 'complete!!' : 'not complete!!'}`);
    } catch(e) {
      console.error(e);
    }
  }

  const onSubmitBuyTokens = async () => {
    const { tokenSaleInstance } = instances;
    try {
      await tokenSaleInstance.methods
        .buyTokens(accounts[0]).send({ from: accounts[0], value: Web3.utils.toWei('10', 'wei')});
    } catch(e) {
      console.error(e);
    }
  }

  return (
    <div className="App">
      <h1>TT Token Sale</h1>
      <p>Get your token today!</p>
      <h2>KYC Whitelist</h2>
      <div>
        Enter Your Address
        <input type="text" name="kycAddress" value={kycAddress} onChange={onChangeKyc} />
        <button type="button" onClick={onSubmitCheckKyc} disabled={kycAddress === ''}>Check KYC</button>
        <button type="button" onClick={onSubmitKyc} disabled={kycAddress === ''}>Add to Whitelist</button>
      </div>

      <h2>My Balance</h2>
      <p>Wallet Address:  <b>{accounts[0]}</b></p>
      <p>Your Balance: <b>{balance}</b> TT</p>

      <h2>Buy Tokens (1)</h2>
      <p>Token Contract Address: {tutorialTokenAddress}</p>
      <p>If you want to buy tokens, use Metamask to send Wei to this address</p>
      <p>Sale Token Contract Address: <b>{tokenSaleAddress}</b></p>
      <p>Copy address, and send Wei to it </p>

      <h2>Buy Tokens (2)</h2>
      <button type="button" onClick={onSubmitBuyTokens}>Buy 10 Tokens</button>
    </div>
  );
}

export default App;
