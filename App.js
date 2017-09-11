/**
 * Created by lmy2534290808 on 2017/9/11.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import AppBar from "./view/AppBar";
import {StackNavigator} from 'react-navigation';
import MainScreen from './view/screen/MainScreen';
const App = StackNavigator({
    'Main': {screen: MainScreen}
}, {navigationOptions: {header: null}})
export default App