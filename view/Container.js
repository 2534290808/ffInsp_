/**
 * Created by lmy2534290808 on 2017/9/11.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
export default class Container extends Component {
    render() {
        return (<View style={{flex: 1}}>{this.props.children}</View>)
    }
}