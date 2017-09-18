/**
 * Created by lmy2534290808 on 2017/9/13.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons'
export default class CircleButton extends Component {
    static propTypes = {
        onPress: PropTypes.func,
        opacity: PropTypes.number,
        title: PropTypes.string,
        iconName: PropTypes.string,
        borderRadius: PropTypes.number,
        underlayColor: PropTypes.string
    }
    static defaultProps = {
        borderRadius: 20,
        underlayColor: '#ccc'
    }

    render() {
        let {onPress, opacity, title, iconName, borderRadius, underlayColor} = this.props;
        let styles = {
            container: {
                width: borderRadius * 2,
                height: borderRadius * 2,
                borderRadius: borderRadius,
                margin: (56 - borderRadius * 2)/2,
            }
        }
        return (<TouchableHighlight style={styles.container} onPress={onPress} activeOpacity={opacity}
                                    underlayColor={underlayColor}>
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>{iconName &&
            <Icon name={iconName} size={24}/>}{title &&
            <Text>{title}</Text>}</View>
        </TouchableHighlight>)
    }
}
