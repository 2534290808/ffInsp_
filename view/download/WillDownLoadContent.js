/**
 * Created by lmy2534290808 on 2017/9/12.
 * 即将要下载的数据组件
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import SimpleToolBar from "../SimpleToolBar";
import Util from '../Util';
export default class WillDownLoadContent extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        data: PropTypes.array,//将要下载的数据
        onPress: PropTypes.func,//每一个SimpleToolBar组件的下载Icon按下时触发
    }


    render() {
        let {data, onPress} = this.props;
        return (
            <View style={styles.container}>{data && data.map((item, index) => <SimpleToolBar
                containerStyle={{marginVertical: Util.pixel}} key={index}
                overrideActionsToIcon title={item.name} onIconPress={() => {
                onPress && onPress({value: item.name, index: index})
            }} actionIconName='file-download'/>)}</View>)
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1, paddingVertical: 10 - Util.pixel
    },
    simpleToolBar: {
        marginVertical: Util.pixel
    }
})