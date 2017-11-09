import React from 'react';
import { AppRegistry, Image, Keyboard, Navigator, NativeModules, StatusBar, StyleSheet, Text, TextInput, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native';
import { COLOR, ThemeProvider, Button, PropTypes, Toolbar } from 'react-native-material-ui';
import { Font, AppLoading } from 'expo';
import { StackNavigator } from 'react-navigation';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
const remote = '../assets/Images/bodyBackground.jpg';




export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fontLoaded: false
    }
  }
  componentDidMount() {
    Orientation.lockToPortrait();
  }

  async componentDidMount() {
    await Expo.Font.loadAsync({
      "Roboto": require('../assets/fonts/Roboto/Roboto-Light.ttf')
    })
    this.setState({ fontLoaded: true })
  }

  static navigationOptions = {
    headerMode: 'none',
    //HeaderProps: null,
    headerStyle: { height: 0 },
  };


  render() {
    //Setting for background image 
    const resizeMode = 'cover';

    const { navigate } = this.props.navigation;
    if (!this.state.fontLoaded) {
      return <AppLoading />
    }

    
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Image style={{
          backgroundColor: 'white',
          flex: 1,
          resizeMode,
          position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
        }}
          source={require('../assets/Images/bodyBackground.jpg')}
        >
          <StatusBar barStyle="dark-content" />
          <ThemeProvider uiTheme={uiTheme}>
            <View style={{ flex: 1, alignItems: 'center', }}>
              <Image style={{
                flex: .5,
                width: '150%',
                marginTop: '40%',
                paddingBottom: '10%',
              }}
                source={require('../assets/Images/Title.png')}
              ></Image>
              <View style={{ backgroundColor: '#00838F90', padding: 15, borderRadius: 25, marginTop: 30 }}>
                {usernameInput}
                {passwordInput}
                <Button raised style={{ container: { backgroundColor: COLOR.cyan800, marginBottom: 20, borderRadius: 10, }, text: { color: 'white' } }} text="Sign In" onPress={() => navigate('Profile')} />
                <Button raised style={{ container: { backgroundColor: COLOR.cyan800, marginBottom: 20, borderRadius: 10, }, text: { color: 'white' } }} text="Sign In with Fitbit" onPress={() => navigate(null)} />
                <Text style={{ opacity: 1, color: 'white', fontSize: 16, textAlign: 'center' }}>───────── New? ─────────</Text>
                <Button raised style={{ container: { backgroundColor: COLOR.cyan800, marginBottom: 10, borderRadius: 10, marginTop: 20 }, text: { color: 'white' } }} text="Create Account" />
              </View>
            </View>
          </ThemeProvider>
        </Image>
      </TouchableWithoutFeedback>
    )
  };
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



const usernameInput = (
  <Sae
    label={'Username'}
    labelStyle={{ color: "white" }}
    iconClass={FontAwesomeIcon}
    iconName={'user'}
    iconColor={'white'}
    // TextInput props
    autoCapitalize={'none'}
    autoCorrect={false}
    keyboardType='default'
  />
);

const passwordInput = (
  <Sae
    style={{ marginBottom: 30 }}
    label={'Password'}
    labelStyle={{ color: "white" }}
    iconClass={FontAwesomeIcon}
    iconName={'key'}
    iconColor={'white'}
    // TextInput props
    autoCapitalize={'none'}
    autoCorrect={false}
    keyboardType='default'

  />
);

