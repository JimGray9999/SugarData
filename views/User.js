import React from 'React';
import { Navigator, NativeModules, StatusBar, StyleSheet, Text, View, ScrollView } from 'react-native';
import { COLOR, ThemeProvider, Button, PropTypes, Toolbar } from 'react-native-material-ui';
import { Font, AppLoading } from 'expo';
import { StackNavigator } from 'react-navigation';
import Orientation from 'react-native-orientation';
import api from '../utilities/api';
import moment from 'moment';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import keys  from '../utilities/api';

const Container = (props) => {
    return (
        <View style={styles.container}>
            {props.children}
        </View>
    );
};


export default class UserPage extends React.Component {
    static navigationOptions = {
        headerLeft: null,
        headerMode: 'none',
        headerStyle: { height: 0 },
    };

    // set initial blank states for blood glucose
    constructor(props) {
        super(props);
        this.state = {
            sugars: [],
            created: '',
            steps: '',
            stepsDate: '',
            distances: '',
            activityCalories: '',
            sedentaryMinutes: '',
            activeMinutes: '',
        }
    }

    // make call to API once component mounts
    componentWillMount() {
        api.getSteps().then((res) => {
					console.log(res);
		
					let steps = res.summary.steps;
                    let stepsDate = moment("11 01 2017", "MM DD YYYY").toString();
                     let activityCalories = res.summary.activityCalories;
                     let sedentaryMinutes = res.summary.sedentaryMinutes;
                     let activeMinutes = (res.summary.lightlyActiveMinutes + res.summary.fairlyActiveMinutes + res.summary.veryActiveMinutes);
                     let summary = res.summary.distances[0].distance;
		
					this.setState({
						steps: steps,
                        stepsDate: stepsDate,
                         activityCalories: activityCalories,
                         sedentaryMinutes: sedentaryMinutes,
                         activeMinutes: activeMinutes,
                         summary: summary
					})
				});

        api.getGlucose().then((res) => {
          
          let reading     = (res.logs[0].value * 18) // mmol * 18 = mg/dL
          let readingDate = (res.logs[0].created)
           
          this.setState({
            sugars: reading,
            created: readingDate
          })
        });
    }

    render() {
        const { navigate } = this.props.navigation;
        
        return (
            <ThemeProvider uiTheme={uiTheme}>
                <Container>
                    <StatusBar barStyle="light-content" />
                    <ScrollView style={{ flex: 1 }} alwaysBounceVertical directionalLockEnabled scroll horizontal={false}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={styles.header}>
                                <Text style={styles.headerText}>Your Health Profile</Text>
                            </View>
                        </View>

                        {/* 1st Row of Stats */}
                        <View style={{
                            flex: 2,
                            marginTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}>
                            <View style={styles.mainStat1}>
                                <Text style={styles.statHeading}>
                                    Blood Sugar:
                                    </Text>
                                <Text style={styles.statTextMain}>
                                    {this.state.sugars} {/* mg/dL */}
                                </Text>
                                <Text style={styles.statText}>
                                    Taken: {"\n"}
                                </Text>
                                <Text style={styles.statTextSecondary}>
                                    {moment(this.state.created).format("M/D/YYYY h:mm a")}
                                </Text>
                                {/* <Button onPress={() => navigate('SugarTable')} text="Sugar Table" /> */}
                            </View>
                            <View style={styles.mainStat2}>
                                <Text style={styles.statHeading}>Steps: </Text>
                                <Text style={styles.statTextMain}>
                                    {this.state.steps} 
                                </Text>
                            </View>
                        </View>


                        {/* 2nd Row of Stats */}

                        <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'center', marginTop: 10, }}>
                            <View style={styles.mainStat1}>
                                <Text style={styles.statHeading}>Distance Walked: </Text>
                                <Text style={styles.statTextMain}>
                                    {this.state.summary} 
                                </Text>
                            </View>
                            <View style={styles.mainStat2}>
                                <Text style={styles.statHeading}>Calories Burned: </Text>
                                <Text style={styles.statTextMain}>
                                    {this.state.activityCalories} 
                                </Text>
                            </View>
                        </View>

                        {/* 3rd Row of Stats */}

                        <View style={{ flex: 4, flexDirection: 'row', justifyContent: 'center', marginTop: 10, }}>
                        <View style={styles.mainStat1}>
                                <Text style={styles.statHeading}>Active Mins: </Text>
                                <Text style={styles.statTextMain}>
                                    {this.state.activeMinutes} 
                                </Text>
                            </View>
                            <View style={styles.mainStat2}>
                                <Text style={styles.statHeading}>Sedentary Mins: </Text>
                                <Text style={styles.statTextMain}>
                                    {this.state.sedentaryMinutes} 
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                    <BottomNavigation
                        labelColor="white"
                        rippleColor="white"
                        style={{ flex: 2, height: 56, elevation: 8, position: 'absolute', left: 0, bottom: 0, right: 0 }}
                        //onTabChange={(newTabIndex) => alert(`New Tab at position ${newTabIndex}`)}
                    >
                        <Tab
                            barBackgroundColor={COLOR.cyan900}
                            label="Today"
                            icon={<Icon size={24} color="white" name="person" />}
                        />
                        <Tab
                            barBackgroundColor={COLOR.cyan900}
                            label="Log"
                            icon={<Icon size={24} color="white" name="date-range" />}
                            onPress={() => navigate('Log')}

                        />
                        <Tab
                            barBackgroundColor={COLOR.cyan900}
                            label="Input"
                            icon={<Icon size={24} color="white" name="mode-edit" />}
                            onPress={() => navigate('Input')}

                        />
                        {/* <Tab
                            barBackgroundColor="#3E2723"
                            label="Newsstand"
                            icon={<Icon size={24} color="white" name="done" />}
                        /> */}
                    </BottomNavigation>
                </Container>
            </ThemeProvider>

        );
    }
};

 
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00838F',
    },
    header: {
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 100,
        flexDirection: 'row',
    },
    headerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 40,
        marginTop: 20,
        height: 40,
    },
    mainStat1: {
        width: 200,
        height: 175,
        backgroundColor: '#00838F',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'black',
        borderStyle: 'solid'
    },
    mainStat2: {
        width: 200,
        height: 175,
        backgroundColor: '#00838F',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'black',
        borderStyle: 'solid'
    },
    statBox: {
        width: '30%',
        height: 150,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: '#00838F',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'black',
        borderStyle: 'solid'
    },
    statHeading: {
        fontSize: 26,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        color: 'white',
        fontWeight: 'bold',

    },
    statTextMain: {
        fontSize: 50,
        //alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        color: 'white',
        marginTop: 30,
        fontWeight: 'bold',
    },
    statText: {
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        color: 'white',
        marginTop: 10,
    },
    statTextSecondary: {
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        color: 'white',
        marginTop: -15,
    },
});

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