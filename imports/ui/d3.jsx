import React, {Component} from 'react';
import * as d3 from "d3";
import PropTypes from 'prop-types';

class D3 extends Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        //Create viz

    }

    update(myData){
        //Update data in Viz
    }


    componentDidUpdate() {
        //Receive new props and update in viz

    }

    render() {
        return (
            <div>
                <svg id="chart"/>
            </div>
        );
    }
}


export default D3;
