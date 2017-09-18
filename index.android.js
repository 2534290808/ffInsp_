/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,StatusBar
} from 'react-native';
import PropTypes from 'prop-types';
import {ThemeProvider, COLOR} from 'react-native-material-ui';
import App from "./App";
import Util from './view/Util';
import AppTest from "./AppTest";
const uiTheme = {
    palette: {
        primaryColor: COLOR.cyan500
    }
}
export default  class ffinsp_ extends Component {
    constructor() {
        super();

    }


    render() {
        return (<ThemeProvider uiTheme={uiTheme}><App/></ThemeProvider>)
    }
}

AppRegistry.registerComponent('ffinsp_', () => ffinsp_);
