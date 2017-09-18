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
        title: 'Hydrant',
        headerRight: <Icon.ToolbarAndroid onActionSelected={(index) => {
            alert(index)
        }} iconColor="#fff" overflowIconName="settings-bluetooth"
                                          style={{height: 55, width: 55}} actions={[{title: '打开'}, {title: '连接'}]}/>
    }

    render() {
        return (<HydrantPage/>)
    }
}