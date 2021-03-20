import React, { Component } from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator';
import { AppTabNavigator2 } from './AppTabNavigator2';
import { AppTabNavigator3 } from './AppTabNavigator3';
import SettingsScreen from '../screens/SettingsScreen';
import NotificationScreen from '../screens/NotificationScreen';
import CustomSideBarMenu from './CustomSideBarMenu';

export const AppDrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: AppTabNavigator3,
        },

        Explain: {
            screen: AppTabNavigator
        },

        Tuition: {
            screen: AppTabNavigator2
        },

        Notifications: {
            screen: NotificationScreen
        },

        Settings: {
            screen: SettingsScreen
        }
    },

    {
        contentComponent:  CustomSideBarMenu
    },

    {
        InitialRouteName: 'Explain'
    }
);