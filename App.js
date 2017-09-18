/**
 * Created by lmy2534290808 on 2017/9/11.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import AppBar from "./view/AppBar";
import {COLOR} from 'react-native-material-ui';
import {StackNavigator} from 'react-navigation';
import MainScreen from './view/screen/MainScreen';
import QRScanScreen from './view/screen/QRScanScreen';
import BuildingScreen from './view/screen/BuildingScreen';
import FloorScreen from './view/screen/FloorScreen';
import EquipmentScreen from './view/screen/EquipmentScreen';
import HydrantScreen from './view/screen/HydrantScreen';
import RollerDoorScreen from './view/screen/RollerDoorScreen';
import Util from './view/Util';
const App = StackNavigator({
    Main: {screen: MainScreen},
    QRScan: {screen: QRScanScreen},
    Building: {screen: BuildingScreen},
    Floor: {screen: FloorScreen},
    Equipment: {screen: EquipmentScreen},
    Hydrant: {screen: HydrantScreen},
    RollerDoor:{screen:RollerDoorScreen}
}, {
    navigationOptions: {
        headerStyle: {backgroundColor: COLOR.cyan500, paddingTop: Util.size.statusBarHeight, height: 80},
        headerTitleStyle: {color: '#fff'},
        headerTintColor: '#fff',
    }
})
export default App