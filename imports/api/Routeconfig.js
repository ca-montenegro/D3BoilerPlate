import {Meteor} from "meteor/meteor";
import React, {Component} from "react";
import { HTTP } from 'meteor/http'
import {Mongo} from "meteor/mongo";
import {check} from "meteor/check";

export const StreamBuses = new Mongo.Collection("StreamBuses");

if (Meteor.isServer) {
    Meteor.publish("StreamBuses", () => {
        return StreamBuses.find({});
    });
}
Meteor.methods({
    "routeConfig"(agency) {
        check(agency,String);
        try {
            res =  HTTP.get("http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a="+agency+"&t=0");
            return res.data;

        } catch (e) {
            // Do whatever you want with handling the error object (e)
            throw new Meteor.Error('some-error-code', 'Something bad went down',e);
        }
    },
    "enterData"(data){


    },
});