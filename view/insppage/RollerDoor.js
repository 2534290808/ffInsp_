/**
 * Created by lmy2534290808 on 2017/9/18.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import Container from "../Container";
import CardContainer from "./CardContainer";
import ListItemMenu from "./ListItemMenu";
import IconSvg from "../icon/IconSvg";
import {Button} from 'react-native-material-ui';
import ListItemSvg from "./ListItemSvg";
import ListItemMDIcon from "./ListItemMDIcon";
export default class RollerDoor extends Component {
    render() {
        return (<Container>
            <CardContainer>
                <ListItemSvg svgName='open-door' secondaryText='未完成' primaryText='开门' buttonText='获取'/>
                <ListItemSvg svgName='close-door' secondaryText='未完成' primaryText='关门' buttonText='获取'/>
                <ListItemMDIcon iconName='insert-photo' secondaryText='未完成' primaryText='图片' buttonText='拍照'/>
            </CardContainer>
            <CardContainer>
                <Button text="保存" primary raised/>
            </CardContainer>
        </Container>)
    }
}