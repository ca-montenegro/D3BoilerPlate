import {Meteor} from "meteor/meteor";
import React, {Component} from "react";
import { HTTP } from 'meteor/http'
import {Mongo} from "meteor/mongo";
import {check} from "meteor/check";

export const RoutesList = new Mongo.Collection("RoutesList");

if (Meteor.isServer) {
    Meteor.publish("RoutesList", () => {
        return RoutesList.find({});
    });
}

Meteor.methods({
    "routeList"(agency) {
        check(agency,String);
        try {
            res = HTTP.get('http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a='+agency);
            RoutesList.remove({});
            res.data.route.forEach((d)=>{
                RoutesList.insert(d)
            });
            return routeList = res.data.route;

        } catch (e) {
            // Do whatever you want with handling the error object (e)
            throw new Meteor.Error('some-error-code', 'Something bad went down',e);
        }
    }
});