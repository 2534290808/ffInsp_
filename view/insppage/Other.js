/**
 * Created by lmy2534290808 on 2017/9/18.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text,ToastAndroid,DeviceEventEmitter} from 'react-native';
import PropTypes from 'prop-types';
import Container from "../Container";
import CardContainer from "./CardContainer";
import ListItemMDIcon from "./ListItemMDIcon";
import {Button} from 'react-native-material-ui';
import ProjectSqliteUtil from '../../view/ProjectSqliteUtil';
let psu = new ProjectSqliteUtil();
import ImagePicker from 'react-native-image-crop-picker';
export default class Other extends Component {
    constructor() {
        super();
        this.state = {
            img: '未完成',
            video: '',
            imgNameArray:[],
            imgPathArray:[]
        }
        this._saveOther=this._saveOther.bind(this);
        this._openCamera=this._openCamera.bind(this);
    }
    componentDidMount(){
        storage.load({
            key: 'imgPathArray'
        }).then(imgPathArray => this.setState({imgPathArray}))
        DeviceEventEmitter.emit('modalHide','')
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
            this.setState({img:'已完成'})
            console.warn(image);
        });
    }
    _saveOther() {
        let {imgNameArray,imgPathArray} = this.state;
        let {qrCode} = this.props.navigation.state.params;
        let params = {
            qrCode: qrCode,
            img: imgNameArray.join('/'),
            video: '',
        }
        storage.save({key: 'imgPathArray', data: imgPathArray})
        psu.insertOther(params).then(()=>{
            DeviceEventEmitter.emit('savedEvent','');
            ToastAndroid.show('保存成功',ToastAndroid.SHORT);
            this.props.navigation.goBack();
        }).catch(e=>{
            ToastAndroid.show('保存失败',ToastAndroid.SHORT);
        })
    }

    render() {
        let {img}=this.state;
        return (<Container>
            <CardContainer>
                <ListItemMDIcon onPress={this._openCamera} iconName='insert-photo' buttonText='拍照' secondaryText={img} primaryText='图片'/>
            </CardContainer>
            <CardContainer>
                <Button text="保存" onPress={this._saveOther} primary raised/>
            </CardContainer>
        </Container>)
    }
}