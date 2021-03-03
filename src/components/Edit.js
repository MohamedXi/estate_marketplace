import React, {Component, Fragment} from 'react';
import Web3 from "web3";
import Marketplace from "../abis/Marketplace.json";

class Edit extends Component {
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

        //this.createEstate = this.createEstate.bind(this)
        // this.onInputChange = this.onInputChange.bind(this);
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
            // Load estates
            /*
            for (var i = 1; i <= estateId; i++) {
                const estate = await marketplace.methods.estates(i).call()
                this.setState({
                    estates: [...this.state.estates, estate]
                })
            }
             */
            this.setState({loading: false})
            //console.log(this.state.id)
        } else {
            window.alert('Marketplace contract not deployed to detected network.')
        }
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

    render() {
        return (
            <Fragment>
                {
                    this.state.loading
                        ? <div id="loader" className="text-center">
                            <p className="text-center">Loading...</p>
                        </div>
                        : <section className="py-5 mt-5 container">
                            <div className="row">
                                <div>
                                    <h2 className="fw-light">Add a new property</h2>
                                    <p className="lead text-muted">Please add a new property via the form below. Your
                                        properties
                                        will be visible to all users of the platform.<br/>
                                        For your security, please do not reveal your private key.</p>
                                    <form className="row g-3" onSubmit={(event) => {
                                        event.preventDefault()
                                        // const id = this.estateId.value
                                        const id = this.estateId.value
                                        const name = this.estateName.value
                                        const address = this.estatePostalAddress.value
                                        const price = window.web3.utils.toWei(this.estatePrice.value.toString(), 'Ether')
                                        const selling = this.estateSelling.value
                                        const image = this.estateImage.value
                                        const images = [image]
                                        this.updateEstate(id, name, address, price, selling, images)
                                    }}>
                                        <input
                                            hidden
                                            disabled
                                            id="estateId"
                                            ref={(input) => {
                                                this.estateId = input
                                            }}
                                            type="text"
                                            name="name"
                                            defaultValue={this.state.estateId._id}
                                            className="form-control mb-3"
                                            placeholder="Estate Id"
                                            required/>
                                        <div className="col-md-6">
                                            <label htmlFor="estateName" className="form-label">Name</label>
                                            <input
                                                id="estateName"
                                                ref={(input) => {
                                                    this.estateName = input
                                                }}
                                                type="text"
                                                name="name"
                                                defaultValue={this.state.estateId._name}
                                                className="form-control"
                                                placeholder="Estate Name"
                                                required/>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="estatePrice" className="form-label">Price</label>
                                            <input
                                                id="estatePrice"
                                                ref={(input) => {
                                                    this.estatePrice = input
                                                }}
                                                type="text"
                                                className="form-control"
                                                placeholder="Estate Price"
                                                defaultValue={window.web3.utils.fromWei(this.state.estateId._price.toString(), 'Ether')}
                                                required/>
                                        </div>
                                        <div className="col-md-6 mt-3">
                                            <label htmlFor="estatePostalAddress" className="form-label">Postal
                                                address</label>
                                            <input
                                                id="estatePostalAddress"
                                                ref={(input) => {
                                                    this.estatePostalAddress = input
                                                }}
                                                type="text"
                                                className="form-control"
                                                placeholder="Estate Postal Address"
                                                defaultValue={this.state.estateId._postalAddress}
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
                                                defaultValue={this.state.estateId._images}
                                                required/>
                                        </div>
                                        <div className="col-md-12 mt-3 form-check">
                                            <input ref={(input) => {
                                                this.estateSelling = input
                                            }} className="form-check-input" type="checkbox"
                                                   defaultChecked={this.state.estateId._selling === true}/>
                                            <label className="form-check-label" htmlFor="flexCheckChecked">
                                                Is Selling ?
                                            </label>
                                        </div>
                                        <div className="col-12 mt-3">
                                            <button type="submit" className="btn btn-primary">Edit estate</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </section>
                }
            </Fragment>
        );
    }
}

export default Edit;