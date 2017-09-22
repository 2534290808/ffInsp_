/**
 * Created by lmy2534290808 on 2017/9/11.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text,BackHandler,ToastAndroid} from 'react-native';
import PropTypes from 'prop-types';
import {COLOR} from 'react-native-material-ui';
import ScrollableView from 'react-native-scrollable-tab-view';
import IconTabBar from "../IconTabBar";
import InspPage from "../insppage/InspPage";
import DownloadPage from "../download/DownloadPage";
import UploadPage from "../Upload/UploadPage";
let firstClick=0;
export default class MainScreen extends Component {
    static navigationOptions={
        header:null
    }
    constructor() {
        super()
        this.state = {
            tabNames: ['主页', '下载', '上传'],
            tabIconNames: ['ios-home-outline', 'ios-cloud-download-outline', 'ios-cloud-upload-outline'],
            activeTabIconNames: ['ios-home', 'ios-cloud-download', 'ios-cloud-upload']
        }
        this._renderTabBar=this._renderTabBar.bind(this);
        this._handleBack=this._handleBack.bind(this);
    }
    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress',this._handleBack)
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this._handleBack)
    }
    _renderTabBar(){
        let {activeTabIconNames,tabIconNames,tabNames}=this.state;
        return (<IconTabBar  activeTabColor={COLOR.cyan500} activeTabIconNames={activeTabIconNames} tabNames={tabNames}
                           tabIconNames={tabIconNames}/>)
    }
    _handleBack() {
        var timestamp = (new Date()).valueOf();
        if (timestamp - firstClick > 2000) {
            firstClick = timestamp;
            ToastAndroid.show('再按一次退出', ToastAndroid.SHORT);
            return true;
        } else {
            return false;
        }
    }
    render() {
        return (<ScrollableView tabBarPosition="bottom" renderTabBar={this._renderTabBar}>
            <InspPage tabLabel="1" navigation={this.props.navigation}/>
            <DownloadPage tabLabel="2" navigation={this.props.navigation}/>
            <UploadPage tabLabel="3"/>
        </ScrollableView>)
    }
}
