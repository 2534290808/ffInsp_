/**
 * Created by lmy2534290808 on 2017/9/18.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text,ToastAndroid,NativeAppEventEmitter,DeviceEventEmitter} from 'react-native';
import PropTypes from 'prop-types';
import Container from "../Container";
import CardContainer from "./CardContainer";
import ListItemMenu from "./ListItemMenu";
import IconSvg from "../icon/IconSvg";
import {Button} from 'react-native-material-ui';
import ListItemSvg from "./ListItemSvg";
import ListItemMDIcon from "./ListItemMDIcon";
import ProjectSqliteUtil from '../../view/ProjectSqliteUtil';
let psu = new ProjectSqliteUtil();
import ImagePicker from 'react-native-image-crop-picker';
import Util from '../../view/Util';
export default class RollerDoor extends Component {
    constructor(){
        super()
        this.state={
            openCode:'',
            closeCode:'',
            img:'',imgPathArray:[],imgNameArray:[],bleAddress:'',imgDesc:'未完成'
        }
        this._saveRollerDoor=this._saveRollerDoor.bind(this);
        this._handleDidUpdateValue=this._handleDidUpdateValue.bind(this);
        this._openCamera=this._saveRollerDoor.bind(this);
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
        ToastAndroid.show(JSON.stringify(args),ToastAndroid.LONG)
    }
    _saveRollerDoor(){
        let {openCode,closeCode,imgNameArray,imgPathArray}=this.state;
        let {qrCode}=this.props.navigation.state.params;
        let params={openCode,closeCode,img:imgNameArray.join('/'),video:'',qrCode}
        storage.save({key: 'imgPathArray', data: imgPathArray})
        psu.insertRollerDoor(params).then(()=>{
            DeviceEventEmitter.emit('savedEvent','');
           ToastAndroid.show('保存成功',ToastAndroid.SHORT);
           this.props.navigation.goBack();
        }).catch(e=>{
            ToastAndroid.show('保存失败',ToastAndroid.SHORT);
            console.warn(JSON.stringify(e))
        })
    }
    //打开相机
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
            console.warn(image);
        });
    }
    _sendData(){
        Util.sendBleCharData(this.state.bleAddress,'y');
    }
    render() {
        let {imgDesc}=this.state;
        let {imgPercentage}=this.props.navigation.state.params;
        return (<Container>
            <CardContainer>
                <ListItemSvg onPress={()=>{this._sendData()}} svgName='open-door' secondaryText="" primaryText='开门' buttonText='获取'/>
                <ListItemSvg svgName='close-door' secondaryText={""} primaryText='关门' buttonText='获取'/>
                {(Math.random()<imgPercentage)&&<ListItemMDIcon onPress={this._openCamera} iconName='insert-photo' secondaryText={imgDesc} primaryText='图片' buttonText='拍照'/>}
            </CardContainer>
            <CardContainer>
                <Button text="保存" primary raised onPress={this._saveRollerDoor}/>
            </CardContainer>
        </Container>)
    }
}