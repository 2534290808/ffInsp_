/**
 * Created by lmy2534290808 on 2017/9/11.
 */
import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import QRScanPage from "../qrscanpage/QRScanPage";
import Container from "../Container";
export default class QRScanScreen extends Component{
  static navigationOptions={
        title:'扫描'
  }
  render(){
      return(<Container><QRScanPage navigation={this.props.navigation}/></Container>)
  }
}