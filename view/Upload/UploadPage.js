/**
 * Created by lmy2534290808 on 2017/9/11.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, ToastAndroid, DeviceEventEmitter} from 'react-native';
import PropTypes from 'prop-types';
import Container from "../Container";
import AppBar from "../AppBar";
import CardContainer from "../insppage/CardContainer";
import {ListItem, COLOR} from 'react-native-material-ui';
import {Card} from 'react-native-elements';
import ListItemSvg from "../insppage/ListItemSvg";
import ProjectSqliteUtil from '../../view/ProjectSqliteUtil';
let psu = new ProjectSqliteUtil();
import Util from '../../view/Util';
import Constants from '../../view/Constants';
import Loading from "../Loading";
import {Toast} from 'antd-mobile';
export default class UploadPage extends Component {
    constructor() {
        super();
        this.state = {
            hydrant: 0,
            pump: 0,
            rollerDoor: 0,
            other: 0,
            visible: false,

        }
        this._upload = this._upload.bind(this);
    }

    componentDidMount() {
        this._updateNum();
        this.saved = DeviceEventEmitter.addListener('savedEvent',() =>{
           this._updateNum();
        })
    }

    componentWillUnmount() {
        this.saved.remove();
    }
    _updateNum(){
        psu.selectHydrantCount().then(number=>this.setState({hydrant:number}))
        psu.selectPumpCount().then(number=>this.setState({pump:number}))
        psu.selectRollerDoorCount().then(number=>this.setState({rollerDoor:number}))
        psu.selectOtherCount().then(number=>this.setState({other:number}))
    }
    _uploadHydrant() {
        return new Promise((resolve, reject) => {
            psu.getHydrants().then(data => {
                if (data._parts.length > 0) {
                    Util.post(Constants.url.base + "/insertHydrants", data).then(res => {
                        if (res.success > 0) {
                            resolve();
                        } else {
                            reject()
                        }
                    }).catch(e => {
                        reject(e)
                    })
                } else {
                    resolve();
                }
            }).catch(e => reject(e))
        })
    }

    _uploadPump() {
        return new Promise((resolve, reject) => {
            psu.getPumps().then(data => {
                if (data._parts.length > 0) {
                    Util.post(Constants.url.base + "/insertPumps", data).then(res => {
                        if (res.success > 0) {
                            resolve();
                        } else {
                            reject()
                        }
                    }).catch(e => {
                        reject(e)
                    })
                } else {
                    resolve();
                }
            }).catch(e => reject(e))
        })
    }

    _uploadRollerDoor() {
        return new Promise((resolve, reject) => {
            psu.getRollerDoors().then(data => {
                if (data._parts.length > 0) {
                    Util.post(Constants.url.base + "/insertRollerDoors", data).then(res => {
                        if (res.success > 0) {
                            resolve();
                        } else {
                            reject()
                        }
                    }).catch(e => {
                        reject(e)
                    })
                } else {
                    resolve();
                }
            }).catch(e => reject(e))
        })
    }

    _uploadOther() {
        return new Promise((resolve, reject) => {
            psu.getOthers().then(data => {
                if (data._parts.length > 0) {
                    Util.post(Constants.url.base + "/insertOthers", data).then(res => {
                        if (res.success > 0) {
                            resolve();
                        } else {
                            reject()
                        }
                    }).catch(e => {
                        reject(e)
                    })
                } else {
                    resolve();
                }
            }).catch(e => reject(e))
        })
    }
    _showLoading(){
        Toast.loading('上传中...',0);
    }
    _loadError(info){
        Toast.hide();
        ToastAndroid.show('上传失败'+info,ToastAndroid.LONG);
    }
    _loadSuccess(){
        Toast.hide();
        ToastAndroid.show('上传成功',ToastAndroid.LONG);
    }
    _upload() {
        this._showLoading();
        this._uploadHydrant().then(() => {
            psu.deleteTable('hydrant')
            this._uploadPump().then(() => {
                psu.deleteTable('pump');
                this._uploadRollerDoor().then(() => {
                    psu.deleteTable('roller_door');
                    this._uploadOther().then(()=>{
                        psu.deleteTable('other');
                        this._uploadImages().then(() => {
                            storage.save({key:'imgPathArray',data:[]})
                            this._updateNum();
                            this._loadSuccess();
                        })
                    }).catch(e=>this._loadError('other'))
                }).catch(e=>this._loadError('roller_door'))
            }).catch(e=>this._loadError('pump'))
        }).catch(e=>this._loadError('hydrant'))
    }

    _uploadImages() {
        return new Promise((resolve, reject) => {
            storage.load({key:'imgPathArray'}).then(imgPathArray=>{
                ToastAndroid.show('imgPathArray.length:'+imgPathArray.length,ToastAndroid.LONG);
                if (imgPathArray.length == 0) {
                    resolve();
                } else {
                    let formData = new FormData();
                    for (let i = 0; i < imgPathArray.length; i++) {
                        let name = imgPathArray[i].slice(imgPathArray[i].lastIndexOf('/') + 1);
                        let file = {uri: imgPathArray[i], type: 'multipart/form-data', name: name};
                        formData.append("files", file);
                    }
                    fetch(Constants.url.base + "/filesUpload", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                        body: formData,
                    }).then((response) => response.json())
                        .then((responseData) => {
                            console.warn('success' + responseData.success);
                            if(responseData.success>0){
                                resolve()
                            }else{
                                reject();
                            }
                        }).catch((error) => {
                        console.error('error', error);
                        reject(error)
                    });
                }
            })
            })
    }

    render() {
        let {hydrant, pump, rollerDoor, other, visible} = this.state;
        return (<Container><AppBar centerElement="上传"/><Loading visible={visible}/>
            <CardContainer>
                <Card containerStyle={styles.eleCard} titleStyle={styles.cardTitle} title="上传数据概况">
                    <ListItem centerElement='消火栓' rightElement={<Text>{'数据量：' + hydrant}</Text>}/>
                    <ListItem centerElement='水泵' rightElement={<Text>{'数据量：' + pump}</Text>}/>
                    <ListItem centerElement='消防门' rightElement={<Text>{'数据量：' + rollerDoor}</Text>}/>
                    <ListItem centerElement='其他类' rightElement={<Text>{'数据量：' + other}</Text>}/>
                </Card>
            </CardContainer>
            <CardContainer>
                <Button color={COLOR.cyan500} title="一键上传" onPress={this._upload}/>
            </CardContainer>
        </Container>)
    }
}
const styles = StyleSheet.create({
    eleCard: {
        borderWidth: 0, elevation: 0, margin: 0
    },
    cardTitle: {
        fontSize: 18
    },
    listText: {
        width: 56
    }
})