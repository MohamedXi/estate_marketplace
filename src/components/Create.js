import React, {Fragment, Component} from 'react';
import Marketplace from "../abis/Marketplace.json";
import Web3 from "web3";

class Create extends Component {
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

        this.createEstate = this.createEstate.bind(this)
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
            this.setState({estateCount})
            // Load estates
            for (var i = 1; i <= estateCount; i++) {
                const estate = await marketplace.methods.estates(i).call()
                this.setState({
                    estates: [...this.state.estates, estate]
                })
            }
            this.setState({loading: false})
        } else {
            window.alert('Marketplace contract not deployed to detected network.')
        }
    }

    // creation d'un bien ( estate )
    // string , int , list string[ ], string
    createEstate = (name, price, image, address) => {
        this.setState({loading: true})
        this.state.marketplace.methods.createEstate(name, address, price, image).send({from: this.state.account})
            .on('error', function (error) {
                window.alert("le prix doit etre superieur a 10")
            })
            .on('receipt', function (receipt) {
                console.log(receipt)
                this.setState({loading: false})
            })
    }

    render() {
        return (
            <Fragment>
                <section className="py-5 mt-5 container">
                    <div className="row">
                        <div>
                            <h2 className="fw-light">Add a new property</h2>
                            <p className="lead text-muted">Please add a new property via the form below. Your properties
                                will be visible to all users of the platform.<br/>
                                For your security, please do not reveal your private key.</p>
                            <form className="row g-3" onSubmit={(event) => {
                                event.preventDefault()
                                const name = this.estateName.value
                                const image = this.estateImage.value
                                const images = [image]
                                const address = this.estatePostalAddress.value
                                const price = window.web3.utils.toWei(this.estatePrice.value.toString(), 'Ether')
                                this.createEstate(name, price, images, address)
                            }}>
                                <div className="col-md-6">
                                    <input
                                        id="estateName"
                                        type="text"
                                        ref={(input) => {
                                            this.estateName = input
                                        }}
                                        className="form-control"
                                        placeholder="Estate Name"
                                        required/>
                                </div>
                                <div className="col-md-6">
                                    <input
                                        id="estatePrice"
                                        type="text"
                                        ref={(input) => {
                                            this.estatePrice = input
                                        }}
                                        className="form-control"
                                        placeholder="Estate Price"
                                        required/>
                                </div>
                                <div className="col-md-6 mt-3">
                                    <label htmlFor="estatePostalAddress" className="form-label">Postal address</label>
                                    <input
                                        id="estatePostalAddress"
                                        type="text"
                                        ref={(input) => {
                                            this.estatePostalAddress = input
                                        }}
                                        className="form-control"
                                        placeholder="Estate Postal Address"
                                        required/>
                                </div>
                                <div className="col-md-6 mt-3">
                                    <label htmlFor="estateImage" className="form-label">Image URL</label>
                                    <input
                                        id="estateImage"
                                        type="text"
                                        ref={(input) => {
                                            this.estateImage = input
                                        }}
                                        className="form-control"
                                        placeholder="Estate Image URL"
                                        required/>
                                </div>
                                <div className="col-12 mt-3">
                                    <button type="submit" className="btn btn-primary">Add New Property</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </Fragment>
        );
    }
}

export default Create;
