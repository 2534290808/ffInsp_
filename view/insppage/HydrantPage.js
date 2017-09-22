/**
 * Created by lmy2534290808 on 2017/9/15.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, Switch,ToastAndroid} from 'react-native';
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
export default class HydrantPage extends Component {
    constructor() {
        super();
        this.state = {
            pickerData: [{value: 1, label: '是'}, {value: 0, label: '否'}],
            sprayValue: 1,
            waterBlagValue: 1,
            egIntactValue: 1,
            waterPressureDesc: '未完成',
            imgPath: '',
            waterPressureValue: 0,
            vibrationCode:'',
        }
        this._saveHydrant=this._saveHydrant.bind(this);
    }

    componentDidMount() {

        // alert(this.props.navigation.state.params.qrCode)
    }

    _changeValue(stateKey, value) {
        this.setState({[stateKey]: value})
    }

    _saveHydrant() {
        let {sprayValue, waterPressureValue, imgPath, waterBlagValue, egIntactValue,vibrationCode} = this.state;
        let {qrCode} = this.props.navigation.state.params;
        let params={
            qrCode:qrCode,
            img:imgPath,
            video:'',
            ensureWaterBag:waterBlagValue,
            ensureSprayHead:sprayValue,
            ensureEgIntact:egIntactValue,
            waterPressure:waterPressureValue,
            vibrationCode:vibrationCode,
        }
        psu.insertHydrant(params).then(() => {
            ToastAndroid.show('保存成功',ToastAndroid.LONG);
            this.props.navigation.goBack();
               //window.alert('success')
        }).catch(e => {
            console.warn(JSON.stringify(e))
        })
    }

    render() {
        let {pickerData, sprayValue, waterBlagValue, egIntactValue, waterPressure} = this.state;
        let {imgPercentage} = this.props.navigation.state.params
        return (<Container>
            <CardContainer>
                <ListItemSvg onPress={v => this._changeValue('waterPressure', 0.24)} svgName='pressure2'
                             secondaryText={waterPressure} primaryText='水压' buttonText='获取'/>
                {(Math.random() < imgPercentage) &&
                <ListItemMDIcon onPress={v => {
                }} iconName='insert-photo' secondaryText='未完成' primaryText='图片' buttonText='拍照'/>}
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
