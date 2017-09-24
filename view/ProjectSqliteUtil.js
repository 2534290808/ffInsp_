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
        sqlite.executeSql(db, Sql.createHydrant, []).then(() => {
            //console.warn('create table hydrant')
        }).catch(e => {
        })
        sqlite.executeSql(db, Sql.createPump, []).then(() => {
            //console.warn('create table pump')
        }).catch(e => {
        })
        sqlite.executeSql(db, Sql.createRollerDoor, []).then(() => {
            //console.warn('create table roller_door')
        }).catch(e => {
        })
        sqlite.executeSql(db, Sql.createOther, []).then(() => {
            //console.warn('create table other')
        }).catch(e => {
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
            sqlite.executeSql(db, Sql.baseInsertEquipmentInfo + Util.getStringForBatchInsert(jsonArray, Sql.insertEquipmentInfoPropArray), []).then((res) => {
                resolve(res)
            }).catch(e => {
                reject(e)
            })
        })
    }

    selectUnitInfo() {
        if (!db) {
            db = this.openDB();
        }
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, Sql.selectUnitInfo, []).then((res) => {
                let rows = res.rows, len = rows.length, array = [];
                for (let i = 0; i < len; i++) {
                    array.push({name: rows.item(i).name})
                }
                resolve(array)
            }).catch(e => {
                reject(e)
            })
        })
    }

    selectBuildingInfo(unitName) {
        if (!db) {
            db = this.openDB();
        }
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, Sql.selectBuildingInfo, [unitName]).then((res) => {
                let rows = res.rows, len = rows.length, array = [];
                for (let i = 0; i < len; i++) {
                    array.push({name: rows.item(i).name})
                }
                resolve(array)
            }).catch(e => {
                reject(e)
            })
        })
    }

    selectFloorInfo(buildingName) {
        if (!db) {
            db = this.openDB();
        }
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, Sql.selectFloorInfo, [buildingName]).then((res) => {
                let rows = res.rows, len = rows.length, array = [];
                for (let i = 0; i < len; i++) {
                    array.push({name: rows.item(i).name})
                }
                resolve(array)
            }).catch(e => {
                reject(e)
            })
        })
    }

    selectTypeByQRCode(qrCode) {
        if (!db) {
            db = this.openDB();
        }
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, Sql.selectType, [qrCode]).then((res) => {
                let rows = res.rows, len = rows.length, array = [];
                for (let i = 0; i < len; i++) {
                    array.push({
                        type: rows.item(i).type,
                        qrCode: rows.item(i).qr_code,
                        imgPercentage: rows.item(i).img_percentage
                    })
                }
                resolve(array)
            }).catch(e => {
                reject(e)
            })
        })
    }

    selectEquipmentInfo(floorName) {
        if (!db) {
            db = this.openDB();
        }
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, Sql.selectEquipmentInfo, [floorName]).then((res) => {
                let rows = res.rows, len = rows.length, array = [];
                for (let i = 0; i < len; i++) {
                    array.push({name: rows.item(i).name})
                }
                resolve(array)
            }).catch(e => {
                reject(e)
            })
        })
    }

    judgeUnitExist(unitName) {
        if (!db) {
            db = this.openDB();
        }
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, Sql.judgeUnitExist, [unitName]).then((res) => {
                resolve(res.rows.item(0).number)
            }).catch(e => {
                reject(e)
            })
        })
    }

    deleteEquipmentsByUnit(unitName) {
        if (!db) {
            db = this.openDB();
        }
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, Sql.deleteEquipmentsByUnit, [unitName]).then(() => {
                resolve()
            }).catch(e => {
                reject(e)
            })
        })
    }

    /**
     * 插入消火栓数据
     * @param json
     * @returns {Promise}
     */
    insertHydrant(json) {
        if (!db) {
            db = this.openDB();
        }
        let {qrCode, vibrationCode, waterPressure, img, video, ensureWaterBag, ensureSprayHead, ensureEgIntact} = json;
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, Sql.insertHydrant, [qrCode, waterPressure, img, video, ensureEgIntact, ensureWaterBag, ensureSprayHead, vibrationCode]).then(() => {
                resolve()
            }).catch(e => {
                reject(e)
            })
        })
    }

    /**
     * 插入水泵数据
     * @param json
     * @returns {Promise}
     */
    insertPump(json) {
        if (!db) {
            db = this.openDB();
        }
        let {qrCode, vibrationCode, vibrationTime, img, video} = json;
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, Sql.insertPump, [qrCode, vibrationTime, vibrationCode, img, video]).then(() => {
                resolve()
            }).catch(e => {
                reject(e)
            })
        })
    }

    /**
     * 插入卷帘门数据
     * @param json
     * @returns {Promise}
     */
    insertRollerDoor(json) {
        if (!db) {
            db = this.openDB();
        }
        let {qrCode, openCode, closeCode, img, video} = json;
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, Sql.insertRollerDoor, [qrCode, openCode, closeCode, img, video]).then(() => {
                resolve()
            }).catch(e => {
                reject(e)
            })
        })
    }

    /**
     * 保存其他类数据
     * @param json
     * @returns {Promise}
     */
    insertOther(json) {
        if (!db) {
            db = this.openDB();
        }
        let {qrCode, img, video} = json;
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, Sql.insertOther, [qrCode, img, video]).then(() => {
                resolve()
            }).catch(e => {
                reject(e)
            })
        })
    }

    selectHydrantCount() {
        if (!db) {
            db = this.openDB();
        }
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, 'select count(1) number from hydrant', []).then((res) => {
                resolve(res.rows.item(0).number)
            }).catch(e => {
                reject(e)
            })
        })
    }

    selectPumpCount() {
        if (!db) {
            db = this.openDB();
        }
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, 'select count(1) number from pump', []).then((res) => {
                resolve(res.rows.item(0).number)
            }).catch(e => {
                reject(e)
            })
        })
    }

    selectRollerDoorCount() {
        if (!db) {
            db = this.openDB();
        }
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, 'select count(1) number from roller_door', []).then((res) => {
                resolve(res.rows.item(0).number)
            }).catch(e => {
                reject(e)
            })
        })
    }

    selectOtherCount() {
        if (!db) {
            db = this.openDB();
        }
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, 'select count(1) number from other', []).then((res) => {
                resolve(res.rows.item(0).number)
            }).catch(e => {
                reject(e)
            })
        })
    }

    getHydrants() {
        if (!db) {
            db = this.openDB();
        }
        let sql = 'select `qr_code`,`water_pressure`,`desc`, `img`, `video`, `ensure_eg_intact`, `ensure_water_bag`, `ensure_spray_head`,`insp_date`, `vibration_code` from hydrant';
        let formData=new FormData();
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, sql, []).then(res => {
                let rows = res.rows, len = rows.length;
                for (var i = 0; i < len; i++) {
                    let row = rows.item(i), baseName = 'hydrants[' + i + ']';
                    formData.append(baseName + '.qrCode', row.qr_code);
                    formData.append(baseName + '.waterPressure', row.water_pressure);
                    formData.append(baseName + '.desc', row.desc);
                    formData.append(baseName + '.img', row.img);
                    formData.append(baseName + '.video', row.video);
                    formData.append(baseName + '.ensureEgIntact', row.ensure_eg_intact);
                    formData.append(baseName + '.ensureWaterBag', row.ensure_water_bag);
                    formData.append(baseName + '.ensureSprayHead', row.ensure_spray_head);
                    formData.append(baseName + '.inspDate', row.insp_date);
                    formData.append(baseName + '.vibrationCode', row.vibration_code);
                }
                resolve(formData)
            }).catch(e => reject(e))
        })
    }
    getPumps(){
        if (!db) {
            db = this.openDB();
        }
        let sql = 'select `qr_code`,`vibration_time`,`vibration_code`,`img` ,`video`,`desc`,`insp_date` from pump';
        let formData=new FormData();
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, sql, []).then(res => {
                let rows = res.rows, len = rows.length;
                for (var i = 0; i < len; i++) {
                    let row = rows.item(i), baseName = 'pumps[' + i + ']';
                    formData.append(baseName + '.qrCode', row.qr_code);
                    formData.append(baseName + '.vibrationTime', row.vibration_time);
                    formData.append(baseName + '.desc', row.desc);
                    formData.append(baseName + '.img', row.img);
                    formData.append(baseName + '.video', row.video);
                    formData.append(baseName + '.inspDate', row.insp_date);
                    formData.append(baseName + '.vibrationCode', row.vibration_code);
                }
                resolve(formData)
            }).catch(e => reject(e))
        })
    }
    getRollerDoors(){
        if (!db) {
            db = this.openDB();
        }
        let sql = 'select `qr_code`,`close_code`,`open_code`,`desc`,`img`,`video`,`insp_date` from roller_door';
        let formData=new FormData();
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, sql, []).then(res => {
                let rows = res.rows, len = rows.length;
                for (var i = 0; i < len; i++) {
                    let row = rows.item(i), baseName = 'rollerDoors[' + i + ']';
                    formData.append(baseName + '.qrCode', row.qr_code);
                    formData.append(baseName + '.openCode', row.open_code);
                    formData.append(baseName + '.desc', row.desc);
                    formData.append(baseName + '.img', row.img);
                    formData.append(baseName + '.video', row.video);
                    formData.append(baseName + '.inspDate', row.insp_date);
                    formData.append(baseName + '.closeCode', row.close_code);
                }
                resolve(formData)
            }).catch(e => reject(e))
        })
    }
    getOthers(){
        if (!db) {
            db = this.openDB();
        }
        let sql = 'select `qr_code`,`desc`,`insp_date`,`img`,`video` from other';
        let formData=new FormData();
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, sql, []).then(res => {
                let rows = res.rows, len = rows.length;
                for (var i = 0; i < len; i++) {
                    let row = rows.item(i), baseName = 'others[' + i + ']';
                    formData.append(baseName + '.qrCode', row.qr_code);
                    formData.append(baseName + '.desc', row.desc);
                    formData.append(baseName + '.img', row.img);
                    formData.append(baseName + '.video', row.video);
                    formData.append(baseName + '.inspDate', row.insp_date);
                }
                resolve(formData)
            }).catch(e => reject(e))
        })
    }
    deleteTable(tableName){
        if (!db) {
            db = this.openDB();
        }
        let sql = 'delete from '+tableName;
        return new Promise((resolve, reject) => {
            sqlite.executeSql(db, sql, []).then(res => {
                console.warn(JSON.stringify(res))
               resolve(res);
            }).catch(e => reject(e))
        })
    }
    render() {
        return null
    }
}

