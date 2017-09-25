/**
 * Created by lmy2534290808 on 2017/9/14.
 * 设备详情组件
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {Card, ListItem, Subheader} from 'react-native-material-ui';
import {Card as EleCard, Button} from 'react-native-elements';
import ProjectSqliteUtil from '../../view/ProjectSqliteUtil';
let psu = new ProjectSqliteUtil();
export default class EquipmentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            equipmentData: [],
        }
    }

    componentDidMount() {
        let {floor} = this.props.navigation.state.params;
        psu.selectEquipmentInfo(floor).then(res => {
            this.setState({equipmentData: res})
        }).catch(e => {
            console.warn(JSON.stringify(e))
        })
    }

    render() {
        let {floor} = this.props.navigation.state.params;
        let {equipmentData} = this.state;
        return (<Card style={{container: styles.cardStyle}}><EleCard title={floor} titleStyle={{fontSize: 20}}
                                                                     containerStyle={styles.eleCardStyle}>
            <Subheader text="设备列表"/>
            {equipmentData.map((item, index) => <ListItem onPress={() => {
            }}  key={index} centerElement={item.name}/>)}
        </EleCard></Card>)
    }
}
const styles = StyleSheet.create({
    cardStyle: {marginVertical: 10},
    eleCardStyle: {
        borderWidth: 0, elevation: 0, margin: 0, backgroundColor: 'transparent', zIndex: -1
    }
})