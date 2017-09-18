/**
 * Created by lmy2534290808 on 2017/9/14.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {Card,ListItem,Subheader} from 'react-native-material-ui';
import {Card as EleCard, Button} from 'react-native-elements';
import ProjectSqliteUtil from '../../view/ProjectSqliteUtil';
let psu=new ProjectSqliteUtil();
export default class FloorPage extends Component {
    constructor(props){
        super(props);
        this.state={
            floorData:[],
        }
    }
    componentDidMount(){
        let {building}=this.props.navigation.state.params;
        psu.selectFloorInfo(building).then(res=>{
            this.setState({floorData:res})
        }).catch(e=>{console.warn(JSON.stringify(e))})
    }
    _navigateFloor(floor){
        this.props.navigation.navigate('Equipment',{floor:floor})
    }
    render() {
        let {building}=this.props.navigation.state.params;
        let {floorData}=this.state;
        return (<Card style={{container: styles.cardStyle}}><EleCard title={building} titleStyle={{fontSize:20}}
                    containerStyle={styles.eleCardStyle}>
            <Subheader text="楼层列表"/>
            {floorData.map((item,index)=><ListItem onRightElementPress={()=>{this._navigateFloor(item.name)}} onPress={()=>{this._navigateFloor(item.name)}} key={index} centerElement={item.name} rightElement="arrow-forward"/>)}
        </EleCard></Card>)
    }
}
const styles = StyleSheet.create({
    cardStyle: {marginVertical: 10},
    eleCardStyle: {
        borderWidth: 0, elevation: 0, margin: 0, backgroundColor: 'transparent', zIndex: -1
    }
})