/**
 * Created by lmy2534290808 on 2017/9/11.
 * 巡检入口页面
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, NativeAppEventEmitter, ToastAndroid, Modal} from 'react-native';
import PropTypes from 'prop-types';
import AppBar from "../AppBar";
import Container from "../Container";
import {Card, ListItem, Avatar, COLOR, Button, Toolbar} from 'react-native-material-ui';
import Icon from 'react-native-vector-icons/FontAwesome'
import ProjectSqliteUtil from '../../view/ProjectSqliteUtil'
import AsyncStorageInit from '../../view/AsyncStorageInit';
import BleManager from 'react-native-ble-manager';
new AsyncStorageInit();//对AsyncStorage进行初始化;
let psu = new ProjectSqliteUtil();//对工程数据文件进行初始化，如创建数据库，数据表等
import CardContainer from "./CardContainer";
import Util from '../../view/Util';
import ListItemMenu from "./ListItemMenu";
import Modal_ from 'react-native-modal';
import QRScanView from "../qrscanpage/QRScanView";
import {Toast} from 'antd-mobile';
export default class InspPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bleEnabled: false,//蓝牙是否可用
            bleConnected: false,//蓝牙是否连接
            bleState: '未打开',
            bleAddress: '',//蓝牙的地址
            value: '',
            scanning: false,//是否正在扫描
            visible: false//modal可见性
        }
        this._openQRScan = this._openQRScan.bind(this);
        this._optionBle = this._optionBle.bind(this);
        this._handleDidUpdateState = this._handleDidUpdateState.bind(this);
        this._handleDiscoverPeripheral = this._handleDiscoverPeripheral.bind(this);
        this._handleStopScan = this._handleStopScan.bind(this);
        this._handleDisconnectPeripheral = this._handleDisconnectPeripheral.bind(this);
        this._hideModal = this._hideModal.bind(this)
    }

    componentDidMount() {
        storage.load({key:'imgPathArray'}).then(imgPathArray=>{
            console.warn(imgPathArray.join(',')+'---')
        }).catch(e=>{
            storage.save({key:'imgPathArray',data:[]})
            console.warn(JSON.stringify(e))})
        //蓝牙初始化
        BleManager.start({showAlert: false, allowDuplicates: false});
        //蓝牙状态更新
        this.handleDidUpdateState = NativeAppEventEmitter.addListener('BleManagerDidUpdateState', this._handleDidUpdateState)
        /**
         * 注册发现外围设备的事件
         */
        this.handleDiscoverPeripheral = NativeAppEventEmitter.addListener('BleManagerDiscoverPeripheral', this._handleDiscoverPeripheral)

        //监听到蓝牙扫描停止，使用BleManager.stopScan()并不会触发
        this.handleStopScan = NativeAppEventEmitter.addListener('BleManagerStopScan', this._handleStopScan)
        //监听到设备已经连接
        /*this.bleConnect = NativeAppEventEmitter.addListener('BleManagerConnectPeripheral', (peripheral) => {
         this.setState({isConnected: true, bleState: '已连接'});
         ToastAndroid.show('蓝牙已经连接', ToastAndroid.SHORT);
         this.startNotify();
         })*/
        //监听到设备未连接
        this.handleDisconnectPeripheral = NativeAppEventEmitter.addListener('BleManagerDisconnectPeripheral', this._handleDisconnectPeripheral)
        //监听得到值
        /* this.handleDidUpdateValueForCharacteristic = NativeAppEventEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', (args) => {
         let value = args.value,len=value.length;
         ToastAndroid.show('有数据了',ToastAndroid.SHORT);
         if(len==12) {
         let time = value.slice(1, 8),card = [value[9], value[10], value[11]];
         this.setState({
         value: String.fromCharCode(...time)+parseInt(card.map((v)=>Util.byteToHexString(v)).join(''),16)
         })
         }
         })*/
        BleManager.checkState();
    }

    componentWillUnmount() {
        this.handleDidUpdateState.remove();
        this.handleDiscoverPeripheral.remove();
        this.handleStopScan.remove();
        this.handleDisconnectPeripheral.remove();
        //this.handleDidUpdateValueForCharacteristic.remove();
        let {bleAddress} = this.state;
        BleManager.isPeripheralConnected(bleAddress, []).then(isConnected => {
            if (isConnected) {
                BleManager.disconnect(bleAddress).then(() => {
                    BleManager.removePeripheral(bleAddress)
                }).catch(e => e)
            } else {
                BleManager.removePeripheral(bleAddress)
            }
        }).catch(e => e)
    }

    _handleDidUpdateState(args) {
        if (args.state === 'on') {
            this.setState({bleEnabled: true})
        } else if (args.state == 'off') {
            this.setState({bleEnabled: false});
        }
    }

    _handleDiscoverPeripheral(data) {
        if (data.name == "BLE SPP") {
            this.setState({bleAddress: data.id})
            BleManager.stopScan().then(() => {
                this.setState({scanning: false})
                BleManager.connect(data.id).then(() => {
                    this.setState({bleConnected: true});
                    storage.save({key: 'bleAddress', data: data.id});
                    this.startNotify();
                    Toast.hide();
                    ToastAndroid.show('蓝牙已经连接', ToastAndroid.SHORT);

                })
            });
        }
    }

    _handleStopScan() {
        this.setState({scanning: false});
        Toast.hide();
        ToastAndroid.show('未找到蓝牙',ToastAndroid.SHORT);
    }

    _handleDisconnectPeripheral() {
        this.setState({bleConnected: false});
        BleManager.removePeripheral(this.state.bleAddress)
        Toast.hide();
        ToastAndroid.show('蓝牙断开连接', ToastAndroid.SHORT);
    }

    _optionBle(index) {
        let {bleEnabled, bleConnected, scanning} = this.state;
        if (index == 0) {
            if (bleEnabled) {
                ToastAndroid.show('蓝牙已经打开', ToastAndroid.SHORT);
            } else {
                BleManager.enableBluetooth().then(() => {
                })
            }
        } else {
            if (bleEnabled) {
                if (bleConnected) {
                    ToastAndroid.show('蓝牙已连接', ToastAndroid.SHORT);
                } else {
                    if (!scanning) {
                        Toast.loading('连接中...',0);
                        BleManager.scan([], 5, true).then(() => {
                        })
                    }
                }
            } else {
                ToastAndroid.show('蓝牙未打开', ToastAndroid.SHORT);
            }
        }
    }

    startNotify() {
        BleManager.retrieveServices(this.state.bleAddress).then((info) => {
            let serviceUUID, characterUUID;
            // ToastAndroid.show(JSON.stringify(info.characteristics),ToastAndroid.LONG);
            for (var item of info.characteristics) {
                let {Notify} = item.properties;
                if (Notify) {
                    serviceUUID = item.service;
                    characterUUID = item.characteristic;
                    break;
                }
            }
            BleManager.startNotification(this.state.bleAddress, serviceUUID, characterUUID).then(() => {
                //ToastAndroid.show('打开通知成功', ToastAndroid.LONG);
            }).catch(() => {
                // ToastAndroid.show('打开通知失败', ToastAndroid.LONG);
            })
        })
    }

    _writeData(char) {
        return new Promise((resolve, reject) => {
            BleManager.retrieveServices(this.state.bleAddress).then((info) => {
                let serviceUUID, characterUUID;
                for (var item of info.characteristics) {
                    let {Notify, WriteWithoutResponse} = item.properties;
                    if (WriteWithoutResponse && Notify) {
                        serviceUUID = item.service;
                        characterUUID = item.characteristic
                        break;
                    }
                }
                BleManager.writeWithoutResponse(this.state.bleAddress, serviceUUID, characterUUID, [char.charCodeAt(0)]).then(() => {
                    resolve();
                }).catch((e) => reject(e))
            })
        })
    }

    _openQRScan() {
        if (this.state.bleConnected) {
            this.setState({visible: true})
        } else {
            ToastAndroid.show('蓝牙未连接', ToastAndroid.SHORT);
        }

    }

    _hideModal() {
        this.setState({visible: false})
    }

    _navigateInsp(rec) {
        psu.selectTypeByQRCode(rec.data).then(res => {
            if (res.length > 0) {
                let {type, qrCode, imgPercentage} = res[0];
                let routeName = type == 1 ? 'Hydrant' : type == 2 ? 'Pump' : type == 3 ? 'RollerDoor' : 'Other';
                let open = type == 1 ? 'b' : type == 2 ? 'a' : '';
                if (type == 1 || type == 2) {
                    Util.sendBleCharData(this.state.bleAddress, open).then(() => {
                        this._hideModal();
                        this.props.navigation.navigate(routeName, {type, qrCode, imgPercentage})
                    }).catch(e => {
                        this._hideModal();
                        ToastAndroid.show('蓝牙发生异常', ToastAndroid.SHORT)
                    })
                } else {
                    this._hideModal();
                    this.props.navigation.navigate(routeName, {type, qrCode, imgPercentage})
                }
            } else {
                ToastAndroid.show('无法找到对应二维码', ToastAndroid.LONG);
            }
        }).catch(e => {
        })

    }

    render() {
        let {bleConnected} = this.state;
        return (<Container>
            <AppBar centerElement="首页"/>
            <CardContainer>
                <ListItemMenu leftElement='bluetooth' primaryText='蓝牙' secondaryText={bleConnected ? '已连接' : '未连接'}
                              actions={[{title: '打开'}, {title: '连接'}]} onActionSelected={this._optionBle}/>
            </CardContainer>
            <Card style={{container: styles.cardContainer}} onPress={e => e}>
                <Icon name="qrcode" size={150} color={COLOR.cyan500}/>
                <Button raised style={{container: styles.button}} text="点击扫描" primary onPress={this._openQRScan}/>
                <Text>{this.state.value}</Text>
            </Card>
            <Modal_ animationIn="fadeIn" animationOut="fadeOut" style={{flex: 1, margin: 0, padding: 0}}
                    onBackButtonPress={this._hideModal}
                    isVisible={this.state.visible}>
                <Container>
                    <Toolbar onLeftElementPress={this._hideModal} leftElement="arrow-back"
                             centerElement="扫描"/>
                    <QRScanView barcodeReceived={(rec) => this._navigateInsp(rec)}/>
                </Container>
            </Modal_>
        </Container>)
    }
}
const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        marginVertical: 10,
        paddingHorizontal: 16,
        paddingVertical: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginTop: 16
    }
})
