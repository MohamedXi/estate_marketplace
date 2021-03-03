import React, {Component} from 'react';
import Web3 from "web3";
import Marketplace from "../abis/Marketplace.json";
import Truncate from "react-truncate";
import {Link} from "react-router-dom";

class EstateDetail extends Component {
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
            estate: {},
            loading: true,
            id: props.match.params.id,
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

    async loadBlockchainData() {
        const web3 = window.web3
        const networkId = await web3.eth.net.getId()
        const networkData = Marketplace.networks[networkId]
        if (networkData) {
            const marketplace = new web3.eth.Contract(Marketplace.abi, networkData.address)
            this.setState({marketplace})
            const estateId = await marketplace.methods.getEstateById(this.state.id).call()
            this.setState({estateId})
            console.log(estateId)
            this.setState({loading: false})
            //console.log(this.state.id)
        } else {
            window.alert('Marketplace contract not deployed to detected network.')
        }
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
            <>
                <div className="container mt-5">
                    <div className="row g-3">
                        <div className="col-md-5 col-lg-4 order-md-last">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted">Information</span>
                            </h4>
                            <ul className="list-group mb-3">
                                <li className="list-group-item d-flex justify-content-between lh-sm">
                                    <div>
                                        <h6 className="my-0">Owner</h6>
                                        <small className="text-muted"></small>
                                    </div>
                                </li>
                                <li className="list-group-item d-flex justify-content-between bg-light">
                                    <small>Price</small>
                                    <h6 className="my-0">10 Eth</h6>
                                </li>
                            </ul>
                            <button className="btn btn-primary btn-block">Buy now</button>
                        </div>
                        <div className="col-md-7 col-lg-8">
                            <h4 className="mb-3">Estate Details</h4>
                            <div className="row">
                                <div className="col-6">
                                    <img src="https://www.cabinet-hemon.com/z/webagency/A_ID3X/hemon44_42892/images/vente-appartement-nantes.jpg" className="d-block w-100" alt="..."/>
                                </div>
                                <div className="col-6">
                                    <img src="https://www.cabinet-hemon.com/z/webagency/A_ID3X/hemon44_42892/images/vente-appartement-nantes.jpg" className="d-block w-100" alt="..."/>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default EstateDetail;