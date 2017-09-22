/**
 * Created by lmy2534290808 on 2017/9/18.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text,ToastAndroid} from 'react-native';
import PropTypes from 'prop-types';
import Container from "../Container";
import CardContainer from "./CardContainer";
import ListItemMDIcon from "./ListItemMDIcon";
import {Button} from 'react-native-material-ui';
import ProjectSqliteUtil from '../../view/ProjectSqliteUtil';
let psu = new ProjectSqliteUtil();
export default class Other extends Component {
    constructor() {
        super();
        this.state = {
            img: '',
            video: ''
        }
        this._saveOther=this._saveOther.bind(this);
    }

    _saveOther() {
        psu.insertOther({...this.state,qrCode:this.props.navigation.state.params}).then(()=>{
            ToastAndroid.show('保存成功',ToastAndroid.SHORT);
            this.props.navigation.goBack();
        }).catch(e=>{
            ToastAndroid.show('保存失败',ToastAndroid.SHORT);
        })
    }

    render() {
        return (<Container>
            <CardContainer>
                <ListItemMDIcon iconName='insert-photo' buttonText='拍照' secondaryText='未完成' primaryText='图片'/>
            </CardContainer>
            <CardContainer>
                <Button text="保存" onPress={this._saveOther} primary raised/>
            </CardContainer>
        </Container>)
    }
}