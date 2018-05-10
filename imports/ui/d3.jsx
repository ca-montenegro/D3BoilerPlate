import React, {Component} from 'react';
import * as d3 from "d3";
import PropTypes from 'prop-types';

class D3 extends Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {

        let svg = d3.select("#chart"),
            margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom,
            g = svg.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        let x = d3.scaleBand()
            .rangeRound([0, width])
            .paddingInner(0.05)
            .align(0.1);

        let y = d3.scaleLinear()
            .rangeRound([height, 0]);

        let z = d3.scaleOrdinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
        //Create viz
    }

    update(myData){
        //Update data in Viz
        d3.csv("data.csv", function(d, i, columns) {
            for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
            d.total = t;
            return d;
        }, function(error, data) {
            if (error) throw error;

            let keys = data.columns.slice(1);

            data.sort(function(a, b) { return b.total - a.total; });
            x.domain(data.map(function(d) { return d.State; }));
            y.domain([0, d3.max(data, function(d) { return d.total; })]).nice();
            z.domain(keys);

            g.append("g")
                .selectAll("g")
                .data(d3.stack().keys(keys)(data))
                .enter().append("g")
                .attr("fill", function(d) { return z(d.key); })
                .selectAll("rect")
                .data(function(d) { return d; })
                .enter().append("rect")
                .attr("x", function(d) { return x(d.data.State); })
                .attr("y", function(d) { return y(d[1]); })
                .attr("height", function(d) { return y(d[0]) - y(d[1]); })
                .attr("width", x.bandwidth());

            g.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            g.append("g")
                .attr("class", "axis")
                .call(d3.axisLeft(y).ticks(null, "s"))
                .append("text")
                .attr("x", 2)
                .attr("y", y(y.ticks().pop()) + 0.5)
                .attr("dy", "0.32em")
                .attr("fill", "#000")
                .attr("font-weight", "bold")
                .attr("text-anchor", "start")
                .text("Population");

            let legend = g.append("g")
                .attr("font-family", "sans-serif")
                .attr("font-size", 10)
                .attr("text-anchor", "end")
                .selectAll("g")
                .data(keys.slice().reverse())
                .enter().append("g")
                .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

            legend.append("rect")
                .attr("x", width - 19)
                .attr("width", 19)
                .attr("height", 19)
                .attr("fill", z);

            legend.append("text")
                .attr("x", width - 24)
                .attr("y", 9.5)
                .attr("dy", "0.32em")
                .text(function(d) { return d; });
        });
    }

    getDistance = function(lat1,lon1,lat2,lon2) {
        function deg2rad(deg) {
            return deg * (Math.PI/180);
        }

        let R = 6371; // Radius of the earth in km
        let dLat = deg2rad(lat2-lat1);  // deg2rad below
        let dLon = deg2rad(lon2-lon1);
        let a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        let d = R * c; // Distance in km
        return d;
    }

    componentDidUpdate() {
        //Receive new props and update in viz
        data = this.props.data;
        this.nestedBuses = d3.nest().key((d)=>{
            d.tag;
        }).entries(data.vehicle);
        first = this.nestedBuses[0].values[0];
        newAr = this.nestedBuses[0].values.forEach((d,i,a)=>{
            distanc = this.getDistance(first.lat,first.lon, d.lat, d.lon);
            console.log(distanc);
            d.distance = distanc;
        });
        console.log(newAr);


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
