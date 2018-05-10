import React, {Component} from "react";
import {withTracker} from 'meteor/react-meteor-data';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import {BrowserRouter as Router, Route, NavLink} from "react-router-dom";
import Home from "./Home";
import NewQuery from "./NewQuery";
import D3 from "./d3.jsx";

class Nav extends Component {

    render() {
        return (
            <Router>
                <div>
                    <div>
                        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                            <div className="container">
                                <a className="navbar-brand" href="/">Next Bus</a>
                                <button className="navbar-toggler" type="button" data-toggle="collapse"
                                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                        aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"/>
                                </button>

                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item center-login"><AccountsUIWrapper/></li>

                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>

            </Router>

        );
    }
}


export default Nav;

