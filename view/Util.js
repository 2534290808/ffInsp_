/**
 * Created by lmy2534290808 on 2017/7/26.
 * 工具类
 */
import React from 'react';
import {PixelRatio, Dimensions,ToastAndroid,StatusBar} from 'react-native';
const Util = {
    ratio: PixelRatio.get(),
    pixel: 1 / PixelRatio.get(),
    size: {
        width: Dimensions.get('window').width,//得到屏幕的宽度
        height: Dimensions.get('window').height,//得到屏幕的高度
        statusBarHeight:StatusBar.currentHeight//得到状态栏高度
    },
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
    // 得到批量上传的所需的json,通过ajax上传到struts2中的action
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
    key: 'BDKHFSDKJFHSDKFHWEFH-REACT-NATIVE',
    showToast(msg){
        ToastAndroid.show(msg,ToastAndroid.SHORT);
    },

}
export default Util;