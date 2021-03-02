import React, {Component} from 'react';
import Truncate from "react-truncate";

class Estates extends Component {

    render() {
        return (
            <div>
                <div className="album py-5">
                    <div className="container">
                        <h2 className="fw-light">List of properties</h2>
                        <p className="lead text-muted">Please add a new property via the form below. Your properties will be visible to all users of the platform.<br/>
                            For your security, please do not reveal your private key.</p>
                        <div className="row">
                            <div className="col-sm-6 col-lg-4 mb-4">
                                <div className="card border-0 shadow-sm">
                                    <img src="https://q-xx.bstatic.com/images/hotel/max1024x768/168/168025344.jpg" className="card-img-top" alt="..."/>
                                    <div className="card-body">
                                        <h5 className="card-title mb-1">Appartement Nantes</h5>
                                        <h6 className="card-title mb-3">Price
                                            : 10 Eth</h6> {/*{window.web3.utils.fromWei(estate.price.toString(), 'Ether')}*/}
                                        <p className="card-subtitle mb-2 text-muted small">
                                            <i className="bi bi-geo-fill mr-2"/>
                                            5 rue de la maison, 44000
                                        </p>
                                        <p className="card-subtitle mb-2 text-muted small">
                                            <i className="bi bi-person-fill mr-2"/>
                                            <Truncate className="small" width={300} lines={1}
                                                      ellipsis={<span>...</span>}>
                                                {/*{estate.owner}*/} accsdm
                                            </Truncate>
                                        </p>
                                        <p className="card-text">Some quick example text to build on the card
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
                                        <div className="row">
                                            <div className="col-6">
                                                <button className="btn btn-sm btn-danger btn-block">
                                                    Delete
                                                </button>
                                            </div>
                                            <div className="col-6">
                                                <button className="btn btn-sm btn-secondary btn-block">
                                                    Edit
                                                </button>
                                            </div>
                                            <div className="col-12 mt-2">
                                                <button className="btn btn-sm btn-primary btn-block">
                                                    Buy Now
                                                </button>
                                            </div>
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Estates;