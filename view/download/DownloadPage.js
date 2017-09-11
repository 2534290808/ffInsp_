/**
 * Created by lmy2534290808 on 2017/9/11.
 */
import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import Container from "../Container";
import AppBar from "../AppBar";
export default class DownloadPage extends Component{
  render(){
      return(<Container><AppBar
                                 centerElement="下载"
                                 searchable={{
                                     autoFocus: true,
                                     placeholder: '输入单位名',
                                 }}/></Container>)
  }
}