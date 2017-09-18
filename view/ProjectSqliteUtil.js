/**
 * Created by lmy2534290808 on 2017/9/14.
 * 具体app的sqlit工具及
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import SqliteUtil from './sqliteUtil';
import Sql from './Sql';
import Util from './Util';
let sqlite = new SqliteUtil();
let db;
export default class ProjectSqliteUtil extends Component {
    constructor() {
        super();
        db = sqlite.openDatabase('ffinsp.db', '1.0.0', 'MyFFInsp');//构造器中打开或创建数据库及数据表
        sqlite.executeSql(db, Sql.createEquipmentDetailInfo, []).then(() => {
            // console.warn('success')
        }).catch(e => {
            //console.warn(JSON.stringify(e))
        })
    }

    openDB() {
        return sqlite.openDatabase('ffinsp.db', '1.0.0', 'MyFFInsp');
    }

    insertBatchEquipmentInfos(jsonArray) {
        if (!db) {
            db = this.openDB();
        }
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, Sql.baseInsertEquipmentInfo + Util.getStringForBatchInsert(jsonArray, Sql.insertEquipmentInfoPropArray), []).then((res)=> {
                resolve(res)
            }).catch(e => {
                reject(e)
            })
        })
    }
    selectUnitInfo(){
        if (!db) {
            db = this.openDB();
        }
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, Sql.selectUnitInfo, []).then((res)=> {
                let rows=res.rows,len=rows.length,array=[];
                for(let i=0;i<len;i++){
                    array.push({name:rows.item(i).name})
                }
                resolve(array)
            }).catch(e => {
                reject(e)
            })
        })
    }
    selectBuildingInfo(unitName){
        if (!db) {
            db = this.openDB();
        }
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, Sql.selectBuildingInfo, [unitName]).then((res)=> {
                let rows=res.rows,len=rows.length,array=[];
                for(let i=0;i<len;i++){
                    array.push({name:rows.item(i).name})
                }
                resolve(array)
            }).catch(e => {
                reject(e)
            })
        })
    }
    selectFloorInfo(buildingName){
        if (!db) {
            db = this.openDB();
        }
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, Sql.selectFloorInfo, [buildingName]).then((res)=> {
                let rows=res.rows,len=rows.length,array=[];
                for(let i=0;i<len;i++){
                    array.push({name:rows.item(i).name})
                }
                resolve(array)
            }).catch(e => {
                reject(e)
            })
        })
    }
    selectEquipmentInfo(floorName){
        if (!db) {
            db = this.openDB();
        }
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, Sql.selectEquipmentInfo, [floorName]).then((res)=> {
                let rows=res.rows,len=rows.length,array=[];
                for(let i=0;i<len;i++){
                    array.push({name:rows.item(i).name})
                }
                resolve(array)
            }).catch(e => {
                reject(e)
            })
        })
    }
    judgeUnitExist(unitName){
        if (!db) {
            db = this.openDB();
        }
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, Sql.judgeUnitExist, [unitName]).then((res)=> {
                resolve(res.rows.item(0).number)
            }).catch(e => {
                reject(e)
            })
        })
    }
    deleteEquipmentsByUnit(unitName){
        if (!db) {
            db = this.openDB();
        }
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, Sql.deleteEquipmentsByUnit, [unitName]).then(()=> {
                resolve()
            }).catch(e => {
                reject(e)
            })
        })
    }
    render() {
        return null
    }
}

