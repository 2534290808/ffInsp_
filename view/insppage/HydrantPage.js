/**
 * Created by lmy2534290808 on 2017/9/15.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, Switch, ToastAndroid,NativeAppEventEmitter,DeviceEventEmitter} from 'react-native';
import PropTypes from 'prop-types';
import NativePicker from "../NativePicker";
import {COLOR, Card, ListItem, Checkbox, IconToggle, Subheader, Icon, Button} from 'react-native-material-ui';
import Container from "../Container";
import CardContainer from "./CardContainer";
import ListItemMenu from "./ListItemMenu";
import IconSvg from "../icon/IconSvg";
import ListItemSvg from "./ListItemSvg";
import ListItemMDIcon from "./ListItemMDIcon";
import ProjectSqliteUtil from '../../view/ProjectSqliteUtil';
let psu = new ProjectSqliteUtil();
import Util from '../../view/Util';
import ImagePicker from 'react-native-image-crop-picker';
export default class HydrantPage extends Component {
    constructor() {
        super();
        this.state = {
            pickerData: [{value: 1, label: '是'}, {value: 0, label: '否'}],
            sprayValue: 1,
            waterBlagValue: 1,
            egIntactValue: 1,
            imgNameArray: [],
            waterPressureValue: '未完成',
            vibrationCode: '',
            imgPathArray: [],
            bleAddress:'',
            imgDesc:'未完成'
        }
        this._saveHydrant = this._saveHydrant.bind(this);
        this._openCamera = this._openCamera.bind(this);
        this._handleDidUpdateValue=this._handleDidUpdateValue.bind(this);
        this._sendData=this._sendData.bind(this);
    }

    componentDidMount() {
        storage.load({
            key: 'imgPathArray'
        }).then(imgPathArray => this.setState({imgPathArray}))
        this.handleDidUpdateValueForCharacteristic=NativeAppEventEmitter.addListener('BleManagerDidUpdateValueForCharacteristic',this._handleDidUpdateValue)
        storage.load({key:'bleAddress'}).then(bleAddress=>{
            console.warn(bleAddress);
            //ToastAndroid.show(bleAddress+"---",ToastAndroid.SHORT);
            this.setState({bleAddress:bleAddress});
            Util.startBleNotify(bleAddress);
        })
        DeviceEventEmitter.emit('modalHide','')
        // alert(this.props.navigation.state.params.qrCode)
    }
    componentWillUnmount(){
        this.handleDidUpdateValueForCharacteristic.remove();
    }
    _handleDidUpdateValue(args){
        let value=args.value,len=value.length;
        if(len>3){
            let waterPressureValue=parseFloat(String.fromCharCode(...value.slice(0,4)));
            if(isNaN(waterPressureValue)){
                Util.sendBleCharData(this.state.bleAddress,'b')
            }
            this.setState({waterPressureValue})
        }else{
            this.setState({waterPressureValue:'获取失败'})
        }
       // ToastAndroid.show(JSON.stringify(args),ToastAndroid.LONG);
        console.warn(JSON.stringify(args))
    }
    _changeValue(stateKey, value) {
        this.setState({[stateKey]: value})
    }

    _saveHydrant() {
        let {sprayValue, waterPressureValue, imgNameArray, waterBlagValue, egIntactValue, vibrationCode,imgPathArray} = this.state;
        let {qrCode} = this.props.navigation.state.params;
        let params = {
            qrCode: qrCode,
            img: imgNameArray.join('/'),
            video: '',
            ensureWaterBag: waterBlagValue,
            ensureSprayHead: sprayValue,
            ensureEgIntact: egIntactValue,
            waterPressure: waterPressureValue,
            vibrationCode: vibrationCode,
        }
        storage.save({key: 'imgPathArray', data: imgPathArray})
        psu.insertHydrant(params).then(() => {
            DeviceEventEmitter.emit('savedEvent','');
            ToastAndroid.show('保存成功', ToastAndroid.LONG);
            this.props.navigation.goBack();
            //window.alert('success')
        }).catch(e => {
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
            this.setState({imgDesc:'已完成'})
            console.warn(image);
        });
    }
    //获取水压数据
    _sendData(){
        Util.sendBleCharData(this.state.bleAddress,'p').then(()=>{
            this.setState({waterPressureValue:'获取中...'})
        }).catch(e=>{this.setState({waterPressureValue:'获取失败'})})
    }
    render() {
        let {pickerData, sprayValue, waterBlagValue, egIntactValue, waterPressureValue,imgDesc} = this.state;
        let {imgPercentage} = this.props.navigation.state.params
        return (<Container>
            <CardContainer>
                <ListItemSvg onPress={this._sendData} svgName='pressure2'
                             secondaryText={waterPressureValue} primaryText='水压' buttonText='获取'/>
                {(Math.random() < imgPercentage) &&
                <ListItemMDIcon onPress={this._openCamera} iconName='insert-photo' secondaryText={imgDesc} primaryText='图片'
                                buttonText='拍照'/>}
            </CardContainer>
            <CardContainer>
                <NativePicker selectedValue={sprayValue} onValueChange={v => this._changeValue('sprayValue', v)}
                              label='存在水带' data={pickerData}/>
                <NativePicker selectedValue={waterBlagValue} onValueChange={v => this._changeValue('waterBlagValue', v)}
                              label='存在喷头' data={pickerData}/>
                <NativePicker selectedValue={egIntactValue} onValueChange={v => this._changeValue('egIntactValue', v)}
                              label='灭火器完好' data={pickerData}/>
            </CardContainer>
            <CardContainer>
                <Button raised text="保存" onPress={this._saveHydrant} primary/>
            </CardContainer>
        </Container>)
    }
}
