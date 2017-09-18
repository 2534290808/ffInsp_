/**
 * Created by lmy2534290808 on 2017/9/18.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import ListItemMenu from "./ListItemMenu";
import {Button} from 'react-native-material-ui';
import IconSvg from "../icon/IconSvg";
export default class ListItemMDIcon extends Component {
    static propTypes = {
        iconName: PropTypes.string,
        primaryText: PropTypes.string,
        secondaryText: PropTypes.string,
        buttonText: PropTypes.string,
        onPress: PropTypes.func,
    }

    render() {
        let {iconName, primaryText, secondaryText, buttonText, onPress} = this.props;
        return (<ListItemMenu  leftElement={iconName} primaryText={primaryText} secondaryText={secondaryText}
                              rightElement={<Button onPress={() => {
                                  onPress && onPress()
                              }} style={{text: styles.rightText}} text={buttonText}/>}/>)
    }
}
const styles = StyleSheet.create({
    rightText: {
        fontSize: 16,
        color: "#666"
    }
})