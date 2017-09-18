/**
 * Created by lmy2534290808 on 2017/9/12.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {Card, ListItem} from 'react-native-material-ui';
class SearchHistoryItem extends Component {
    constructor(){
        super();
        this._onPress=this._onPress.bind(this)
    }
    static propTypes={
        history:PropTypes.string.isRequired,
        onPress:PropTypes.func,
    }
    _onPress(){
        let {onPress,history}=this.props;
        onPress && onPress(history);
    }
    render() {
        return (<Card style={{container:{elevation:4}}}><ListItem onPress={this._onPress} leftElement="history" centerElement={this.props.history}/></Card>)
    }
}
export default class SearchHistory extends Component {
    constructor(props){
        super(props);
        this.state={

        }
        this._onHistorySubmit=this._onHistorySubmit.bind(this);
    }
    static propTypes = {
        histories: PropTypes.array,
        onHistorySubmit:PropTypes.func,
    }
    static defaultProps={
        histories:['1','2']
    }
    _onHistorySubmit(value){
        let {onHistorySubmit}=this.props;
        onHistorySubmit && onHistorySubmit(value);
    }
    render() {
        return (<View>{this.props.histories.map((item,index)=><SearchHistoryItem onPress={this._onHistorySubmit} history={item} key={index}/>)}</View>)
    }
}