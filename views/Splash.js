import React from 'react';
import { AppRegistry, AsyncStorage, Image, Keyboard, Navigator, NativeModules, StatusBar, StyleSheet, Text, TextInput, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native';
import { COLOR, ThemeProvider, Button, PropTypes, Toolbar } from 'react-native-material-ui';
import { Font, AppLoading } from 'expo';
import { StackNavigator } from 'react-navigation';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import { NavigationActions } from 'react-navigation'

const navigateAction = NavigationActions.navigate({

  routeName: 'Profile',

  params: {},

  action: NavigationActions.navigate({ routeName: 'SubProfileRoute'})
})
const remote = '../assets/Images/bodyBackground.jpg';
const t = require('tcomb-form-native');
const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  password: t.String
})

const options = {
  fields: {
    email: {
      autoCapitalize: 'none',
      autoCorrect: false
    },
    password: {
      autoCapitalize: 'none',
      password: true,
      autoCorrect: false
    }
  }
}

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fontLoaded: false,
      value: {
        email: '',
        password: ''
      }
    }
  }

  componentWillUnmount() {
    this.setState = {
      value: {
        email: '',
        password: null
      }
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
  _onChange = (value) => {
    this.setState({
      value
    })
  }
  _handleAdd = () => {
    const value = this.refs.form.getValue();
    // If the form is valid...
    if (value) {
      const data = {
        username: value.email,
        password: value.password
      }
      // Serialize and post the data
      const json = JSON.stringify(data)
      console.log(json)
      fetch('http://10.38.104.215:8080/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: json
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.error) {
            alert(res.error)
          } else {
            AsyncStorage.setItem('jwt', res.token)
            alert(`Success! You may now access protected content.`)
            // Redirect to home screen
            this.props.navigation.dispatch(navigateAction)          }
        })
        .catch((error) => {
          alert('There was an error logging in.')
          console.log(error)
        })
        .done()
    } else {
      // Form validation error
      alert('Please fix the errors listed and try again.')
    }
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
                {/* {usernameInput}
                {passwordInput} */}
                <Form
                  ref='form'
                  options={options}
                  type={User}
                  value={this.state.value}
                  onChange={this._onChange}
                />
                <Button raised style={{ container: { backgroundColor: COLOR.cyan800, marginBottom: 20, borderRadius: 10, }, text: { color: 'white' } }} text="Sign In" onPress={this._handleAdd} />
                {/* <Button raised style={{ container: { backgroundColor: COLOR.cyan800, marginBottom: 20, borderRadius: 10, }, text: { color: 'white' } }} text="Sign In with Fitbit" onPress={() => navigate(null)} /> */}
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



// const usernameInput = (
//   <Sae
//     label={'Email'}
//     labelStyle={{ color: "white" }}
//     iconClass={FontAwesomeIcon}
//     iconName={'user'}
//     iconColor={'white'}
//     options={options}

//     // TextInput props
//     value={this.state.value.email}
//     onChange={this._onChange}
//     autoCapitalize={'none'}
//     autoCorrect={false}
//     keyboardType='default'
//   />
// );

// const passwordInput = (
//   <Sae
//     style={{ marginBottom: 30 }}
//     label={'Password'}
//     labelStyle={{ color: "white" }}
//     iconClass={FontAwesomeIcon}
//     iconName={'key'}
//     iconColor={'white'}
//     options={options}
//     // TextInput props
//     value={this.state.value.password}
//     onChange={this._onChange}
//     autoCapitalize={'none'}
//     autoCorrect={false}
//     keyboardType='default'

//   />
// );


var styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    flexDirection: 'column'
  },
  button: {
    borderRadius: 4,
    padding: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff'
  },
  greenButton: {
    backgroundColor: '#4CD964'
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})
