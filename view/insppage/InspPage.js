/**
 * Created by lmy2534290808 on 2017/9/11.
 * 巡检入口页面
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import AppBar from "../AppBar";
import Container from "../Container";
import {Card, ListItem, Avatar, COLOR, Button} from 'react-native-material-ui';
import Icon from 'react-native-vector-icons/FontAwesome'
import ProjectSqliteUtil from '../../view/ProjectSqliteUtil'
import AsyncStorageInit from '../../view/AsyncStorageInit';
import SqliteTest from "../SqliteTest";
new AsyncStorageInit();//对AsyncStorage进行初始化;
let psu=new ProjectSqliteUtil();//对工程数据文件进行初始化，如创建数据库，数据表等
export default class InspPage extends Component {
    render() {
        return (<Container>
            <AppBar centerElement="首页"/>
            <Card style={{container: {flex: 1,marginVertical:10}}} onPress={() => {
            }}><View style={styles.cardContent}>
                   <Icon name="qrcode" size={150} color={COLOR.cyan500}/>
                    <Button raised style={{container: {marginTop: 16}}} text="点击扫描" primary onPress={() => {
                       this.props.navigation.navigate('QRScan')
                    }}/>
                </View>
            </Card>
        </Container>)
    }
}
const styles = StyleSheet.create({
    cardContent: {
        paddingHorizontal: 16, paddingVertical: 16, justifyContent: 'center', alignItems: 'center', flex: 1
    },
})
