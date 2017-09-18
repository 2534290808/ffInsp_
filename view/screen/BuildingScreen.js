/**
 * Created by lmy2534290808 on 2017/9/14.
 */
import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import BuildingPage from "../buildingpage/BuildingPage";
export default class BuildingScreen extends Component{
    static navigationOptions={
        title:'楼栋详情'
    }
  render(){
  return(<BuildingPage navigation={this.props.navigation}/>)
  }
}