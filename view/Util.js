/**
 * Created by lmy2534290808 on 2017/7/26.
 * 工具类
 */
import React from 'react';
import {PixelRatio, Dimensions, ToastAndroid, StatusBar} from 'react-native';
import BleManager from 'react-native-ble-manager';
const Util = {
    /**
     * 获取设备的像素
     */
    ratio: PixelRatio.get(),
    /**
     * 得到单位像素
     */
    pixel: 1 / PixelRatio.get(),
    /**
     * 得到设备的尺寸信息
     */
    size: {
        width: Dimensions.get('window').width,//得到屏幕的宽度
        height: Dimensions.get('window').height,//得到屏幕的高度
        statusBarHeight: StatusBar.currentHeight//得到状态栏高度
    },
    /**
     * 封装fetch，注意：data应为FormData类型
     * @param url
     * @param data
     * @returns {Promise}
     */
    post(url, data){
        let fetchOptions = {
            method: 'POST',
            headers: {
                /*'Accept': 'application/json',
                 'Content-Type': 'application/json'*/
            },
            body: data
        };
        // console.warn(JSON.stringify(data));
        return new Promise((resolve, reject) => {
            fetch(url, fetchOptions).then((response) => response.json()).then(
                (responseJson) => {
                    resolve(responseJson)
                }
            ).catch((e) => {
                reject(e)
            })
        });
    },
    /**
     * 得到批量上传的所需的json,通过ajax上传到struts2中的action
     * @param jsonArray
     * @param str
     * @returns {{}}
     */
    getJsonForBatchUpload(jsonArray, str) {
        var strJSON = "{";
        var len = jsonArray.length;
        var json;
        if (len > 0) {
            json = jsonArray[0];
            for (var i = 0; i < len; i++) {
                var row = jsonArray[i];
                for (var x in json) {
                    var tempStr;
                    if (typeof (row[x]) !== 'number') {
                        tempStr = '\":\"' + row[x] + '\"';
                    } else {
                        tempStr = '\":' + row[x];
                    }
                    if (strJSON !== "{") {
                        strJSON += ',\"' + str + '[' + i + '].' + x + tempStr;
                    } else {
                        strJSON += '\"' + str + '[' + i + '].' + x + tempStr;
                    }
                }
            }
            strJSON += "}";
            console.log(strJSON);
            return JSON.parse(strJSON);
        }
        return {}
    },
    /**
     * 得到批量插入的字符chuan
     * @param jsonArray 原始数据
     * @param propArray 哪些属性
     */
    getStringForBatchInsert(jsonArray, propArray){
        let temp = []
        for (let item of jsonArray) {
            let str = "("
            for (let index in propArray) {
                let value = item[propArray[index]];
                str += (value == 'undefined' || value == null || value == '' ? "''" : "'" + value + "'");
                if (index != propArray.length - 1) {
                    str += ','
                } else {
                    str += ')'
                }
            }
            temp.push(str);
        }
        return temp.join(',');
    },
    /**
     * 将一个字节转换为十六进制的字符串
     * @param byte
     * @returns {string}
     */
    byteToHexString(byte){
        let hexStr = ((byte + 256) % 256).toString(16)
        return hexStr.length == 1 ? '0' + hexStr : hexStr;
    },
    startBleNotify(bleAddress){
        BleManager.isPeripheralConnected(bleAddress).then(isConnected => {
            if (isConnected) {
                BleManager.retrieveServices(bleAddress).then((info) => {
                    let serviceUUID, characterUUID;
                    for (var item of info.characteristics) {
                        let {Notify} = item.properties;
                        if (Notify) {
                            serviceUUID = item.service;
                            characterUUID = item.characteristic;
                            break;
                        }
                    }
                    BleManager.startNotification(bleAddress, serviceUUID, characterUUID).then(() => {
                        //ToastAndroid.show('打开通知成功', ToastAndroid.LONG);
                    }).catch(() => {
                        // ToastAndroid.show('打开通知失败', ToastAndroid.LONG);
                    })
                })
            }
        }).catch(e => e)
    },
    sendBleCharData(bleAddress, char){
        return new Promise((resolve, reject) => {
            BleManager.retrieveServices(bleAddress).then((info) => {
                let serviceUUID, characterUUID;
                for (var item of info.characteristics) {
                    let {Notify, WriteWithoutResponse} = item.properties;
                    if (WriteWithoutResponse && Notify) {
                        serviceUUID = item.service;
                        characterUUID = item.characteristic
                        break;
                    }
                }
                BleManager.writeWithoutResponse(bleAddress, serviceUUID, characterUUID, [char.charCodeAt(0)]).then(() => {
                    resolve();
                }).catch((e) => reject(e))
            })
        })
    },
    key: 'BDKHFSDKJFHSDKFHWEFH-REACT-NATIVE',
    showToast(msg){
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    },

}
export default Util;