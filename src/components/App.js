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
import MyEstates from "./MyEstates";

class App extends Component {

    async componentDidMount() {
        await this.loadWeb3()
        await this.loadAccount()
    }

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

    // j'ai commenter ceci car cela bloquai le code

    //this.createEstate = this.createProduct.bind(this)
    //this.setEstateSale = this.purchaseProduct.bind(this)


    // acheter un bien
    // int , int
    buyEstate(id, price) {
        this.setState({loading: true})
        this.state.marketplace.methods.buyEstate(id).send({from: this.state.account, value: price})
            .on('error', function (error) {
                window.alert("n'est pas en vente ou Manque de l'argent")
            })
            .on('receipt', function (receipt) {
                console.log(receipt)
                this.setState({loading: false})
            })
    }

    // update un bien (selling c'est si il est en vente ou non )
    // int, string, string, uint, bool, string[] 
    updateEstate(id, newName, newPostalAddress, newPrice, newSelling, newImages) {
        this.setState({loading: true})
        this.state.marketplace.methods.updateEstate(id, newName, newPostalAddress, newPrice, newSelling, newImages).send({from: this.state.account})
            .on('error', function (error) {
                window.alert("tu n'est pas propriétaire ou le prix doit etre superieur a 10")
            })
            .on('receipt', function (receipt) {
                console.log(receipt)
                this.setState({loading: false})
            })
    }

    // rechercher les biens d'une adresse (utilisateur)
    // string
    getEstateByAddress(address) {
        this.setState({loading: true})
        this.state.marketplace.methods.getEstateByAddress(address).send({from: this.state.account})
            .on('error', function (error) {
                window.alert("Propriétaire inconu")
            })
            .on('receipt', function (receipt) {
                console.log(receipt)
                this.setState({loading: false})
            })
    }

    // rechercher un bien selon son id
    // int
    getEstateById(id) {
        this.setState({loading: true})
        this.state.marketplace.methods.getEstateById(id).send({from: this.state.account})
            .on('error', function (error) {
                window.alert("Estate inconnu")
            })
            .on('receipt', function (receipt) {
                console.log(receipt)
                this.setState({loading: false})
            })
    }

    render() {
        return (
            <Fragment>
                <Router>
                    <Navbar account={this.state.account}/>
                    <Switch>
                        <Route exact path="/myestates" component={MyEstates}/>}/>
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