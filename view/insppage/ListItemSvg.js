/**
 * Created by lmy2534290808 on 2017/9/18.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import ListItemMenu from "./ListItemMenu";
import {Button} from 'react-native-material-ui';
import IconSvg from "../icon/IconSvg";
export default class ListItemSvg extends Component {
    static propTypes = {
        svgName: PropTypes.string,
        primaryText: PropTypes.string,
        secondaryText: PropTypes.string,
        buttonText: PropTypes.string,
        onPress: PropTypes.func,
    }

    _renderButton() {
        let {onPress, buttonText} = this.props;
        return <Button onPress={() => {
            onPress && onPress()
        }} style={{text: styles.rightText}} text={buttonText}/>
    }

    render() {
        let {svgName, primaryText, secondaryText,} = this.props;
        return (<ListItemMenu leftElement={<IconSvg name={svgName}/>} primaryText={primaryText}
                              secondaryText={secondaryText}
                              rightElement={this._renderButton()}/>)
    }
}
const styles = StyleSheet.create({
    rightText: {
        fontSize: 16,
        color: "#666"
    }
})