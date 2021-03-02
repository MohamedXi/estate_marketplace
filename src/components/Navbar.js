import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {NavLink} from "react-bootstrap";

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
              <a className="navbar-brand" href="#">Navbar w/ text</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarText">
                  <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                          <Link className="nav-link " to="/">Home</Link>
                      </li>
                      <li className="nav-item">
                          <Link className="nav-link " to="/create">Create</Link>
                      </li>
                      <li className="nav-item">
                          <Link className="nav-link " to="/estates">Estates list</Link>
                      </li>
                  </ul>
                  <span className="navbar-text small">
                      Current account : {this.props.account}
                  </span>
              </div>
          </div>
      </nav>
    );
  }
}

export default Navbar;
