import React, { Component } from 'react';
import { View, StyleSheet, Text, Image} from 'react-native';
import OfferScreen from '../screens/OfferScreen';
import TuitionScreen from '../screens/TuitionScreen';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {AppStackNavigator2} from './AppStackNavigator2';

export const AppTabNavigator2 = createBottomTabNavigator({
    OfferScreen: {
        screen: OfferScreen,
        navigationOptions: {
            tabBarIcon: 
            <Image
            source={require('../assets/book.png')}
            style={{width: 20, height: 20}}/>,
            tabBarLabel: "Offer A Tuition"
        }
    },
    TuitionScreen: {
        screen: AppStackNavigator2,
        navigationOptions: {
            tabBarIcon: 
            <Image
            source={require('../assets/book.png')}
            style={{width: 20, height: 20}}/>,
            tabBarLabel: "Tuitions"
        }
    }
});