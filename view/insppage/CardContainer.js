/**
 * Created by lmy2534290808 on 2017/9/18.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {Card} from 'react-native-material-ui';
export default class CardContainer extends Component {
    render() {
        return (<Card style={{container: {marginVertical: 10}}}>{this.props.children}</Card>)
    }
}