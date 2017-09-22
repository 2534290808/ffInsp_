/**
 * Created by lmy2534290808 on 2017/9/18.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import Pump from "../insppage/Pump";
export default class PumpScreen extends Component {
    static navigationOptions = {
        title: '水泵'
    }

    render() {
        return (<Pump navigation={this.props.navigation}/>)
    }
}