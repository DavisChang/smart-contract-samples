import { useEffect, useState } from 'react';
import './App.css';
import getWeb3 from "./utils/getWeb3";
import TutorialToken from "./contracts/TutorialToken.json"
import TokenSale from "./contracts/TokenSale.json"
import KYC from "./contracts/KYC.json"

function App() {
  const [Web3, setWeb3] = useState({});
  const [accounts, setAccounts] = useState([]);
  const [instances, setInstances] = useState({});
  const [kycAddress, setKycAddress] = useState('');

  useEffect(() => {
    const init = async () => {
      const Web3 = await getWeb3();
      const accounts = await Web3.eth.getAccounts();
      const networkId = await Web3.eth.net.getId();
      const tutorialTokenInstance = new Web3.eth.Contract(
        TutorialToken.abi,
        TutorialToken.networks[networkId] && TutorialToken.networks[networkId].address
      );
      const tokenSaleInstance = new Web3.eth.Contract(
        TokenSale.abi,
        TokenSale.networks[networkId] && TokenSale.networks[networkId].address
      );
      const kycInstance = new Web3.eth.Contract(
        KYC.abi,
        KYC.networks[networkId] && KYC.networks[networkId].address
      );

      setWeb3(Web3);
      setAccounts(accounts);
      setInstances({ tutorialTokenInstance, tokenSaleInstance, kycInstance });
    }
    
    init();
  }, [])
  
  console.log('App:', { Web3, accounts, instances })

  const onChangeKyc = (e) => {
    setKycAddress(e.target.value);
  }

  const onSubmitKyc = async () => {
    const { kycInstance } = instances;
    try {
      await kycInstance.methods.setKycCompleted(kycAddress).send({ from: accounts[0] });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="App">
      <h1>TT Token Sale</h1>
      <p>Get your token today!</p>
      <h2>KYC Whitelist</h2>
      <div>
        Address to Allow <input type="text" name="kycAddress" value={kycAddress} onChange={onChangeKyc} />
        <button type="button" onClick={onSubmitKyc} disabled={kycAddress === ''}>Add to Whitelist</button>
      </div>
    </div>
  );
}

export default App;
