/**
 * Created by lmy2534290808 on 2017/9/18.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text,ToastAndroid} from 'react-native';
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
export default class RollerDoor extends Component {
    constructor(){
        super()
        this.state={
            openCode:'',
            closeCode:'',
            img:''
        }
        this._saveRollerDoor=this._saveRollerDoor.bind(this);
    }
    _saveRollerDoor(){
        let {openCode,closeCode,img}=this.state;
        let {qrCode}=this.props.navigation.state.params;
        let params={openCode,closeCode,img,video:'',qrCode}
        psu.insertRollerDoor(params).then(()=>{
           ToastAndroid.show('保存成功',ToastAndroid.SHORT);
           this.props.navigation.goBack();
        }).catch(e=>{
            ToastAndroid.show('保存失败',ToastAndroid.SHORT);
            console.warn(JSON.stringify(e))
        })
    }
    render() {
        return (<Container>
            <CardContainer>
                <ListItemSvg svgName='open-door' secondaryText='未完成' primaryText='开门' buttonText='获取'/>
                <ListItemSvg svgName='close-door' secondaryText='未完成' primaryText='关门' buttonText='获取'/>
                <ListItemMDIcon iconName='insert-photo' secondaryText='未完成' primaryText='图片' buttonText='拍照'/>
            </CardContainer>
            <CardContainer>
                <Button text="保存" primary raised onPress={this._saveRollerDoor}/>
            </CardContainer>
        </Container>)
    }
}