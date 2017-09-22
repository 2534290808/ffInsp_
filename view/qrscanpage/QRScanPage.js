/**
 * Created by lmy2534290808 on 2017/8/15.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text,ToastAndroid} from 'react-native';
import PropTypes from 'prop-types';
import QRScanView from "./QRScanView";
import {NavigationActions} from 'react-navigation';
import ProjectSqliteUtil from '../../view/ProjectSqliteUtil'
let psu=new ProjectSqliteUtil();
import Util from '../../view/Util';
export default class QRScanPage extends Component {
    constructor(props) {
        super(props);
       this._navigateInsp=this._navigateInsp.bind(this);
    }

    /*_navigateInsp(rec) {
        psu.selectTypeByQRCode(rec.data).then(res=>{
            if(res.length>0){
                let {type,qrCode,imgPercentage}=res[0];
                let routeName=type==1?'Hydrant':type==2?'Pump':type==3?'RollerDoor':'Other';
                let open=type==1?'b':type==2?'a':'';
                let action = NavigationActions.reset({
                    index: 1,
                    actions: [NavigationActions.navigate({routeName: 'Main'}), NavigationActions.navigate({
                        routeName:routeName,
                        params: {type,qrCode,imgPercentage}
                    })]
                })
                this.props.navigation.dispatch(action);
                /!*storage.load({key:'bleAddress'}).then(bleAddress=>{
                    if(type==1 || type==2){
                        Util.sendBleCharData(bleAddress,open).then(()=>{
                            this.props.navigation.dispatch(action);
                        }).catch(e=>{console.warn(JSON.stringify(e))
                            this.props.navigation.dispatch(action);
                        })
                    }else{
                        this.props.navigation.dispatch(action);
                    }
                })*!/

            }else{
                ToastAndroid.show('无法找到对应二维码',ToastAndroid.LONG);
                this.props.navigation.goBack();
            }
        }).catch(e=>{})

    }*/

    render() {
        return (<QRScanView barcodeReceived={this._navigateInsp}/>)
    }
}