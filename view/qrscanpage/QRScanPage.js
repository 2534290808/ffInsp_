/**
 * Created by lmy2534290808 on 2017/8/15.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import QRScanView from "./QRScanView";
export default class QRScanPage extends Component {
    static propTypes = {
        barcodeReceived:PropTypes.func.isRequired
    }

    render() {
        return (<QRScanView barcodeReceived={(rec)=>{this.props.navigation.navigate('Hydrant')}}/>)
    }
}