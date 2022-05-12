import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import getWeb3 from "./utils/getWeb3";
import TutorialToken from "./contracts/TutorialToken.json"
import TokenSale from "./contracts/TokenSale.json"


function App() {
  const [Web3, setWeb3] = useState({});
  const [accounts, setAccounts] = useState([]);
  const [instances, setInstances] = useState({});

  useEffect(() => {
    const init = async () => {
      const Web3 = await getWeb3();
      const accounts = await Web3.eth.getAccounts();
      const networkId = await Web3.eth.net.getId();
      const TutorialTokenInstance = new Web3.eth.Contract(
        TutorialToken.abi,
        TutorialToken.networks[networkId] && TutorialToken.networks[networkId].address
      );
      const TokenSaleInstance = new Web3.eth.Contract(
        TokenSale.abi,
        TokenSale.networks[networkId] && TokenSale.networks[networkId].address
      );

      setWeb3(Web3);
      setAccounts(accounts);
      setInstances({ TutorialTokenInstance, TokenSaleInstance });
    }
    
    init();
  }, [])
  
  console.log('App:', { Web3, accounts, instances })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
