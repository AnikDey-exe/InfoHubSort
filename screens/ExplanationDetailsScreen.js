import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity, KeyboardAvoidingView, TextInput, Dimensions} from 'react-native';
import { ListItem, Card, Icon, Header} from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import {ScrollView} from 'react-native-gesture-handler';

export default class ExplanationDetailsScreen extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            userID: firebase.auth().currentUser.email,
            receiverID: this.props.navigation.getParam('details')["userId"],
            requestID: this.props.navigation.getParam('details')["requestId"],
            topic: this.props.navigation.getParam('details')["topic"],
            explanation: this.props.navigation.getParam('details')["explanation"],
            receiverFirstName: '',
            receiverLastName: '',
            receiverName: '',
            receiverContact: '',
            receiverAddress: '',
            receiverRequestDocId: '',
            userName: '',
            message: '',
            readerName: '',
            readerFirstName: '',
            readerLastName: '',
            allMessages: [],
            messageDocId: '',
            readerEmail: '',
            screenWidth: Math.round(Dimensions.get('window').width)
        }
        this.requestRef = null
    }

    getReceiverDetails(){
        db.collection("Users").where("emailID","==",this.state.receiverID).get()
        .then(snapshot=>{
            snapshot.forEach(doc => {
                this.setState({
                    receiverFirstName: doc.data().firstName,
                    receiverLastName: doc.data().lastName,
                    receiverName: doc.data().firstName + " " + doc.data().lastName,
                    receiverContact: doc.data().contact,
                    readerEmail: doc.data().emailID
                })
            })
        })

        db.collection("ExplanationsList").where("requestID","==",this.state.requestID).get()
        .then(snapshot=>{
            snapshot.forEach(doc => {
                this.setState({
                    receiverRequestDocId: doc.id
                })
            })
        })
    }

    getReaderDetails = () => {
        db.collection("Users").where("emailID","==",this.state.userID).get()
        .then(snapshot => {
            snapshot.forEach((doc) => {
                this.setState({
                    readerFirstName: doc.data().firstName,
                    readerLastName: doc.data().lastName,
                    readerName: doc.data().firstName + " " + doc.data().lastName,
                })
            })
        })
    }

    getMessages = () => {
        this.requestRef = db.collection('AllMessages')
        .where("messagePostId","==",this.state.requestID)
            .onSnapshot((snapshot)=>{
              var allMessages = snapshot.docs.map(document => document.data());
              this.setState({
                allMessages : allMessages
              });
        })      
    }

    addViewNotification = () => {
        var reader = this.state.readerName;
        var message = reader + " has viewed your post on " + this.state.topic;
        db.collection("AllNotifications").add({
            "message": message,
            "notificationStatus": "unread",
            "date": firebase.firestore.FieldValue.serverTimestamp(),
            "viewer": this.state.readerName,
            "topic": this.state.topic,
            "targetedUserId": this.state.receiverID,
            "userId": this.state.userID,
            "type": "explanation"
        })
    }

    componentDidMount() {
        this.getReceiverDetails();
        this.getMessages();
        this.getReaderDetails();
        this.addViewNotification();
    }

    componentWillUnmount() {
        this.requestRef();
    }

    sendMessage = (message) => {
        db.collection('AllMessages').add({
            "message": message,
            "messagePostId": this.state.requestID,
            "userId": this.state.userID,
            "name": this.state.readerName,
            "date": firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(
           db.collection("AllMessages").doc().delete()
        )

        this.setState({
            message: ''
        })
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ( {item, i} ) =>{
        var firstName = this.state.readerFirstName;
        var lastName = this.state.readerLastName;
        var fullName = this.state.readerName;
        var message = this.state.message;
        
            return (
                <ListItem
                  style={{marginLeft: 10}}
                  key={i}
                  title={item.name}
                  titleStyle={{fontSize: 5, color: 'grey', fontWeight: '200'}}
                  subtitle={item.message}
                  subtitleStyle={{fontSize: 20}}
                  titleStyle={{ color: 'black', fontWeight: 'bold' }}
                bottomDivider
                />
            )

    }

    render() {
        return(
            <View style={{flex:1}}>
                <View style={{flex:0.1}}>
                    <Header
                    leftComponent={<Icon name="arrow-left" type='feather' color='black' onPress={() => this.props.navigation.goBack()}/>}
                    centerComponent={{text: "Details",style:{color: 'black',fontSize: 20, fontWeight: 'bold',height: 50, paddingTop: 5}}}
                    backgroundColor="#edf2ef"/>
                </View>

                <View style={{flex: 0.4, marginTop: 20,}}>
                    <ScrollView>
                    <Card
                    title={"Article"}
                    titleStyle={{fontSize: 20, height: "auto"}}
                    containerStyle={{borderRadius: 10, alignSelf: 'center',alignItems: 'center',backgroundColor: "white",width: "80%"}}>
                         <Text style={{fontWeight: 'bold', alignSelf: 'center', color: 'black', fontSize: 20, marginTop: 0}}> {this.state.topic} </Text>
                        
                        <Text style={{fontWeight: 'bold', alignSelf: 'center', color: 'grey', fontSize: 10, marginTop: 20}}> Posted By: {this.state.receiverName} </Text>
                        
                        <Card
                        containerStyle={{borderRadius: 10, alignSelf: 'center',alignItems: 'center',backgroundColor: "white",width: "auto"}}>
                            <Text style={{fontWeight: '500', alignSelf: 'center', fontSize: 15}}> {this.state.explanation} </Text> 
                        </Card>
                    </Card>
                    </ScrollView>
                    
                </View>
                
                    <View style={{flex: 1,marginTop: "10%"}}>

                        <Text style={{fontSize: 25, fontWeight: 'bold', marginLeft: 10}}> Messages </Text>
                        <ScrollView style={{marginBottom: 30}}>
                            <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.allMessages}
                            renderItem={this.renderItem}
                           /> 
                        </ScrollView>
                        
                    </View>
                
                

                <KeyboardAvoidingView style={styles.container} behavior="position" enabled>
                    <TextInput
                    style={{
                        borderWidth:2,
                        height:40,
                        width:this.state.screenWidth,
                        paddingLeft:10,
                        backgroundColor: 'white'
                    }}
                    placeholder="Send Message"
                    onChangeText={(text)=>{this.setState({
                        message: text
                    })}}
                    value={this.state.message}
                    />
                    <TouchableOpacity 
                    style={{borderWidth:1,
                        height:40,
                        width:this.state.screenWidth,
                        alignItems:'center',
                        justifyContent:'center',
                        backgroundColor:'black',}} 
                    onPress={()=>{this.sendMessage(this.state.message)}}> 
                        <Text style={{color: 'white'}}> Send </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
               
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: 200,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8
        },
        elevation: 60
    },
    container: {
        position: 'absolute', 
        left: 0,
        right: 0, 
        bottom: 0, 
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: 'black',
        width: "auto"
    },
    messageBar: {
        borderWidth:2,
        height:40,
        width:"9000%",
        paddingLeft:10,
        backgroundColor: 'white'
    },
    sendButton: {
        borderWidth:1,
        height:40,
        width:"auto",
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'black',
    }
    
})