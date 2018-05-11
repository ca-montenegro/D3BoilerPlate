import React, {Component} from "react";

import D3 from "./d3.jsx";
import Nav from "./Nav";
import NewQuery from "./NewQuery";
import {Meteor} from "meteor/meteor";
import {withTracker} from 'meteor/react-meteor-data';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            agencyList :[],
            routeList:[],
            routeConfig:[],
        };
    }

    componentDidMount(){
        /*Meteor.call("agencyList", (err, res)=>{
            if(err) throw err;
            this.setState({agencyList : res});
            console.log(this.state.agencyList);
        });*/
        /*Meteor.call("routeList","sf-muni", (err, res)=>{
            if(err) throw err;
            this.setState({routeList : res});
            console.log(this.state.routeList);
        });*/
        /*Meteor.call("routeConfig","sf-muni", (err, res)=>{
            if(err) throw err;
            this.setState({routeConfig : res});
            console.log(this.state.routeConfig);
        });*/
    }
    search(e) {
        e.preventDefault();
        this.name = this.refs.agency.value;
        console.log(this.name);
        if (!(this.name.length===0)){
            Meteor.call("routeConfig",this.name, (err, res)=>{
                if(err) throw err;
                this.setState({routeConfig : res,goSearchEv: true});
                console.log(this.state.routeConfig);
            });
        }

        else {
            window.alert("Please fill out all the required fields!");
        }
        Meteor.call("agencyList", (err, res)=>{
            if(err) throw err;
            this.setState({agencyList : res});
            console.log(this.state.agencyList);
        });

    }


    render() {
        return (
            <div className="container">
                <Nav></Nav>
                <br/>
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
                                            {this.state.goSearchEv ? <h6>Results for: {this.name}</h6>:""}
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
                <br/>
                <br/>
                <D3 data = {this.state.routeConfig}/>
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
})(App);
//export default App;
