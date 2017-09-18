/**
 * Created by lmy2534290808 on 2017/8/15.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import QRScanView from "./QRScanView";
import {NavigationActions} from 'react-navigation';
export default class QRScanPage extends Component {
    constructor(props) {
        super(props);
       this._navigateInsp=this._navigateInsp.bind(this);
    }

    _navigateInsp() {
        let action = NavigationActions.reset({
            index: 1,
            actions: [NavigationActions.navigate({routeName: 'Main'}), NavigationActions.navigate({
                routeName: 'RollerDoor',
                params: {}
            })]
        })
        this.props.navigation.dispatch(action);
    }

    render() {
        return (<QRScanView barcodeReceived={this._navigateInsp}/>)
    }
}