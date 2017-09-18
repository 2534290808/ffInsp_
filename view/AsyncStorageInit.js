/**
 * Created by lmy2534290808 on 2017/9/14.
 * RN AsyncStorage初始化，只需在首页引入即可在全局使用storage进行操作
 */
import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import Storage from 'react-native-storage';
export default class AsyncStorageInit extends Component {
    constructor() {
        super();
        var storage = new Storage({
            // maximum capacity, default 1000
            size: 10000,

            // Use AsyncStorage for RN, or window.localStorage for web.
            // If not set, data would be lost after reload.
            storageBackend: AsyncStorage,

            // expire time, default 1 day(1000 * 3600 * 24 milliseconds).
            // can be null, which means never expire.
            defaultExpires: null,

            // cache data in the memory. default is true.
            enableCache: true,

            // if data was not found in storage or expired,
            // the corresponding sync method will be invoked and return
            // the latest data.
            sync: {
                // we'll talk about the details later.
            }
        })
        // I suggest you have one(and only one) storage instance in global scope.

        // for web
        // window.storage = storage;

        // for react native
       // global.storage = storage;
        global.storage=storage;
    }

    render() {
        return null
    }
}
