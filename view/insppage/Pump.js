/**
 * Created by lmy2534290808 on 2017/9/18.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text,ToastAndroid,NativeAppEventEmitter,DeviceEventEmitter} from 'react-native';
import PropTypes from 'prop-types';
import Container from "../Container";
import CardContainer from "./CardContainer";
import ListItemSvg from "./ListItemSvg";
import ListItemMDIcon from "./ListItemMDIcon";
import {Button} from 'react-native-material-ui';
import ProjectSqliteUtil from '../../view/ProjectSqliteUtil';
let psu = new ProjectSqliteUtil();
import BleManager from 'react-native-ble-manager';
import Util from '../../view/Util';
import ImagePicker from 'react-native-image-crop-picker';
export default class Pump extends Component {
    constructor() {
        super()
        this.state = {
            imgPath: '',
            vibrationCode: '',
            vibrationTime: '未获取',
            bleAddress:'',imgPathArray:[],imgNameArray:[],imgDesc:'未完成'
        }
        this._savePump=this._savePump.bind(this);
        this._handleDidUpdateValue=this._handleDidUpdateValue.bind(this);
        this._sendData=this._sendData.bind(this);
        this._openCamera=this._openCamera.bind(this);
    }
    componentDidMount(){
        storage.load({
            key: 'imgPathArray'
        }).then(imgPathArray => this.setState({imgPathArray}))
        this.handleDidUpdateValueForCharacteristic=NativeAppEventEmitter.addListener('BleManagerDidUpdateValueForCharacteristic',this._handleDidUpdateValue)
        storage.load({key:'bleAddress'}).then(bleAddress=>{
            console.warn(bleAddress);
            ToastAndroid.show(bleAddress+"---",ToastAndroid.SHORT);
            this.setState({bleAddress:bleAddress});
            Util.startBleNotify(bleAddress);
        })
        DeviceEventEmitter.emit('modalHide','')
    }
    componentWillUnmount(){
        this.handleDidUpdateValueForCharacteristic.remove();
    }
    _handleDidUpdateValue(args){
        console.warn(JSON.stringify(args));
        ToastAndroid.show('通知了',ToastAndroid.SHORT)
        let value = args.value,len=value.length;
        if(len==12) {
            let time = value.slice(1, 9),card = [value[9], value[10], value[11]];
            let cardStr=parseInt(card.map((v)=>Util.byteToHexString(v)).join(''),16)+'',timeStr=String.fromCharCode(...time)
            this.setState({vibrationCode:cardStr,vibrationTime:timeStr})
        }else{
            this.setState({vibrationTime:'获取失败'})
        }
    }
    _savePump(){
        let {vibrationCode,vibrationTime,imgNameArray,imgPathArray}=this.state;
        let {qrCode}=this.props.navigation.state.params;
        let params={
            qrCode:qrCode,
            vibrationTime:vibrationTime,
            vibrationCode:vibrationCode,
            img:imgNameArray.join('/'),
            video:''
        }
        storage.save({key: 'imgPathArray', data: imgPathArray})
        psu.insertPump(params).then(()=>{
            DeviceEventEmitter.emit('savedEvent','');
            ToastAndroid.show('保存成功',ToastAndroid.LONG);
            this.props.navigation.goBack();
        }).catch(e=>{
            console.warn(JSON.stringify(e))
        })
    }
    _sendData(){
        Util.sendBleCharData(this.state.bleAddress,'t').then(()=>{
            this.setState({vibrationTime:'获取中...'})
        }).catch(e=>{this.setState({vibrationTime:'获取失败'})})
    }
    _openCamera() {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: false
        }).then(image => {
            let {path} = image;
            this.setState((preState,props)=>{
                let {imgNameArray,imgPathArray}=preState;
                imgNameArray.push(path.slice(path.lastIndexOf('/') + 1))
                imgPathArray.push(path);
                return {imgNameArray,imgPathArray}
            })
            this.setState({imgDesc:'已完成'})
            console.warn(image);
        });
    }
    render() {
        let {vibrationTime,imgDesc}=this.state;
        let {imgPercentage}=this.props.navigation.state.params;
        return (<Container>
            <CardContainer>
                <ListItemSvg onPress={this._sendData} svgName='run-time' buttonText='获取' primaryText='运行时间' secondaryText={vibrationTime}/>
                {(Math.random()<imgPercentage)&&<ListItemMDIcon onPress={this._openCamera} iconName='insert-photo' buttonText='拍照' secondaryText={imgDesc} primaryText='图片'/>}
            </CardContainer>
            <CardContainer>
                <Button text="保存" onPress={this._savePump} primary raised/>
            </CardContainer>
        </Container>)
    }
}