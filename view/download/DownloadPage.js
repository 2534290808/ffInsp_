/**
 * Created by lmy2534290808 on 2017/9/11.
 * 下载页面
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, ToolbarAndroid, ScrollView, ProgressBarAndroid} from 'react-native';
import PropTypes from 'prop-types';
import Container from "../Container";
import AppBar from "../AppBar";
import {Card, ListItem, Toolbar, COLOR, Subheader} from 'react-native-material-ui';
import ListItem_ from "../test/ListItem";
import SearchHistory from "../SearchHistory";
import DownloadedContent from "./DownloadedContent";
import WillDownLoadContent from "./WillDownLoadContent";
import Spinner from "../Spinner";
import Loading from "../Loading";
import Util from '../../view/Util';
import Constants from '../../view/Constants';
import ProjectSqliteUtil from '../../view/ProjectSqliteUtil';
let psu = new ProjectSqliteUtil();
export default class DownloadPage extends Component {
    constructor() {
        super();
        this.state = {
            downloadedData: [],//已经下载的数据
            searching: false,//是否处于搜索界面
            submit: false,//是否提交
            inputValue: null,//搜索框输入的值
            loading: false,//是否加载
            willDownloadData: [],//将下载的数据
            downloading: false//是否正在下载
        }
        this._onSearchPressed = this._onSearchPressed.bind(this);
        this._onSearchClosed = this._onSearchClosed.bind(this);
        this._onChangeText = this._onChangeText.bind(this)
        this._submit = this._submit.bind(this);
        this._download = this._download.bind(this);
        this._optionDownloadedData = this._optionDownloadedData.bind(this);
    }

    /**
     * 组件加载完成
     */
    componentDidMount() {
        psu.selectUnitInfo().then(res => {
            this.setState({downloadedData: res})
        }).catch(e => {
            console.warn(JSON.stringify(e))
        })
    }

    /**
     * 按下搜索键
     * @private
     */
    _onSearchPressed() {
        this.setState({searching: true})
    }

    /**
     * 关闭搜索界面
     * @private
     */
    _onSearchClosed() {
        this.setState({searching: false, willDownloadData: [], inputValue: null});
        psu.selectUnitInfo().then(res => {
            this.setState({downloadedData: res})
        }).catch(e => {
            console.warn(JSON.stringify(e))
        })
    }

    /**
     * 搜索框文本改变
     * @param value
     * @private
     */
    _onChangeText(value) {
        this.setState({inputValue: value})
    }

    /**
     * 信息提交
     * @private
     */
    _submit() {
        this.setState({loading: true})
        let formData = new FormData();
        formData.append('unitInfo.name', this.state.inputValue);
        Util.post(Constants.url.base + "/getUnitInfos", formData).then(res => {
            this.setState({loading: false, willDownloadData: res})
        }).catch(e => {
        })
    }

    /**
     * 下载单位巡检信息
     * @param event
     * @private
     */
    _download(event) {
        psu.judgeUnitExist(event.value).then(number => {
            if (number == 0) {
                this.setState({downloading: true})
                let formData = new FormData();
                formData.append('info.unit', event.value);
                Util.post(Constants.url.base + "/getEquipmentsByRandom", formData).then(res => {
                    psu.insertBatchEquipmentInfos(res).then(() => {
                        this.setState({downloading: false})
                        Util.showToast('下载成功')
                    }).catch(e => {
                        Util.showToast('下载失败');
                        console.warn(JSON.stringify(e))
                    })
                }).catch(e => {
                    Util.showToast('下载失败');
                    console.warn(JSON.stringify(e))
                })
            } else {
                Util.showToast('单位信息已经下载')
            }
        }).catch(e => {
        })

    }

    /**
     * 对已经下载的数据进行操作
     * @param event
     * @private
     */
    _optionDownloadedData(event) {
        let {index, value, actionIndex} = event;
        let tempData = this.state.downloadedData;
        if (actionIndex == 0) {
            psu.deleteEquipmentsByUnit(value).then(() => {
                tempData.splice(index, 1);
                this.setState({downloadedData: tempData});
                Util.showToast('删除成功')
            }).catch(e => {
            })
        }else{
            this.props.navigation.navigate('Building',{unit:value})
        }
    }

    render() {
        let {searching, loading, downloadedData, willDownloadData, downloading} = this.state;
        return (<Container><AppBar
            centerElement="下载"
            searchable={{
                autoFocus: true,
                placeholder: '输入单位名',
                onSearchPressed: this._onSearchPressed,
                onSearchClosed: this._onSearchClosed,
                onSubmitEditing: this._submit,
                onChangeText: this._onChangeText
            }}/><Loading visible={downloading} textColor={COLOR.cyan500} indicatorColor={COLOR.cyan500}/><Spinner
            visible={loading} color={COLOR.cyan500} textColor={COLOR.cyan500}><ScrollView style={{flex: 1}}
                                                                                          contentContainerStyle={{backgroundColor: 'transparent'}}
                                                                                          showsVerticalScrollIndicator={false}>{!searching ?
            <DownloadedContent data={downloadedData} onPress={this._optionDownloadedData}/> :
            <WillDownLoadContent data={willDownloadData} onPress={this._download}/>}</ScrollView></Spinner></Container>)
    }
}
