/**
 * Created by lmy2534290808 on 2017/9/15.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, Switch} from 'react-native';
import PropTypes from 'prop-types';
import NativePicker from "../NativePicker";
import {COLOR, Card, ListItem, Checkbox, IconToggle, Subheader, Icon, Button} from 'react-native-material-ui';
import Container from "../Container";
import CardContainer from "./CardContainer";
import ListItemMenu from "./ListItemMenu";
import IconSvg from "../icon/IconSvg";
import ListItemSvg from "./ListItemSvg";
import ListItemMDIcon from "./ListItemMDIcon";
export default class HydrantPage extends Component {
    constructor() {
        super();
        this.state = {
            bleEnabled: false,
            pickerData: [{value: 1, label: '是'}, {value: 0, label: '否'}]
        }
    }

    render() {
        let {bleEnabled, pickerData} = this.state;
        return (<Container>
            <CardContainer>
                <ListItemSvg svgName='pressure2' secondaryText='未完成' primaryText='水压' buttonText='获取'/>
                <ListItemMDIcon iconName='insert-photo' secondaryText='未完成' primaryText='关门' buttonText='获取'/>
            </CardContainer>
            <CardContainer>
                <NativePicker label='存在水带' data={pickerData}/>
                <NativePicker label='存在喷头' data={pickerData}/>
                <NativePicker label='灭火器完好' data={pickerData}/>
            </CardContainer>
            <CardContainer>
                <Button raised text="保存" primary/>
            </CardContainer>
        </Container>)
    }
}
