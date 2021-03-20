import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem, Card, Icon, withTheme } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import { TextInput } from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export default class HomeScreen extends React.Component {
    constructor() {
        super(); 
        this.state = {
            firstName: '',
            lastName: '',
            userName: "",
            contact: '',
            userId: firebase.auth().currentUser.email,
            points: 0,
            docId: ''
        }
    }

    getUserDetails = () => {
        db.collection("Users").where("emailID","==",this.state.userId).get()
        .then(snapshot => {
            snapshot.forEach((doc) => {
                this.setState({
                    firstName: doc.data().firstName,
                    lastName: doc.data().lastName,
                    userName: doc.data().firstName + " " + doc.data().lastName,
                    docId: doc.id,
                    points: doc.data().points,
                    contact: doc.data().contact
                })
            })
        })
    }

    componentDidMount() {
        this.getUserDetails();
    }

    render() {
        return(
            <View style={{flex: 1}}>
                <ScrollView>
                <View style={{flex: 0.1}}>
                    <MyHeader
                    title="My Profile"
                    navigation={this.props.navigation}/>
                </View>
                
                <View style={styles.titleView}>
                    <Text style={styles.titleText}> Welcome {this.state.firstName}! </Text>
                </View>
                
                <View style={styles.pointsView}>
                    <Text style={styles.pointsText}> Points: {this.state.points} </Text>
                </View>
            
                <View style={{flex: 0.3, marginTop: 40}}>
                    <Card
                    title={"My Profile"}
                    titleStyle={{fontSize: 20}}>
                        <Card>
                            <Text style={{fontWeight: 'bold'}}> Name: {this.state.userName} </Text>
                        </Card>

                        <Card>
                            <Text style={{fontWeight: 'bold'}}> First Name: {this.state.firstName} </Text>
                        </Card>

                        <Card>
                            <Text style={{fontWeight: 'bold'}}> Last Name: {this.state.lastName} </Text>
                        </Card>

                        <Card>
                            <Text style={{fontWeight: 'bold'}}> Email: {this.state.userId} </Text>
                        </Card>

                        <Card>
                            <Text style={{fontWeight: 'bold'}}> Contact: {this.state.contact} </Text>
                        </Card>
                    </Card>
                </View>

                <View style={{flex: 10}}>
                    <TouchableOpacity 
                    style={{backgroundColor:'black', borderRadius: 25, justifyContent: 'center', alignItems: 'center',width: 50,height: 50, marginTop: 40, alignSelf: 'center'}}
                    onPress={()=>{
                        this.props.navigation.navigate('Settings')
                    }}>
                        <Icon name='cog' style={{paddingTop: 2.5}} type='font-awesome' color='white' onPress={()=>{this.props.navigation.navigate('Settings')}}/>
                    </TouchableOpacity>
                </View>
                </ScrollView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleView: {
        justifyContent: 'center',
        marginTop: 40
    },
    titleText: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 30
    },
    pointsView: {
        justifyContent: 'center',
        marginTop: 40
    },
    pointsText: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 20
    }
})