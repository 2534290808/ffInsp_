/**
 * Created by lmy2534290808 on 2017/9/15.
 */
import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import FloorPage from "../floorpage/FloorPage";
export default class FloorScreen extends Component{
    static navigationOptions={
        title:'楼层详情'
    }
  render(){
  return(<FloorPage navigation={this.props.navigation}/>)
  }
}