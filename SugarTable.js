import React, { Component } from 'react';
import {
    AppRegistry,
    Image,
    NativeModules,
    Navigator,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { COLOR, ThemeProvider, Button, PropTypes, Toolbar } from 'react-native-material-ui';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import api from '../utilities/api';
import moment from 'moment';
import { StackNavigator } from 'react-navigation';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Container = (props) => {
    return (
        <View style={styles.container}>
            {props.children}
        </View>
    );
};

export default class SugarTable extends React.Component {
    static navigationOptions = {
        headerLeft: null,
        headerMode: 'none',
        headerStyle: { height: 0 },
    };

    constructor(props) {
        super(props);

        this.state = {
            sugars: [],
            lastUpdatedTable: '',
            log: [],
        }
    }

    componentWillMount() {
        api.getSteps().then((res) => {
            console.log(res.summary.steps);
      
            let steps = res.summary.steps;
      
            let stepsDate = moment("11 01 2017", "MM DD YYYY").toString();
      
            this.setState({
              steps: steps,
              stepsDate: stepsDate
            })
          });
        api.getGlucose().then((res) => {

            let reading1 = (res.logs[0].value * 18)
            let reading2 = (res.logs[1].value * 18)
            let reading3 = (res.logs[2].value * 18)
            let reading4 = (res.logs[3].value * 18)
            let reading5 = (res.logs[4].value * 18)            
            let readingDate1 = (res.logs[0].created)
            let readingDate2 = (res.logs[1].created)
            let readingDate3 = (res.logs[2].created)
            let readingDate4 = (res.logs[3].created)
            let readingDate5 = (res.logs[4].created)
            
            
            this.setState({
                sugar1: reading1,
                sugar2: reading2,
                sugar3: reading3,
                sugar4: reading4,
                sugar5: reading5,                
                created1: readingDate1,
                created2: readingDate2,
                created3: readingDate3,
                created4: readingDate4,
                created5: readingDate5,
                // timeCreated1: readingTime1,
                // timeCreated1: readingTime2,
                // timeCreated1: readingTime3,
                // timeCreated1: readingTime4,
                // timeCreated1: readingTime5,
                
                
            })
        });
    }

render() {
       
    const tableHead = ['Date', 'Time', 'Reading'];
    const tableData = [
        [moment(this.state.created1).format("M/D/YYYY"), moment(this.state.created1).format("h:mm a"),this.state.sugar1],
        [moment(this.state.created2).format("M/D/YYYY"), moment(this.state.created2).format("h:mm a"),this.state.sugar2],
        [moment(this.state.created3).format("M/D/YYYY"), moment(this.state.created3).format("h:mm a"),this.state.sugar3],
        [moment(this.state.created4).format("M/D/YYYY"), moment(this.state.created4).format("h:mm a"),this.state.sugar4],
        [moment(this.state.created5).format("M/D/YYYY"), moment(this.state.created5).format("h:mm a"),this.state.sugar5],
    ]

    return (
        <ScrollView>
            <Text>{this.state.sugars}</Text>
            <Table>
                <Row data={tableHead} style={styles.head} textStyle={styles.headerText} />
                <Rows data={tableData} style={styles.row} textStyle={styles.rowText} />
            </Table>
        </ScrollView>
    )
}
};

const styles = StyleSheet.create({
    head: { width: 350, height: 40, backgroundColor: '#D6DBDF',  },
    headerText: { marginLeft: 5, fontWeight: 'bold', color: COLOR.cyan800, },
    rowText: { marginLeft: 5, color: COLOR.cyan800,},
    row: { width: 350, height: 50, backgroundColor: 'white'},
    content: { fontSize: 10, }
})


const uiTheme = {
    palette: {
        primaryColor: COLOR.cyan800,
    },
    toolbar: {
        container: {
            height: 65,
            paddingTop: 15,
        },
    },
};  