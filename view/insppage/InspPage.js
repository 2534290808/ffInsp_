/**
 * Created by lmy2534290808 on 2017/9/11.
 * 巡检入口页面
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, NativeAppEventEmitter} from 'react-native';
import PropTypes from 'prop-types';
import AppBar from "../AppBar";
import Container from "../Container";
import {Card, ListItem, Avatar, COLOR, Button} from 'react-native-material-ui';
import Icon from 'react-native-vector-icons/FontAwesome'
import ProjectSqliteUtil from '../../view/ProjectSqliteUtil'
import AsyncStorageInit from '../../view/AsyncStorageInit';
import SqliteTest from "../SqliteTest";
import BleManager from 'react-native-ble-manager';
new AsyncStorageInit();//对AsyncStorage进行初始化;
let psu = new ProjectSqliteUtil();//对工程数据文件进行初始化，如创建数据库，数据表等
import {NavigationActions} from 'react-navigation';
import CardContainer from "./CardContainer";
import ListItemMDIcon from "./ListItemMDIcon";
export default class InspPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bleEnabled: false
        }
        this._navigateQRScan = this._navigateQRScan.bind(this);
    }

    componentDidMount() {
        BleManager.start({showAlert: false}).then(() => {
            console.log('----')
        }).catch(e => {
        });
        this.bleEnable = NativeAppEventEmitter.addListener('BleManagerDidUpdateState', (args) => {
            if (args.state === 'on') {
                this.setState({bleEnabled: true})
            } else {
                this.setState({bleEnabled: false})
            }
        })
        BleManager.checkState();
    }

    componentWillUnmount() {
        this.bleEnable.remove();
    }

    _navigateQRScan() {
        this.props.navigation.navigate('QRScan')
    }

    render() {
        return (<Container>
            <AppBar centerElement="首页"/>
            <CardContainer>
                <ListItemMDIcon buttonText='连接' iconName='bluetooth' primaryText='蓝牙' secondaryText='未连接'/>
            </CardContainer>
            <Card style={{container: styles.cardContainer}} onPress={e => e}>
                <Icon name="qrcode" size={150} color={COLOR.cyan500}/>
                <Button raised style={{container: styles.button}} text="点击扫描" primary onPress={this._navigateQRScan}/>
            </Card>
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
