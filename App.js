import React from 'react';
import {
  StyleSheet, Platform
} from 'react-native';
import { 
  createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';


import MainScreen from  './ChartsExample/MainScreen';
import TimeSeries from './ChartsExample/TimeSeries';
import LineChart from './ChartsExample/LineChart';
import AreaChart from './ChartsExample/AreaChart';

const AppNavigator = createStackNavigator(
  {
    MainScreen,
    TimeSeries,
    LineChart,
    AreaChart
  },
  {
    initialRouteName: 'MainScreen'
  }
);

const App = createAppContainer(AppNavigator);
export default App;