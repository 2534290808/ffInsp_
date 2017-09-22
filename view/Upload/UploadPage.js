/**
 * Created by lmy2534290808 on 2017/9/11.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, Button,ToastAndroid,DeviceEventEmitter} from 'react-native';
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
export default class UploadPage extends Component {
    constructor() {
        super();
        this.state = {
            hydrant: 0,
            pump: 0,
            rollerDoor: 0,
            other: 0,
            visible:false
        }
        this._upload=this._upload.bind(this);
    }

    componentDidMount() {
        psu.selectHydrantCount().then(number => this.setState({hydrant: number})).catch(e => e)
        psu.selectPumpCount().then(number => this.setState({pump: number})).catch(e => e)
        psu.selectRollerDoorCount().then(number => this.setState({rollerDoor: number})).catch(e => e)
        psu.selectOtherCount().then(number => this.setState({other: number})).catch(e => e);
        this.uploaded=DeviceEventEmitter.addListener('uploadDataSuccess',()=>{
            let {hydrant,pump,rollerDoor,other}=this.state;
                if(!hydrant && !pump && !rollerDoor && !other){
                    ToastAndroid.show('上传成功',ToastAndroid.SHORT);
                }
       })
    }
   componentWillUnmount(){
        this.uploaded.remove();
   }
    _uploadHydrant() {
            psu.getHydrants().then(data => {
                if (data._parts.length > 0) {
                    Util.post(Constants.url.base + "/insertHydrants", data).then(res => {
                        if(res.success>0){
                           psu.deleteTable('hydrant').then(()=>{
                               this.setState({hydrant:0});
                               DeviceEventEmitter.emit('uploadDataSuccess')
                           }).catch(e=>e)
                        }
                    }).catch(e =>e)
                }else{
                    DeviceEventEmitter.emit('uploadDataSuccess')
                }
            }).catch(e =>e)
    }
    _uploadPump(){
        return new Promise((resolve, reject) => {
            psu.getPumps().then(data => {
                if (data._parts.length > 0) {
                    Util.post(Constants.url.base + "/insertPumps", data).then(res => {
                        if(res.success>0){
                            resolve();
                        }else{
                            reject()
                        }
                    }).catch(e => {
                        reject(e)
                    })
                }else{
                    resolve();
                }
            }).catch(e =>reject(e))
        })
    }
    _uploadRollerDoor(){
        return new Promise((resolve, reject) => {
            psu.getRollerDoors().then(data => {
                if (data._parts.length > 0) {
                    Util.post(Constants.url.base + "/insertRollerDoors", data).then(res => {
                        if(res.success>0){
                            resolve();
                        }else{
                            reject()
                        }
                    }).catch(e => {
                        reject(e)
                    })
                }else{
                    resolve();
                }
            }).catch(e =>reject(e))
        })
    }
    _uploadOther(){
        return new Promise((resolve, reject) => {
            psu.getOthers().then(data => {
                if (data._parts.length > 0) {
                    Util.post(Constants.url.base + "/insertOthers", data).then(res => {
                        if(res.success>0){
                            resolve();
                        }else{
                            reject()
                        }
                    }).catch(e => {
                        reject(e)
                    })
                }else{
                    resolve();
                }
            }).catch(e =>reject(e))
        })
    }
    _upload(){

    }
    render() {
        let {hydrant, pump, rollerDoor, other,visible} = this.state;
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