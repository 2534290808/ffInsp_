/**
 * Created by lmy2534290808 on 2017/9/13.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
export default class Spinner extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        size: PropTypes.oneOf(['small', 'large']),
        color: PropTypes.string,
        text: PropTypes.string,
        textColor: PropTypes.string,
        backgroundColor: PropTypes.string,
    }
    static defaultProps = {
        visible: false,
        size: 'large',
        text: '加载...',
        backgroundColor: "#FFF"
    }

    render() {
        let {visible, children, size, color, text, backgroundColor, textColor} = this.props;
        return (<View style={[styles.container,visible&&{backgroundColor}]}>{visible ? <View style={styles.spinner}><ActivityIndicator color={color}
                                                                                                          size={size}/><Text
            style={[styles.text, {color: textColor}]}>{text}</Text></View> : children}</View>)
    }
}
const styles = StyleSheet.create({
    container: {flex: 1},
    spinner: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    text: {
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center'
    }
})