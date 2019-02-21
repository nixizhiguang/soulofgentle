import React, { Component } from "react";
import HomeScreen from '../screens/HomeScreen';
/*import PopularsScreen from '../screens/PopularsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DownloadsScreen from '../screens/DownloadsScreen';
import CollectionsScreen from '../screens/CollectionsScreen';
import HistorysScreen from '../screens/HistorysScreen';*/

import { createDrawerNavigator } from 'react-navigation';

export default createDrawerNavigator(
  {
    Home: {
      screen:HomeScreen,
    },
    /*Populars: {
      screen:PopularsScreen,
    },
    Settings: {
      screen:SettingsScreen,
    },
    Downloads: {
      screen:DownloadsScreen,
    },
    Collections: {
      screen:CollectionsScreen,
    },
    Historys: {
      screen:HistorysScreen,
    }*/
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
      backgroundColor: '#e9f1f4',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
      fontWeight: 'bold',
      }
    }
  }
);

/*import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});
*/