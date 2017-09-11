/**
 * Created by lmy2534290808 on 2017/9/11.
 */
import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import AppBar from "../AppBar";
import Container from "../Container";
export default class InspPage extends Component{
  render(){
      return(<Container>
          <AppBar centerElement="主页"/>
      </Container>)
  }
}
