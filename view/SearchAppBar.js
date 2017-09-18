/**
 * Created by lmy2534290808 on 2017/9/12.
 */
import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import AppBar from "./AppBar";
export default class SearchAppBar extends Component{
  render(){
  return(<AppBar  searchable={{
      autoFocus: true,
      placeholder: '输入单位名',
      onSearchPressed:this._focus,
      onSearchClosed:this._unFocus,
      onSubmitEditing:this._submit,
      onChangeText:this._setInputValue
  }}/>)
  }
}