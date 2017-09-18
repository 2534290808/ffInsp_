/**
 * Created by lmy2534290808 on 2017/9/15.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, Switch} from 'react-native';
import PropTypes from 'prop-types';
import NativePicker from "../NativePicker";
import {COLOR, Card, ListItem, Checkbox, IconToggle,Subheader,Icon} from 'react-native-material-ui';
import Container from "../Container";
import BleState from "./BleState";
export default class HydrantPage extends Component {
    constructor() {
        super();
        this.state = {
            bleEnabled: false
        }
    }

    render() {
        let {bleEnabled} = this.state;
        return (<Container><BleState/></Container>)
    }
}
const styles = StyleSheet.create({

    rowContainer: {

        flexDirection: 'row',

        paddingLeft: 4,

    },

});