import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import D3 from "./d3.jsx";

import ReactDOM from "react-dom";
import {Meteor} from "meteor/meteor";


// Add event component
export default class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goSearchEv: false,
            nameQuery: "",
        };
    }

    goSearch() {
        this.setState({goSearchEv: true});
    }

    search(e) {
        e.preventDefault();

        const name = this.refs.agency.value;
        if (!(name.length===0)){
            this.setState({goSearchEv: true, nameQuery:name});
            sessionStorage.setItem("query", name);
            Meteor.call("routeConfig",name, (err, res)=>{
                if(err) throw err;
                this.setState({routeConfig : res});
                console.log(this.state.routeConfig);
            });
        }
        else {
            window.alert("Please fill out all the required fields!");
        }

    }

    render() {
        return (
            <div className="section">
                <div className="container">
                    <div className="col-md-10 ml-auto mr-auto">
                        <br/>
                        <h3 className="title">New Query</h3>
                        <form id="form">
                            <div className="row">
                                <div className="col-md-8 col-sm-8">

                                    <br/>
                                    <div className="form-group">
                                        <h5>Agency Name</h5>

                                        {!this.state.goSearchEv ? <input ref="agency" className="form-control border-input" required
                                               placeholder="Enter the Agency name.."
                                               type="text"/>:""}
                                        {this.state.goSearchEv ? <h6>Searching: {this.state.name}</h6>:""}
                                    </div>
                                </div>
                            </div>


                            <div className="row buttons-row">
                                <div className="col-md-6 col-sm-6">
                                    {!this.state.goSearchEv ? <button onClick={this.search.bind(this)} type="submit" form="form"
                                            className="btn btn-primary btn-block btn-round">Search
                                    </button>:""}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

