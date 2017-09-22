/**
 * Created by lmy2534290808 on 2017/9/18.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import Pump from "../insppage/Pump";
import Other from "../insppage/Other";
export default class OtherScreen extends Component {
    static navigationOptions = {
        title: '其他'
    }

    render() {
        return (<Other navigation={this.props.navigation}/>)
    }
}