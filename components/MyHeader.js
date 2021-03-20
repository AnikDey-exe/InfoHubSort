import React, { Component } from 'react';
import {Header, Icon} from 'react-native-elements';

const MyHeader = props => {
    return(
        <Header
        leftComponent={<Icon name='bars' style={{paddingTop: 5}} type='font-awesome' color='black' onPress={() => props.navigation.toggleDrawer()}/>}
        centerComponent={{text: props.title,style:{color: 'black',fontSize: 25, fontWeight: '700',height: 40, paddingTop: 5}}}
        backgroundColor="#edf2ef"/>
    )
}

export default MyHeader;