/**
 * Created by lmy2534290808 on 2017/9/11.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {COLOR} from 'react-native-material-ui';
import ScrollableView from 'react-native-scrollable-tab-view';
import IconTabBar from "../IconTabBar";
import InspPage from "../insppage/InspPage";
import DownloadPage from "../download/DownloadPage";
import UploadPage from "../Upload/UploadPage";
export default class MainScreen extends Component {
    constructor() {
        super()
        this.state = {
            tabNames: ['主页', '下载', '上传'],
            tabIconNames: ['ios-home-outline', 'ios-cloud-download-outline', 'ios-cloud-upload-outline'],
            activeTabIconNames: ['ios-home', 'ios-cloud-download', 'ios-cloud-upload']
        }
        this._renderTabBar=this._renderTabBar.bind(this);
    }
    _renderTabBar(){
        let {activeTabIconNames,tabIconNames,tabNames}=this.state;
        return (<IconTabBar  activeTabColor={COLOR.cyan500} activeTabIconNames={activeTabIconNames} tabNames={tabNames}
                           tabIconNames={tabIconNames}/>)
    }

    render() {
        return (<ScrollableView tabBarPosition="bottom" renderTabBar={this._renderTabBar}>
            <InspPage tabLabel="1"/>
            <DownloadPage tabLabel="2"/>
            <UploadPage tabLabel="3"/>
        </ScrollableView>)
    }
}
