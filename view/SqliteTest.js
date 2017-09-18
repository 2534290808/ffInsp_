/**
 * Created by lmy2534290808 on 2017/6/6.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View,
    Navigator,
    StyleSheet,ToastAndroid
} from 'react-native';
import SQLiteUtil from './sqliteUtil';
var sqliteUtil=new SQLiteUtil();
var db;
export default class SqliteTest extends Component{
    compennetDidUnmount(){
    }
    componentWillMount(){
       db=sqliteUtil.openDatabase('test.db','1.0','MySqlite');
       let createTableSql='CREATE TABLE IF NOT EXISTS USERS(' +
        'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
        'name varchar,'+
        'age INTEGER,' +
        'sex VARCHAR,' +
        'phone VARCHAR,' +
        'email VARCHAR,' +
        'qq VARCHAR)';
       sqliteUtil.executeSql(db,createTableSql,[]).then(()=>{ToastAndroid.show('建表成功',ToastAndroid.LONG)}).catch(()=>{
           ToastAndroid.show('建表失败',ToastAndroid.LONG)
       })
        let insertSql="INSERT INTO users(name,age,sex,phone,email,qq)"+
            "values('黎明1','','','','',''),('刘德华1','','','','',''),('郭富城1','','','','','')";
        var userData = [];
        var user = {};
        user.name = "张三";
        user.age = "28";
        user.sex = "男";
        user.phone = "18900001111";
        user.email = "2343242@qq.com";
        user.qq = "111222";
        userData.push(user);
        sqliteUtil.executeSql(db,insertSql,[]).then(()=>{ToastAndroid.show('插入成功',ToastAndroid.LONG)})
        sqliteUtil.executeSql(db,"select * from users",[]).then((rec)=>{
            var len = rec.rows.length;
            for(let i=0; i<len; i++){
                var u = rec.rows.item(i);
                //一般在数据查出来之后，  可能要 setState操作，重新渲染页面  
                alert("姓名："+u.name+"，年龄："+u.age+"，电话："+u.phone);
            }
        })
    }
    render(){
        return null;
    }
}  