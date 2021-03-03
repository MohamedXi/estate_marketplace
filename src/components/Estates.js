import React, {Component} from 'react';
import Truncate from "react-truncate";
import Web3 from "web3";
import Marketplace from "../abis/Marketplace.json";
import {Link} from "react-router-dom";

class Estates extends Component {

    async componentWillMount() {
        await this.loadWeb3()
        await this.loadAccount()
        await this.loadBlockchainData()
    }

    constructor(props) {
        super(props)
        this.state = {
            account: '',
            estateCount: 0,
            estates: [],
            loading: true
        }

        // this.createEstate = this.createEstate.bind(this)
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

    async loadBlockchainData() {
        const web3 = window.web3
        const networkId = await web3.eth.net.getId()
        const networkData = Marketplace.networks[networkId]
        if (networkData) {
            const marketplace = new web3.eth.Contract(Marketplace.abi, networkData.address)
            this.setState({marketplace})
            const estateCount = await marketplace.methods.getAllEstates().call()
            // this.setState({estateCount})
            this.setState({
                estates: estateCount
            })
            // Load estates
            // const productCount = await marketplace.methods.getAllEstates().call()
            console.log(this.state.estateCount, this.state.estates)
            this.setState({loading: false})
        } else {
            window.alert('Marketplace contract not deployed to detected network.')
        }
    }

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

    render() {
        return (
            <div>
                <div className="album py-5">
                    <div className="container">
                        <h2 className="fw-light">List of properties</h2>
                        <p className="lead text-muted">
                            You will find here all the properties available for sale, already sold or not for sale.
                        </p>
                        <div className="row">

                            {
                                this.state.estates.map((estate, key) => {
                                    return (
                                        <div className="col-sm-6 col-lg-4 mb-4">
                                            <div key={key} className="card border-0 shadow-sm">
                                                <Link className="link-card" to={"/estate-detail/" + estate._id}>
                                                    <img
                                                        src={estate._images[0]}
                                                        className="card-img-top" alt="..."/>
                                                </Link>
                                                <div className="card-body">
                                                    {/*<Link className="link-card" to={"/estate-detail/" + estate._id}>*/}
                                                        <h5 className="card-title mb-1">{estate._name}</h5>
                                                        <h6 className="card-title mb-3">Price
                                                            : {window.web3.utils.fromWei(estate._price.toString(), 'Ether')} Eth</h6> {/*{window.web3.utils.fromWei(estate.price.toString(), 'Ether')}*/}
                                                        <p className="card-subtitle mb-2 text-muted small">
                                                            <i className="bi bi-geo-fill mr-2"/>
                                                            {estate._postalAddress}
                                                        </p>
                                                        <p className="card-subtitle mb-2 text-muted small">
                                                            <i className="bi bi-person-fill mr-2"/>
                                                            <Truncate className="small" width={300} lines={1}
                                                                      ellipsis={<span>...</span>}>
                                                                {/*{estate.owner}*/} {estate._ownerEstate}
                                                            </Truncate>
                                                        </p>
                                                        <p className="card-text">{estate._selling.toString()} Some quick
                                                            example text to build on the
                                                            card
                                                            title and make up the bulk of the card's content.</p>
                                                        <div className="row mb-3">
                                                            <div className="col-4 small">
                                                                <i className="bi bi-grid-1x2 mr-2"/>
                                                                Type : Apartment
                                                            </div>
                                                            <div className="col-4 small">
                                                                <i className="bi bi-border-inner mr-2"/>
                                                                number of rooms : 4
                                                            </div>
                                                            <div className="col-4 small">
                                                                <i className="bi bi-arrows-fullscreen mr-2"/>
                                                                Surface: 20.00 m2
                                                            </div>
                                                        </div>
                                                    {/*</Link>*/}
                                                    <div className="row">
                                                        {/*
                                                        {
                                                            (estate._ownerEstate === this.state.account)
                                                                ? <>
                                                                    <div className="col-6">
                                                                        <button className="btn btn-sm btn-danger btn-block">
                                                                            Delete
                                                                        </button>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <button
                                                                            className="btn btn-sm btn-secondary btn-block">
                                                                            Edit
                                                                        </button>
                                                                    </div>
                                                                </>
                                                                : <></>
                                                        }
                                                        */}
                                                        {
                                                            (estate._selling === true)
                                                                ? <div className="col-12 mt-2">
                                                                    <button
                                                                        name={estate._id}
                                                                        value={estate._price}
                                                                        onClick={(event) => {
                                                                            this.buyEstate(event.target.name, event.target.value)
                                                                        }}
                                                                        className="btn btn-sm btn-primary btn-block">
                                                                        Buy Now
                                                                    </button>
                                                                </div>
                                                                : <button disabled
                                                                          className="btn btn-sm btn-secondary btn-block">
                                                                    Unavailable
                                                                </button>
                                                        }

                                                    </div>
                                                    {/*
                                        {!estate.purchased
                                            ? <button
                                                className="btn btn-sm btn-primary btn-block"
                                                name={estate.id}
                                                value={estate.price}
                                                onClick={(event) => {
                                                    this.props.purchaseProduct(event.target.name, event.target.value)
                                                }}
                                            >
                                                Buy Now
                                            </button>
                                            : <button disabled className="btn btn-sm btn-secondary btn-block">
                                                Purchased
                                            </button>
                                        }
                                        */}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Estates;