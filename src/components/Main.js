import React, {Component, Fragment} from 'react';
import Truncate from "react-truncate";

class Main extends Component {

    render() {
        return (
            <Fragment>
                <section className="py-5 container">
                    <div className="row">
                        <div>
                            <h2 className="fw-light">Add a new property</h2>
                            <p className="lead text-muted">Please add a new property via the form below. Your properties will be visible to all users of the platform.<br/>
                                For your security, please do not reveal your private key.</p>
                            <form className="row g-3" onSubmit={(event) => {
                                event.preventDefault()
                                const name = this.estateName.value
                                const image = this.estateImage.value
                                const address = this.estatePostalAddress.value
                                const price = window.web3.utils.toWei(this.estatePrice.value.toString(), 'Ether')
                                this.props.createProduct(name, price, image, address)
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
                <div className="album py-5 bg-light">
                    <div className="container">
                        <h2 className="fw-light">List of properties</h2>
                        <p className="lead text-muted">Please add a new property via the form below. Your properties will be visible to all users of the platform.<br/>
                            For your security, please do not reveal your private key.</p>
                        <div className="row" data-masonry="{'percentPosition': true }">
                            {this.props.products.map((product, key) => {
                                return (
                                    <div key={key} className="col-sm-6 col-lg-4 mb-4">
                                        <div className="card">
                                            <img src={product.image} className="card-img-top" alt="..."/>
                                            <div className="card-body">
                                                <h5 className="card-title mb-1">{product.name}</h5>
                                                <h6 className="card-title mb-3">Price
                                                    : {window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</h6>
                                                <p className="card-subtitle mb-2 text-muted small">
                                                    <i className="bi bi-geo-fill mr-2"></i>
                                                    {product.postalAddress}
                                                </p>
                                                <p className="card-subtitle mb-2 text-muted small">
                                                    <i className="bi bi-person-fill mr-2"></i>
                                                    <Truncate className="small" width={300} lines={1}
                                                              ellipsis={<span>...</span>}>
                                                        {product.owner}
                                                    </Truncate>
                                                </p>
                                                <p className="card-text">Some quick example text to build on the card
                                                    title and make up the bulk of the card's content.</p>
                                                <div className="row mb-3">
                                                    <div className="col-4 small">
                                                        <i className="bi bi-grid-1x2 mr-2"></i>
                                                        Type : Apartment
                                                    </div>
                                                    <div className="col-4 small">
                                                        <i className="bi bi-border-inner mr-2"></i>
                                                        number of rooms : 4
                                                    </div>
                                                    <div className="col-4 small">
                                                        <i className="bi bi-arrows-fullscreen mr-2"></i>
                                                        Surface: 20.00 m2
                                                    </div>
                                                </div>
                                                {!product.purchased
                                                    ? <button
                                                        className="btn btn-sm btn-primary btn-block"
                                                        name={product.id}
                                                        value={product.price}
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
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

/*
<div className="card">
                                            <img src={product.image} className="card-img-top" alt="..."/>
                                            <div className="card-body small">
                                                <h5 className="card-title">{product.name}</h5>
                                                <p className="card-text">Some quick example text to build on the card
                                                    title
                                                    and make up
                                                    the
                                                    bulk of the card's content.</p>
                                            </div>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item small">
                                                    <div className="font-weight-bold text-muted">Postal Address :</div>
                                                    {product.postalAddress}
                                                </li>
                                                <li className="list-group-item small">
                                                    <div className="font-weight-bold text-muted">Price :</div>
                                                    {window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth
                                                </li>
                                                <li className="list-group-item small">
                                                    <div className="font-weight-bold text-muted">Owner :</div>
                                                    {product.owner}
                                                </li>
                                            </ul>
                                            <div className="card-body text-center">
                                                {!product.purchased
                                                    ? <button
                                                        className="btn btn-sm btn-primary"
                                                        name={product.id}
                                                        value={product.price}
                                                        onClick={(event) => {
                                                            this.props.purchaseProduct(event.target.name, event.target.value)
                                                        }}
                                                    >
                                                        Buy Now
                                                    </button>
                                                    : <button disabled className="btn btn-sm btn-secondary">
                                                        Purchased
                                                    </button>
                                                }
                                            </div>
                                        </div>
 */

export default Main;
