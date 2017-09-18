/**
 * Created by lmy2534290808 on 2017/9/12.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, ToolbarAndroid, TouchableNativeFeedback} from 'react-native';
import PropTypes from 'prop-types';
import {Card, COLOR, ListItem, Icon} from 'react-native-material-ui';
import CircleButton from "./CircleButton";
export default class SimpleToolBar extends Component {
    static propTypes = {
        title: PropTypes.string,
        actions: ToolbarAndroid.propTypes.actions,
        onActionSelected: ToolbarAndroid.propTypes.onActionSelected,
        containerStyle: PropTypes.any,
        overrideActionsToIcon: PropTypes.bool,
        actionIconName: PropTypes.string,
        onIconPress: PropTypes.func
    }
    static defaultProps = {
        overrideActionsToIcon: false,
    }

    render() {
        let {title, actions, onActionSelected, containerStyle, overrideActionsToIcon, actionIconName, onIconPress} = this.props;
        return (<Card style={{container: containerStyle}}><View style={styles.cardView}><Text
            style={styles.cardTitle}>{title}</Text>{overrideActionsToIcon ?<CircleButton onPress={onIconPress} iconName={actionIconName}/>
           :
            <ToolbarAndroid style={{height: 56, width: 56}}
                            actions={actions}
                            onActionSelected={onActionSelected}/>}
        </View></Card>)
    }
}
const styles = {
    cardView: {
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10
    },
    cardTitle: {fontSize:16,color:'black'}
}