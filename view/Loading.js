/**
 * Created by lmy2534290808 on 2017/9/13.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, Modal, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
export default class Loading extends Component {
    static propTypes = {
        text: PropTypes.string,
        size: PropTypes.oneOf(['small', 'large']),
        indicatorColor: PropTypes.string,
        textColor: PropTypes.string,
        containerBackgroundColor: PropTypes.string,
        innerContainerBackgroundColor: PropTypes.string,
        visible: PropTypes.bool,
    }
    static defaultProps = {
        text: '加载中...',
        size: 'large',
        visible:false,
        containerBackgroundColor:'rgba(0,0,0,0.5)',
        innerContainerBackgroundColor:'#fff'
    }

    render() {
        let {text, size, indicatorColor, textColor, visible, containerBackgroundColor, innerContainerBackgroundColor} = this.props;
        return (<Modal visible={visible} transparent onRequestClose={() => {
        }}><View style={[styles.container, {backgroundColor: containerBackgroundColor}]}><View
            style={[styles.innerContainer, {backgroundColor: innerContainerBackgroundColor}]}><ActivityIndicator
            color={indicatorColor}
            size={size}/><Text
            style={[styles.textContainer, {color: textColor}]}>{text}</Text></View></View></Modal>)
    }
}
const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 120,
        width: 150,
        borderRadius: 10
    },
    textContainer: {
        fontSize: 16,
        marginTop: 5
    }

}