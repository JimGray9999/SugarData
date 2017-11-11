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
import { styles } from '../views/User';
import SugarTable from '../utilities/SugarTable';

const Container = (props) => {
    return (
        <View style={styles.container}>
            {props.children}
        </View>
    );
};


export default class BGL_Log extends React.Component {
    static navigationOptions = {
        headerLeft: null,
        headerMode: 'none',
        headerStyle: { height: 0 },
    };

   

    render() {
        const { navigate } = this.props.navigation;
        
        return (
            <ThemeProvider uiTheme={uiTheme}>
                <Container>
                    <StatusBar barStyle="light-content" />
                    <ScrollView style={{ flex: 1 }} alwaysBounceVertical directionalLockEnabled scroll horizontal={false}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={styles.header}>
                                <Text style={styles.headerText}>Previous Readings</Text>
                            </View>
                        </View>

                    </ScrollView>
                    <SugarTable />
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