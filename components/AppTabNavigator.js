import React, { Component } from 'react';
import { View, StyleSheet, Text, Image} from 'react-native';
import ExplainScreen from '../screens/ExplainScreen';
import SearchScreen from '../screens/SearchScreen';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {AppStackNavigator} from './AppStackNavigator';

export const AppTabNavigator = createBottomTabNavigator({
    ExplainScreen: {
        screen: ExplainScreen,
        navigationOptions: {
            tabBarIcon: 
            <Image
            source={require('../assets/book.png')}
            style={{width: 20, height: 20}}/>,
            tabBarLabel: "Explain A Topic"
        }
    },
    SearchScreen: {
        screen: AppStackNavigator,
        navigationOptions: {
            tabBarIcon: 
            <Image
            source={require('../assets/book.png')}
            style={{width: 20, height: 20}}/>,
            tabBarLabel: "Search"
        }
    }
});