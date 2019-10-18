import { GiftedChat } from 'react-native-gifted-chat';
import {chatbotconfig} from "../config/chatbotconfig";
import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import React, { Component } from 'react';
import NavigationOptions from "../components/NavigationOptions";
import {Icon} from "react-native-elements";
import Layout from "../config/Layout";

const BOT_USER = {
    _id: 2,
    name: 'FAQ Bot',
    avatar: 'https://i.imgur.com/7k12EPD.png'
};

export default class HelpScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            ...NavigationOptions,
            drawerLabel: 'Home',
            drawerIcon: (
                <Icon
                    name='home'
                    type='font-awesome'
                    color='#000'
                    size={30}
                />
            ),
            headerTitle: (
                <Image style={{width: 85, height: 55}} source={require('../images/logo.png')}/>
            ),
            headerLeft: (
                <Icon
                    onPress={() => navigation.openDrawer()}
                    name='bars'
                    type='font-awesome'
                    color='#000'
                    size={30}
                />
            ),
            name: 'Accueil',
            headerStyle: {
                backgroundColor: '#fff',
                shadowColor: 'transparent',
                elevation: 0,
                borderBottomColor: 'transparent',
                borderBottomWidth: 0,
                marginLeft: Layout.marginL
            }
        }
    };

    state = {
        messages: [
            {
                _id: 1,
                text: `Bonjour ! Je suis Watcher 🤖 de Augarde.\n\nComment puis-je vous aider ?`,
                createdAt: new Date(),
                user: BOT_USER
            }
        ]
    };

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages)
        }));

        let message = messages[0].text.toLocaleString();
        if(message.indexOf("commande") !== -1){
            this.sendBotResponse("Votre commande est en préparation dans nos ateliers.");
        }else if(message.indexOf("fabrique") !== -1){
            this.sendBotResponse("Nos montres sont fabriquées dans notre atelier, situé à Paris");
        }else if(message.indexOf("Augarde") !== -1){
            this.sendBotResponse("Augarde est une jeune entreprise de création de montres, installée à Paris depuis 2019");
        }else if(message.indexOf("date") !== -1){
            this.sendBotResponse("Nous sommes le 18 octobre 2019");
        }else if(message.indexOf("créateur") !== -1){
            this.sendBotResponse("Le créateur est Monsieur Samir Khemici" +
                "");
        }
    }

    sendBotResponse(text) {
        let msg = {
            _id: this.state.messages.length + 1,
            text,
            createdAt: new Date(),
            user: BOT_USER
        };

        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, [msg])
        }));
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: 1
                    }}
                />
            </View>
        );
    }
}

