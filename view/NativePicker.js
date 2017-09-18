/**
 * Created by lmy2534290808 on 2017/8/30.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, Picker} from 'react-native';
import PropTypes from 'prop-types';
export default class NativePicker extends Component {
    static propTypes = {
        data: PropTypes.array,//jsonArray,包含value和label属性Array<{value,label}>
        label: PropTypes.string,
        flexLabel: PropTypes.number,
        flexPicker: PropTypes.number,//其他所有的属性和picker相同,
        containerStyle:PropTypes.any,

    }
    static defaultProps = {
        label: 'picker',
        flexLabel: 0,
        flexPicker: 1
    }

    constructor() {
        super()
    }

    render() {
        let {containerStyle}=this.props;
        return (
            <View style={[styles.nativePicker,containerStyle && containerStyle]}><Text
                style={[styles.nativePickerLabel, {flex: this.props.flexLabel}]}>{this.props.label}</Text><Picker {...this.props}
                                                                                                                  style={{flex: this.props.flexPicker}}>
                {this.props.data ? this.props.data.map((item, i) => <Picker.Item key={i}
                                                                                 label={item.label}
                                                                                 value={item.value}/>) : null}
            </Picker></View>)
    }
}
const styles = StyleSheet.create({
    nativePicker: {
        borderBottomWidth: 0,
        borderBottomColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:16
    },
    nativePickerLabel: {fontSize: 17, color: '#000'}
})