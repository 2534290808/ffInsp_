/**
 * Created by lmy2534290808 on 2017/9/15.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, ToolbarAndroid} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HydrantPage from "../insppage/HydrantPage";
export default class HydrantScreen extends Component {
    static navigationOptions = {
        title: '消火栓'
    }

    render() {
        return (<HydrantPage navigation={this.props.navigation}/>)
    }
}