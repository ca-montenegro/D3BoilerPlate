import {Meteor} from "meteor/meteor";
import React, {Component} from "react";
import { HTTP } from 'meteor/http'
import {Mongo} from "meteor/mongo";
import {check} from "meteor/check";

Meteor.methods({
    "agencyList"() {
        try {
            res = HTTP.get('http://webservices.nextbus.com/service/publicJSONFeed?command=agencyList');
            return agencyList = res.data.agency;

        } catch (e) {
            // Do whatever you want with handling the error object (e)
            throw new Meteor.Error('some-error-code', 'Something bad went down',e);
        }
    }
    /*fetch("http://webservices.nextbus.com/service/publicJSONFeed?command=agencyList")
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                window.alert("Ocurrió un error al momento de obtener la lista de agencias");
            }

            console.log(data);
        })
        .catch(error => {
            console.log("There has been a problem with your fetch operation: " + error.message);
        });
},*/
});