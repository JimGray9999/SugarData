import React from 'react';
import { StackNavigator, TabRouter } from 'react-navigation';
import HomeScreen from './views/Splash';
import UserPage from './views/User';
import BGL_Log from './views/Log';
import Input from './views/Input';

//import { TabRouter } from 'react-native-material-ui';

const StackNav = StackNavigator({
    Home: {
        screen: HomeScreen},
    Profile: {
        screen: UserPage},
    Log: {
        screen: BGL_Log},
    Input: {
        screen: Input}
    },
    {
        mode: 'card',
        headerMode: 'none',
      }
    );
    
    
    
    export default StackNav;

  
  