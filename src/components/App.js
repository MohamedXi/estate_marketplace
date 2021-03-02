import React, {useEffect, useState, Fragment, Component} from 'react';
import Web3 from 'web3'
import './App.css';
import Marketplace from '../abis/Marketplace.json'
import Navbar from './Navbar'
import Create from './Create'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from "./Home";
import Estates from "./Estates";

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            account: '',
            estateCount: 0,
            estates: [],
            loading: true
        }
    }

    loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    loadAccount = async () => {
        const web3 = window.web3
        // Load account
        const accounts = await web3.eth.getAccounts()
        this.setState({account: accounts[0]})
    }


    async componentWillMount() {
        await this.loadWeb3()
        await this.loadAccount()
    }

    render() {
        return (
            <Fragment>
                <Router>
                    <Navbar account={this.state.account}/>
                    <Switch>
                        <Route exact path="/create" component={Create}/>}/>
                        <Route exact path="/estates" component={Estates}/>}/>
                        <Route exact path="/" component={Home}/>}/>
                    </Switch>
                </Router>
            </Fragment>
        );
    }
}

export default App;