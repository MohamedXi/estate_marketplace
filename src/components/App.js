import React, { Component, Fragment } from 'react';
import Web3 from 'web3'
import logo from '../logo.png';
import './App.css';
import Marketplace from '../abis/Marketplace.json'
import Navbar from './Navbar'
import Main from './Main'

class App extends Component {

    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3
            // Load account
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        const networkId = await web3.eth.net.getId()
        const networkData = Marketplace.networks[networkId]
        if (networkData) {
            const marketplace = web3.eth.Contract(Marketplace.abi, networkData.address)
            this.setState({ marketplace })

            //test
            this.state.marketplace.methods.createEstate("name3", "adress2", 1 , ["url11", "url21"]).send({ from: this.state.account })
                .on('error', function(error){
                    window.alert("le prix doit etre superieur a 10")
                 })
                .on('receipt', function(receipt) {
                    console.log(receipt)
                    this.setState({ loading: false })
                })

            const productCount = await marketplace.methods.getAllEstates().call()

            console.log(productCount)
            //fin test

            //comenter car cela me bloqué

            //this.setState({ productCount })
            // Load products
            //for (var i = 1; i <= productCount; i++) {
            //    const product = await marketplace.methods.products(i).call()
            //    this.setState({
            //        products: [...this.state.products, product]
            //    })
            //}
            this.setState({ loading: false })
        } else {
            window.alert('Marketplace contract not deployed to detected network.')
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            account: '',
            productCount: 0,
            products: [],
            loading: true
        }

        // j'ai commenter ceci car cela bloquai le code

        //this.createEstate = this.createProduct.bind(this)
        //this.setEstateSale = this.purchaseProduct.bind(this)
    }
    
    // creation d'un bien ( estate )
    // string , int , list string[ ], string
    createEstate(name, price, image, address) {
        this.setState({ loading: true })
        this.state.marketplace.methods.createEstate( name, address, price, image ).send({ from: this.state.account })
            .on('error', function(error){
                window.alert("le prix doit etre superieur a 10")
            })
            .on('receipt', function(receipt) {
                console.log(receipt)
                this.setState({ loading: false })
            })
    }
    // acheter un bien
    // int , int
    buyEstate(id , price) {
        this.setState({ loading: true })
        this.state.marketplace.methods.buyEstate(id).send({ from: this.state.account , value: price })
            .on('error', function(error){
                window.alert("n'est pas en vente ou Manque de l'argent")
            })
            .on('receipt', function(receipt) {
                console.log(receipt)
                this.setState({ loading: false })
            })
    }
    // update un bien (selling c'est si il est en vente ou non )
    // int, string, string, uint, bool, string[] 
    updateEstate(id,newName,newPostalAddress,newPrice,newSelling,newImages) {
        this.setState({ loading: true })
        this.state.marketplace.methods.updateEstate(id,newName,newPostalAddress,newPrice,newSelling,newImages).send({ from: this.state.account })
            .on('error', function(error){
                window.alert("tu n'est pas propriétaire ou le prix doit etre superieur a 10")
            })
            .on('receipt', function(receipt) {
                console.log(receipt)
                this.setState({ loading: false })
            })
    }
    // rechercher les biens d'une adresse (utilisateur)
    // string
    getEstateByAddress(address) {
        this.setState({ loading: true })
        this.state.marketplace.methods.getEstateByAddress(address).send({ from: this.state.account })
            .on('error', function(error){
                window.alert("Propriétaire inconu")
            })
            .on('receipt', function(receipt) {
                console.log(receipt)
                this.setState({ loading: false })
            })
    }
    // rechercher un bien selon son id
    // int
    getEstateById(id) {
        this.setState({ loading: true })
        this.state.marketplace.methods.getEstateById(id).send({ from: this.state.account })
            .on('error', function(error){
                window.alert("Estate inconnu")
            })
            .on('receipt', function(receipt) {
                console.log(receipt)
                this.setState({ loading: false })
            })
    }

    render() {
        return ( <
            Fragment >
            <
            Navbar account = { this.state.account }
            /> <
            main role = "main"
            className = "mt-5" > {
                this.state.loading ?
                <
                div id = "loader"
                className = "text-center" > < p className = "text-center" > Loading... < /p></div >
                :
                    <
                    Main
                products = { this.state.products }
                createProduct = { this.createProduct }
                purchaseProduct = { this.purchaseProduct }
                />
            } <
            /main> < /
            Fragment >
        );
    }
}

export default App;