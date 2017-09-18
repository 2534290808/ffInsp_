/**
 * Created by lmy2534290808 on 2017/9/11.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import Container from "../Container";
import AppBar from "../AppBar";
export default class UploadPage extends Component {
    render() {
        return (<Container><AppBar centerElement="上传"/></Container>)
    }
}