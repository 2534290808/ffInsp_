/**
 * Created by lmy2534290808 on 2017/9/15.
 * 蓝牙状态
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text,NativeAppEventEmitter} from 'react-native';
import PropTypes from 'prop-types';
import {COLOR, Card, ListItem, Checkbox, IconToggle, Subheader, Icon,Avatar} from 'react-native-material-ui';
import BleManager from 'react-native-ble-manager';
import ListItemMenu from "./ListItemMenu";
export default class BleState extends Component {
    static propTypes = {
        bleAddress: PropTypes.string,//蓝牙地址
    }

    constructor(props) {
        super(props)
        this.state = {
            bleEnabled: false
        }
    }
   componentDidMount(){
       BleManager.start({showAlert: false}).then(() => {
          console.log('----')
       });
       this.bleEnable=NativeAppEventEmitter.addListener('BleManagerDidUpdateState',(args)=>{
           if(args.state==='on'){
               this.setState({bleEnabled:true})
           }else{
               this.setState({bleEnabled:false})
           }
       })
       BleManager.checkState();
   }
   componentWillUnmount(){
       this.bleEnable.remove();
   }
    render() {
        let {bleEnabled} = this.state;
        return (<Card style={{container: {marginVertical: 10}}}>
            <ListItemMenu leftIconName='bluetooth' primaryText='蓝牙' secondaryText='可用' onActionSelected={(index)=>{alert(index)}} actions={[{title:'打开'},{title:'连接'}]}/>
        </Card>)
    }
}
const styles=StyleSheet.create({
    rightText:{
        fontSize:16,
        marginRight:10,
        marginLeft:10
    },
    listCenterTitle:{
        fontSize:18,
        color:'black',
    }
})