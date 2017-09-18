/**
 * Created by lmy2534290808 on 2017/9/15.
 */
import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import EquipmentPage from "../equipmentpage/EquipmentPage";
export default class EquipmentScreen extends Component{
    static navigationOptions={
        title:'设备详情'
    }
  render(){
  return(<EquipmentPage navigation={this.props.navigation}/>)
  }
}