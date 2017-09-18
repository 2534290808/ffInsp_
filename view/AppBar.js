/**
 * Created by lmy2534290808 on 2017/9/11.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text,StatusBar,Modal} from 'react-native';
import PropTypes from 'prop-types';
import {Toolbar,COLOR} from 'react-native-material-ui';
import Util from '../view/Util';
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};
export default class AppBar extends Component {
    static propTypes = {
        ...Toolbar.propTypes
    }

    render() {
        return (<View><View style={styles.status}/><StatusBar translucent backgroundColor='rgba(0,0,0,0.2)'/><Toolbar {...this.props}/></View>)
    }
}
const styles=StyleSheet.create({
    status:{
        height:Util.size.statusBarHeight,
        backgroundColor:COLOR.cyan500
    }
})
