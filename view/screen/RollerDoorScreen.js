/**
 * Created by lmy2534290808 on 2017/9/18.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import RollerDoor from "../insppage/RollerDoor";
export default class RollerDoorScreen extends Component {
    static navigationOptions = {
        title: '消防门'
    }

    render() {
        return (<RollerDoor/>)
    }
}