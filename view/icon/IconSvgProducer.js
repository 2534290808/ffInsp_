/**
 * Created by lmy2534290808 on 2017/9/18.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import IconSvg from './IconSvgProducer.json'
const IconSvgProducer = {
    pressure1: {path:IconSvg.pressure1 },
    pressure2:{path:IconSvg.pressure2},
    "open-door":{path:IconSvg['open-door']},
    "close-door":{path:IconSvg['close-door']},
}
export default IconSvgProducer;