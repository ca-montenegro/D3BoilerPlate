import {Meteor} from "meteor/meteor";
import React, {Component} from "react";
import { HTTP } from 'meteor/http'
import {Mongo} from "meteor/mongo";
import {check} from "meteor/check";

Meteor.methods({
    "routeConfig"(agency, route) {
        check(agency,String);
        check(route,String);
        try {
            res = HTTP.get("http://webservices.nextbus.com/service/publicJSONFeed?command=routeConfig&a="+agency+"&r="+route);
            return routeConfig = res.data.route;

        } catch (e) {
            // Do whatever you want with handling the error object (e)
            throw new Meteor.Error('some-error-code', 'Something bad went down',e);
        }
    }
});