import React, { Component } from "react";
import LoginScreen from '../screens/LoginScreen';
//import RegisterScreen from '../screens/RegisterScreen';
import AutoLoginScreen from '../screens/AutoLoginScreen';

import { createStackNavigator} from 'react-navigation';

export default createStackNavigator({
    Login: LoginScreen,
    //Register: RegisterScreen,
    AutoLogin: AutoLoginScreen
  },{
    initialRouteName: 'AutoLogin',
  }
);