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
export default class BuildingPage extends Component {
    constructor(props){
        super(props);
        this.state={
            buildingData:[],
        }
    }
    componentDidMount(){
        let {unit}=this.props.navigation.state.params;
        psu.selectBuildingInfo(unit).then(res=>{
            this.setState({buildingData:res})
        }).catch(e=>{})
    }
    _navigateFloor(building){
        this.props.navigation.navigate('Floor',{building:building})
    }
    render() {
        let {unit}=this.props.navigation.state.params;
        let {buildingData}=this.state;
        return (<Card style={{container: styles.cardStyle}}><EleCard title={unit} titleStyle={{fontSize:20}}
                    containerStyle={styles.eleCardStyle}>
            <Subheader text="楼栋列表"/>
            {buildingData.map((item,index)=><ListItem onPress={()=>{this._navigateFloor(item.name)}} onRightElementPress={()=>{this._navigateFloor(item.name)}} key={index} centerElement={item.name}  rightElement="arrow-forward"/>)}
        </EleCard></Card>)
    }
}
const styles = StyleSheet.create({
    cardStyle: {marginVertical: 10},
    eleCardStyle: {
        borderWidth: 0, elevation: 0, margin: 0, backgroundColor: 'transparent', zIndex: -1
    }
})