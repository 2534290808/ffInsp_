/**
 * Created by lmy2534290808 on 2018/1/6.
 */
import React,{Component} from 'react';
import {StyleSheet,View,Text,DeviceEventEmitter} from 'react-native';
import PropTypes from 'prop-types';
import {Button} from 'react-native-material-ui'
import Container from "../Container";
import CardContainer from "../insppage/CardContainer";
import ListItemSvg from "../insppage/ListItemSvg";
import ListItemMDIcon from "../insppage/ListItemMDIcon";
export default class HumitureScreen extends Component{
    static navigationOptions = {
        title: '温湿度'
    }
    constructor(){
        super();
        this.state={
            temperature:'',
            humidity:''
        }
    }
    componentDidMount(){
        DeviceEventEmitter.emit('modalHide','')
    }
  render(){
        let {temperature,humidity}=this.state;
      return(<Container>
          <CardContainer>
              <ListItemSvg onPress={()=>{
                  this.setState({temperature:'2℃',humidity:'60%'})
              }} svgName='temperature' secondaryText={temperature}
                           primaryText='温度' buttonText='获取'/>
              <ListItemSvg onPress={()=>{
              }} svgName='humidity' secondaryText={humidity}
                           primaryText='湿度'/>
              {
              <ListItemMDIcon onPress={this._openCamera} iconName='insert-photo' secondaryText={''}
                              primaryText='图片' buttonText='拍照'/>}
          </CardContainer>
          <CardContainer>
              <Button text="保存" primary raised onPress={this._saveRollerDoor}/>
          </CardContainer>
      </Container>)
  }
}