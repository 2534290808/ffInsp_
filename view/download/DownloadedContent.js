/**
 * Created by lmy2534290808 on 2017/9/12.
 * 已经下载好的数据组件
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, ToolbarAndroid, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {Card, COLOR} from 'react-native-material-ui';
import SimpleToolBar from "../SimpleToolBar";
import Util from '../Util';
export default class DownloadedContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            actions: [{title: '删除'}, {title: '详情'}]//每一个SimpleToolbar的actions
        }
    }

    static propTypes = {
        data: PropTypes.array,//已经下载好的数据
        onPress:PropTypes.func,
    }

    render() {
        let {data,onPress} = this.props;
        let {actions} = this.state;
        return (
            <View style={{paddingVertical: 10 - Util.pixel, flex: 1}}>{data && data.map((item, index) => <SimpleToolBar
                containerStyle={{marginVertical: Util.pixel}} key={index}
                onActionSelected={(actionIndex)=>{onPress && onPress({value:item.name,index:index,actionIndex:actionIndex})}} title={item.name} actions={actions}/>)}</View>)
    }
}