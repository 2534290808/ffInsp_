/**
 * Created by lmy2534290808 on 2017/9/18.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {NavigationActions} from 'react-navigation';
const Actions = {
    navigateAction: {QRScan:'QRScan',Building:'Building',Floor:'Floor',Equipment:'Equipment'},
    dispatchAction: {Hydrant:NavigationActions.reset({})}
}
export {Actions}