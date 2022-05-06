import React, { Component } from "react";
import SupplyChainContract from "./contracts/SupplyChain.json";
import ItemContract from "./contracts/Item.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { isLoading: true, cost: '', identifier: '', message: '' };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();
      let deployedNetwork = SupplyChainContract.networks[this.networkId];
      
      this.supplyChainContract = new this.web3.eth.Contract(
        SupplyChainContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      this.itemContract = new this.web3.eth.Contract(
        ItemContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      console.log('debug: ', { networkId: this.networkId, SupplyChainContract, supplyChainContract: this.supplyChainContract });
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ isLoading: false });

      this.listenToPaymentEvent();
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  createItemHandler = async () => {
    const { cost, identifier } = this.state;
    try {
      const result = await this.supplyChainContract.methods
        .createItem(identifier, cost)
        .send({from: this.accounts[0]});
      const message = `Send ${cost} to this address - ${result.events.SupplyChainStep.returnValues._itemAddress}`;
      this.setState({ message });
    } catch(e) {
      console.error(e);
    }
  }

  onChangeHandler = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  // Payment by truffle
  // truffle(develop)> web3.eth.sendTransaction({to:"0x0842ACbd1b5A02cf481a1F1033da01E381EB7753", value: 1111, from: accounts[0], gas:300000})
  listenToPaymentEvent = () => {
    this.supplyChainContract.events.SupplyChainStep().on("data", async (event) => {
      const itemIndex = event.returnValues._itemIndex;
      const itemStep = event.returnValues._step;
      const itemStatus = await this.supplyChainContract.methods.items(itemIndex).call();
      console.log('debug', { itemIndex, itemStep, itemStatus });
      
      if (itemStep === '1') {
        const message = `Item ${itemIndex} can start delivery!`;
        this.setState({ message });

        // Delivery
        // await this.supplyChainContract.methods.triggerDispatch(itemIndex).send({from: this.accounts[0]});
      }
      if (itemStep === '2')  {
        const message = `Item ${itemIndex} delivery!`;
        this.setState({ message });
      }
    })
  }


  render() {
    if (this.state.isLoading) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Items</h1>
        <div>
          
        </div>
        <h2>Add Items</h2>
        <div>
          <div>Cost in Wei:
            <input type="number" name="cost" value={this.state.cost} onChange={this.onChangeHandler}></input>
          </div>
          <div>Item identifier:
            <input type="text" name="identifier" value={this.state.identifier} onChange={this.onChangeHandler}></input>
          </div>
          <p>Message: {this.state.message}</p>
          <div>
            <button type="button" onClick={this.createItemHandler}>Create Item</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
