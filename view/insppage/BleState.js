/**
 * Created by lmy2534290808 on 2017/9/15.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text,NativeAppEventEmitter} from 'react-native';
import PropTypes from 'prop-types';
import {COLOR, Card, ListItem, Checkbox, IconToggle, Subheader, Icon,Avatar} from 'react-native-material-ui';
import BleManager from 'react-native-ble-manager';
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
           console.log('准备就绪');
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
            <ListItem onPress={()=>{}} divider leftElement={<Icon name="bluetooth" color={bleEnabled && COLOR.cyan500}/>}
                      centerElement="蓝牙" rightElement={<Text style={styles.rightText}>{bleEnabled?'可用':'不可用'}</Text>}
            />
            <ListItem leftElement={<Icon/>}/>
        </Card>)
    }
}
const styles=StyleSheet.create({
    rightText:{
        fontSize:16,
        marginRight:10
    }
})