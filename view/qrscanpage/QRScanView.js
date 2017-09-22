/**
 * Created by lmy2534290808 on 2017/8/15.
 * 二维码扫描组件
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {QRScannerView} from 'ac-qrcode'
import Util from '../Util';
import {COLOR} from 'react-native-material-ui';
export default class QRScanView extends Component {
    static propTypes = {
        barcodeReceived: PropTypes.func.isRequired,//二维码扫描成功时触发
    }
   componentDidMount(){
        //模拟二维码扫描成功
        setTimeout(()=>{if(this.props.barcodeReceived)this.props.barcodeReceived({data:'123456'});},2000);
   }
    render() {
        return (
            < QRScannerView
                onScanResultReceived={(rec) => {
                    this.props.barcodeReceived(rec)
                }}
                renderTopBarView={() => {
                }}
                renderBottomMenuView={() => {
                }}
                cornerColor={COLOR.cyan500}
                scanBarColor={COLOR.cyan500}
                hintTextStyle={{color:COLOR.cyan500}}
            />
        )
    }
}