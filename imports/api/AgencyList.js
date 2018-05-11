import {Meteor} from "meteor/meteor";
import React, {Component} from "react";
import { HTTP } from 'meteor/http'
import {Mongo} from "meteor/mongo";
import {check} from "meteor/check";

export const AgencyList = new Mongo.Collection("AgencyList");

if (Meteor.isServer) {
    Meteor.publish("AgencyList", () => {
        return AgencyList.find({});
    });
}

Meteor.methods({
    "agencyList"() {
        try {
            res = HTTP.get('http://webservices.nextbus.com/service/publicJSONFeed?command=agencyList');
            AgencyList.remove({});
            res.data.agency.forEach((d)=>{
                AgencyList.insert(d);
            })


        } catch (e) {
            // Do whatever you want with handling the error object (e)
            //throw new Meteor.Error(e);
        }
    }
});