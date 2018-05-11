import React, {Component} from 'react';
import * as d3 from "d3";
//import * as d3Chromatic from "d3-scale-chromatic";
import PropTypes from 'prop-types';

class D3 extends Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {

        let svg = d3.select("#chart");
            this.margin = {top: 20, right: 20, bottom: 30, left: 40};
            this.width = +svg.attr("width") - this.margin.left - this.margin.right;
            this.height = +svg.attr("height") - this.margin.top - this.margin.bottom;
            this.g = svg.append("g")
                .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

        this.x = d3.scaleBand()
            .rangeRound([0, this.width])
            .paddingInner(0.05)
            .align(0.1);

        this.y = d3.scaleLinear()
            .rangeRound([this.height, 0]);


        //Create viz
    }

    update(myData) {
        //Update data in Viz

        this.z = d3.scaleSequential(d3.interpolateBlues);

        this.x.domain(myData.map(function (d) {
            return d.key;
        }));
        this.y.domain([0, d3.max(myData, function (d) {
            return d.total;
        })]).nice();
        this.z.domain([0,d3.max(this.maxNumBuses)]);

        this.g.selectAll("rect").remove().transition().duration(1000);
        this.g.selectAll("g").remove().transition().duration(1000);

        this.g.append("g")
            .selectAll("g")
            .data(d3.stack().keys(this.keys).value((d, key) => {
                return key < d.values.length ? d.values[key].distance : 0;
            })(this.nestedBuses))
            .enter().append("g")
            .attr("fill",  (d)=> {
                return this.z(d.key);
            })
            .selectAll("rect")
            .data(function (d) {
                return d;
            })
            .enter().append("rect")
            .attr("x",  (d) =>{
                return this.x(d.data.key);
            })
            .attr("y",  (d)=> {
                return this.y(d[1]);
            })
            .attr("height",  (d)=> {
                return this.y(d[0]) - this.y(d[1]);
            })
            .attr("width", this.x.bandwidth());

        this.g.append("g")
            .attr("class", "axis-x")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(this.x))
            .attr("font-size",8)


        this.g.append("g")
            .attr("class", "axis-y")
            .call(d3.axisLeft(this.y).ticks(null, "s"))
            .append("text")
            .attr("x", 2)
            .attr("y", this.y(this.y.ticks().pop()) + 0.5)
            .attr("dy", "0.32em")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("text-anchor", "start")
            .text("Added distance");

        let legend = this.g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(this.keys.slice().reverse())
            .enter().append("g")
            .attr("transform", function (d, i) {
                return "translate(0," + i * 13 + ")";
            });

        legend.append("rect")
            .attr("x", this.width - 15)
            .attr("width", 12)
            .attr("height", 12)
            .attr("fill", this.z);

        legend.append("text")
            .attr("x", this.width - 24)
            .attr("y", 6.5)
            .attr("dy", "0.32em")
            .text(function (d) {
                return d;
            });

        this.g.select(".axis-x")
            .transition().duration(1000)
            .call(d3.axisBottom(this.x));

        this.g.select(".axis-y")
            .transition().duration(1000)
            .call(d3.axisLeft(this.y).ticks(null, "s"));


    }

    getDistance = function (lat1, lon1, lat2, lon2) {
        function deg2rad(deg) {
            return deg * (Math.PI / 180);
        }

        let R = 6371; // Radius of the earth in km
        let dLat = deg2rad(lat2 - lat1);  // deg2rad below
        let dLon = deg2rad(lon2 - lon1);
        let a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c; // Distance in km
        return d;
    }

    componentDidUpdate() {
        //Receive new props and update in viz
        data = this.props.data;
        if(data.vehicle){
            this.nestedBuses = d3.nest().key((d) => d.routeTag).entries(data.vehicle);
            first = this.nestedBuses[0].values[0];

            for (let route of this.nestedBuses) {
                route.total = 0;
                for (let i = 0; i < route.values.length; i++) {
                    if (route.values.length === 1)
                        route.values[i].distance = 0;
                    if (i < route.values.length - 1) {
                        route.values[i].distance = this.getDistance(+route.values[i].lat, +route.values[i].lon,
                            +route.values[i + 1].lat, +route.values[i + 1].lon);
                    }
                    else if (!i < route.values.length - 1) {
                        route.values[i].distance = this.getDistance(+route.values[i].lat, +route.values[i].lon,
                            +route.values[i - 1].lat, +route.values[i - 1].lon);
                    }
                    route.total += route.values[i].distance;
                }
            }
            this.nestedBuses.sort(function (a, b) {
                return b.total - a.total;
            });

            this.maxNumBuses = this.nestedBuses.map((d) => {
                return d.values.length;
            });

            this.keys = d3.range(d3.max(this.maxNumBuses));

            this.update(this.nestedBuses);
        }




    }

    render() {
        return (
            <div>
                <svg width="960" height="500" id="chart"/>
            </div>
        );
    }
}


export default D3;
