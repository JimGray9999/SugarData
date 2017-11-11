import React from 'React';
import { Navigator, NativeModules, StatusBar, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { COLOR, ThemeProvider, Button, PropTypes, Toolbar } from 'react-native-material-ui';
import { Font, AppLoading } from 'expo';
import { StackNavigator } from 'react-navigation';
import Orientation from 'react-native-orientation';
import api from '../utilities/api';
import moment from 'moment';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../views/User';

const Container = (props) => {
    return (
        <View style={styles.container}>
            {props.children}
        </View>
    );
};


export default class Input extends React.Component {
    static navigationOptions = {
        headerLeft: null,
        headerMode: 'none',
        headerStyle: { height: 0 },
    };

    constructor(props) {
        super(props);
        this.state = {
            newReading: 0,
            notes: '',
        }    
    }

    // make call to API once component mounts
    // componentWillMount() {
    //     api.getGlucose().then((res) => {

    //         let reading = (res.logs[0].value * 18) // mmol * 18 = mg/dL
    //         let readingDate = (res.logs[0].created)

    //         this.setState({
    //             sugars: reading,
    //             created: readingDate
    //         })
    //     });
    // }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <ThemeProvider uiTheme={uiTheme}>
                <Container>
                    <StatusBar barStyle="light-content" />
                    <ScrollView style={{ flex: 1 }} alwaysBounceVertical directionalLockEnabled scroll horizontal={false}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={styles.header}>
                                <Text style={styles.headerText}>Input New Reading</Text>
                            </View>
                        </View>
                        <View style={{alignItems: 'center', justifyContent: 'center',}}>
                        <TextInput
                            style={{ flex: 1, width: '75%',  marginTop: 200, height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white', color: COLOR.cyan800, }}
                            onChangeText={(text) => this.setState({newReading: this.state.text})}
                            placeholder={" Current Glucose Level"}
                            placeholderTextColor={COLOR.cyan800}
                            keyboardType='numeric'
                        />
                        </View>
                        <View style={{alignItems: 'center',}}>
                        <TextInput
                                multiline={true}
                                numberOfLines={4}
                                onChangeText={(text) => this.setState({notes: this.state.text})}
                                placeholder={" Notes"}
                                placeholderTextColor={COLOR.cyan800}
                                style={{ flex: 1, width: '75%', height: 100,  fontSize: 18, marginTop: 25, height: 80, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white', color: COLOR.cyan800,}} />         
                        <Button raised style={{ 
                                container: 
                            { backgroundColor: COLOR.cyan900, 
                            marginBottom: 20, 
                            borderRadius: 10,
                            borderColor: 'white',
                            borderWidth: 1, 
                            width: '50%', 
                            marginTop: 25}, 
                                text: 
                            { color: 'white' } }} 
                                text="Log Entry" />
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
                            onPress={() => navigate('Profile')}

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
                        />
                    </BottomNavigation>
                </Container>
            </ThemeProvider>

        );
    }
};


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