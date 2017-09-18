/**
 * Created by lmy2534290808 on 2017/9/18.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {Svg, Path} from 'react-native-svg';
import IconSvgProducer from './IconSvgProducer';
export default class IconSvg extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        style:PropTypes.any,
        color:PropTypes.string,
    }
    static defaultProps={
        color:'#666'
    }
    render() {
        let {name,style,color} = this.props;
        return (<Svg width="25" height="25" style={style} viewBox="0 0 1024 1024">
            {IconSvgProducer[name]['path'].map((item, index) => <Path key={index} d={item} fill={color}/>)}
        </Svg>)
    }
}