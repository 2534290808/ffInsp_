/**
 * Created by lmy2534290808 on 2017/9/18.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {ListItem,Icon} from 'react-native-material-ui';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
export default class ListItemMenu extends Component {
    static propTypes = {
        primaryText: PropTypes.string,
        secondaryText: PropTypes.string,
        onActionSelected: PropTypes.func,
        actions: MaterialIcon.ToolbarAndroid.propTypes.actions,
        overflowIconName: PropTypes.string,
        iconColor: PropTypes.string,
        leftIconName:PropTypes.string,
        leftIconColor:PropTypes.string,
        divider:PropTypes.bool,
    }
    static defaultProps = {}

    render() {
        let {primaryText, secondaryText, onActionSelected,leftIconName,leftIconColor,overflowIconName,actions,divider} = this.props
        return (<ListItem divider={divider} leftElement={<Icon name={leftIconName} color={leftIconColor}/>} centerElement={<View
            style={styles.centerElement}><Text
            style={styles.listCenterTitle}>{primaryText}</Text><Text
            style={styles.rightText}>{secondaryText}</Text></View>}
                          rightElement={<MaterialIcon.ToolbarAndroid
                              onActionSelected={(index) => onActionSelected && onActionSelected(index)} iconColor="#fff"
                              overflowIconName={overflowIconName}
                              style={{height: 56, width: 56}}
                              actions={actions}/>}/>)
    }
}
const styles = StyleSheet.create({
    rightText: {
        fontSize: 16,
        marginRight: 10,
        marginLeft: 10
    },
    listCenterTitle: {
        fontSize: 18,
        color: 'black',
    },
    centerElement: {
        flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'
    }
})