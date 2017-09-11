/**
 * Created by lmy2534290808 on 2017/8/1.
 * 带有图标的MaterialTabbar组件 供react-native-scrollable-tab-view使用
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Util from './Util';
import BottomNavigation, {Tab} from 'react-native-material-bottom-navigation';
export default class MaterialIconTabBar extends Component {
    static propTypes = {
        //--必须的属性
        goToPage: PropTypes.func,//跳转到对应的tab方法
        activeTab: PropTypes.number,//当前被选中的tab下标
        tabs: PropTypes.array,//所有的tab集合
        //--自定义属性
        tabNames: PropTypes.array.isRequired,//保存的tab名称
        tabIconNames: PropTypes.array.isRequired,//保存的tab图标,必须为materialIcons里的图标
        activeTabIconNames: PropTypes.array,//选择的tab图标
        tabColor: PropTypes.string,//tab的颜色
        activeTabColor: PropTypes.string,//选择的tab颜色
        haveIcon: PropTypes.bool,//是否有icon
        tabContainerStyle: PropTypes.any,//
        barBackgroundColors:PropTypes.array,
    }
    static defaultProps = {
        tabColor: '#fff',
        activeTabColor: '#ff9933',
        haveIcon: true
    }

    setAnimationValue(value) {
    }

    componentDidMount() {
        // Animated.Value监听范围 [0, tab数量-1]
        this.props.scrollValue.addListener(this.setAnimationValue);
    }

    renderTabOption(tab, i) {
        let {activeTabIconNames,barBackgroundColors,tabNames,tabIconNames}=this.props;
        return (
            <Tab barBackgroundColor={barBackgroundColors && barBackgroundColors[i]} key={i} label={tabNames[i]}
                 icon={<Icon size={24} color={this.props.tabColor} name={tabIconNames[i]}/>}/>
       )
    }

    render() {
        return (<BottomNavigation onTabChange={(i)=>this.props.goToPage(i)} labelColor={this.props.tabColor} rippleColor="white"  style={styles.tabs}>{this.props.tabs.map((tab,i)=>this.renderTabOption(tab,i))}</BottomNavigation>)
    }
}
const styles = StyleSheet.create({
    tabs: {height: 56, elevation: 8, position: 'absolute', left: 0, bottom: 0, right: 0},
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabItem: {
        alignItems: 'center'
    }
})