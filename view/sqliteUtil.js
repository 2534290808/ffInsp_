/**
 * Created by lmy2534290808 on 2017/6/6.
 */
import React, {Component} from 'react';
import SQLiteStorage from 'react-native-sqlite-storage';
SQLiteStorage.DEBUG(true);
let db;//数据库
function isFunction(object) {
    return Object.prototype.toString.call(object) === '[object Function]';
}
export default class sqliteUtil extends Component {
    /**
     * 卸载时关闭数据库
     */
    componentWillUnmount() {
        if (db) {
            db.close();
        }
    }

    /**
     *打开数据库，如果最初已经存在了db文件，请使用此函数
     * @param name
     * @returns {*}
     */
    openLocalDatabase(name) {//在Android/app/arc/main/assets/www下，与db文件同名
        let db = SQLiteStorage.openDatabase({name: name, createFromLocation: 1}, () => {
           // this._successCB('open')
        }, err => {
           // this._errorCB('open',err)
        })
        return db;
    }

    /**
     * 打开数据库，如果最初没有此数据库，请使用此函数
     * @param name
     * @param version
     * @param displayName
     * @returns {*}
     */
    openDatabase(name, version, displayName) {
        db = SQLiteStorage.openDatabase(name, version, displayName, -1, () => {
           // this._successCB('open')
        }, err => {
           // this._errorCB('open', err)
        });
        return db;
    }

    /**
     * 执行sql语句，返回promise对象
     * @param database
     * @param sql
     * @param params
     * @returns {Promise}
     */
    executeSql(database, sql, params) {
        return new Promise((resolve,reject)=>{
            database.transaction(tx=>{
                tx.executeSql(sql,params,(tx,res)=>{
                    resolve(res)
                },err=>{
                    try {
                        return true// 如果执行过程发生错误，事务回滚
                    } finally {
                        reject(err)
                    }
                })
            })
        });
    }

    /**
     * 关闭数据库
     * @param database
     */
    closeDatabase(database) {
        if (database) {
            database.close()
        }
    }

    _successCB(name) {
        console.log("SQLiteStorage " + name + " success");
    }

    _errorCB(name, err) {
        console.log("SQLiteStorage " + name);
        console.log(err);
    }

    render() {
        return null;
    }
}
