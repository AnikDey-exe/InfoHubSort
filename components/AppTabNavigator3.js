import React, { Component } from 'react';
import { View, StyleSheet, Text, Image} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import MyExplanationsScreen from '../screens/MyExplanationsScreen';
import MyTuitionsScreen from '../screens/MyTuitionsScreen';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {AppStackNavigator3} from './AppStackNavigator3';
import {AppStackNavigator4} from './AppStackNavigator4';

export const AppTabNavigator3 = createBottomTabNavigator({
    MyExplanationsScreen: {
        screen: AppStackNavigator3,
        navigationOptions: {
            tabBarIcon: 
            <Image
            source={require('../assets/book.png')}
            style={{width: 20, height: 20}}/>,
            tabBarLabel: "My Explanations"
        }
    },
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarIcon: 
            <Image
            source={require('../assets/book.png')}
            style={{width: 20, height: 20}}/>,
            tabBarLabel: "Profile"
        }
    },
    MyTuitionsScreen: {
        screen: AppStackNavigator4,
        navigationOptions: {
            tabBarIcon: 
            <Image
            source={require('../assets/book.png')}
            style={{width: 20, height: 20}}/>,
            tabBarLabel: "My Tuitions"
        }
    }
});