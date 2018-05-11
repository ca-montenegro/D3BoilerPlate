import React, {Component} from "react";

import D3 from "./d3.jsx";
import Nav from "./Nav";
import NewQuery from "./NewQuery";
import {Meteor} from "meteor/meteor";
import {withTracker} from 'meteor/react-meteor-data';
import {AgencyList} from "../api/AgencyList";
import {Comments} from "../api/comments";
import CommentsList from "./CommentList.jsx";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            agencyList: [],
            routeList: [],
            routeConfig: [],
            goSearchEv: false,
            comments: [],
            idInterval: 0,
        };
        this.handleChange = this.handleChange.bind(this);
        this.callRouteConfig = this.callRouteConfig.bind(this);
    }

    componentDidMount() {

        Meteor.call("agencyList", (err, res) => {
            //if (err) throw err;
            this.setState({agencyList: res});
        });
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    search(e) {
        e.preventDefault();
        this.name = this.state.value;
        Meteor.clearInterval(this.state.idInterval);
        if (!(this.name.length === 0)) {
            this.callRouteConfig();
            idInt = Meteor.setInterval(this.callRouteConfig, 10000);
            this.setState({idInterval: idInt});
        }

        else {
            window.alert("Please fill out all the required fields!");
        }


    }

    renderOptions() {
        if (this.props.AgencyList) {
            return this.props.AgencyList.map((agency) => {
                return (
                    <option key={agency.tag} value={agency.tag}>{agency.title}</option>
                )
            });
        }
    }

    callRouteConfig() {

        Meteor.call("routeConfig", this.state.value, (err, res) => {
            if (err) throw err;
            if (res.vehicle) {
                this.setState({routeConfig: res, goSearchEv: true});
            }
            else {
                this.setState({routeConfig: []});
                window.alert("There are any vehicles in move at this moment");
            }
        })
    }


    render() {

        return (
            <div style={{"backgroundColor": "lightgrey"}}>
                <div className="container">
                    <Nav></Nav>
                    <br/>
                    <br/>
                    <div className="section">
                        <div className="container">
                            <div className="col-md-12 ml-auto mr-auto">
                                <br/>
                                <div className="container row">
                                    <div className="col-md-6 col-sm-6">
                                        <h3>Visualize the current distance among routes by Agency in San Francisco, USA area</h3>
                                    </div>

                                </div>
                                <br/>
                                <div className="container row">
                                    <div className="col-md-6 col-sm-6">
                                        <h4>Start by selecting one Agency from the list. </h4>
                                    </div>

                                </div>
                                    <div className="container row">
                                        <div className="col-md-6 col-sm-6">
                                            <br/>
                                            <div className="container form-group">
                                                <h5>Agency Name</h5>
                                                <div>
                                                    <select value={this.state.value} onChange={this.handleChange}>
                                                        {this.renderOptions()}
                                                    </select>
                                                </div>
                                                <br/>
                                                <br/>
                                                <h6>Searching Agency tag: {this.state.value}</h6>
                                                <br/>
                                                {this.state.goSearchEv ? <div><h6>Results for: {this.state.value}</h6>
                                                    <h6>Refreshing every 10 seconds</h6></div> : ""}
                                            </div>
                                            <div className="row buttons-row">
                                                <div className="col-md-12 col-sm-12">
                                                    <button onClick={this.search.bind(this)} type="submit" form="form"
                                                            className="btn btn-primary btn-block btn-round">
                                                        <i className="fa fa-search"/> Search
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <CommentsList comments={this.props.comments}
                                                          tag={this.state.value}/>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <D3 data={this.state.routeConfig}/>
                </div>
            </div>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe("AgencyList");
    Meteor.subscribe('Comments');
    return {
        comments: Comments.find({}, {sort: {createdAt: -1}}).fetch(),
        AgencyList: AgencyList.find({}).fetch(),
        currentUser: Meteor.user(),
    };
})(App);
//export default App;
