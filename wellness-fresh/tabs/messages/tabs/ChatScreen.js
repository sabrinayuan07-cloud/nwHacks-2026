import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ChatScreen = ({ chatData, onBack }) => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: 'Hey! Are you coming to Mindful bites tomorrow?',
            time: '2:35 PM',
            sent: false
        },
        {
            id: 2,
            text: "Yes! I'll definitely be there.",
            time: '2:36 PM',
            sent: true
        },
        {
            id: 3,
            text: 'Okay, cool! See you there! 😊',
            time: '2:38 PM',
            sent: false
        }
    ]);
    const [inputText, setInputText] = useState('');

    const handleSend = () => {
        if (inputText.trim()) {
            const newMessage = {
                id: messages.length + 1,
                text: inputText,
                time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
                sent: true
            };
            setMessages([...messages, newMessage]);
            setInputText('');
        }
    };

    const handleRevealName = () => {
        Alert.alert(
            'Reveal Your Name',
            `Do you want to reveal your real name to ${chatData.name}? They will be able to see your identity.`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Reveal',
                    onPress: () => {
                        Alert.alert('Success', 'Your name has been revealed!');
                    }
                }
            ]
        );
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, backgroundColor: '#FFFFFF' }}
            keyboardVerticalOffset={0}
        >
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 16,
                paddingTop: 60,
                borderBottomWidth: 1,
                borderBottomColor: '#F3F4F6',
                backgroundColor: '#FFFFFF'
            }}>
                <TouchableOpacity onPress={onBack} style={{ marginRight: 12 }}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <View style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: chatData.color || '#CABDFD',
                    marginRight: 12
                }} />
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, fontWeight: '600' }}>{chatData.name}</Text>
                    <Text style={{ fontSize: 12, color: '#9CA3AF' }}>Active Now</Text>
                </View>
                <TouchableOpacity onPress={handleRevealName}>
                    <Ionicons name="information-circle-outline" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <View style={{ padding: 20, alignItems: 'center', backgroundColor: '#FFFFFF' }}>
                <Text style={{ fontSize: 12, color: '#9CA3AF', textAlign: 'center' }}>
                    You're chatting anonymously. You can{'\n'}reveal your name anytime.
                </Text>
            </View>

            <ScrollView style={{ flex: 1, padding: 20, backgroundColor: '#FFFFFF' }}>
                {messages.map((msg) => (
                    <View
                        key={msg.id}
                        style={{
                            alignItems: msg.sent ? 'flex-end' : 'flex-start',
                            marginBottom: 16
                        }}
                    >
                        <View style={{
                            backgroundColor: msg.sent ? '#CABDFD' : '#FFFFFF',
                            padding: 12,
                            paddingHorizontal: 16,
                            borderRadius: 20,
                            maxWidth: '75%',
                            borderWidth: msg.sent ? 0 : 1,
                            borderColor: '#E5E7EB'
                        }}>
                            <Text style={{ fontSize: 14, color: msg.sent ? '#FFFFFF' : '#000000' }}>
                                {msg.text}
                            </Text>
                        </View>
                        <Text style={{ fontSize: 10, color: '#9CA3AF', marginTop: 4, marginHorizontal: 4 }}>
                            {msg.time}
                        </Text>
                    </View>
                ))}
            </ScrollView>

            <View style={{
                flexDirection: 'row',
                padding: 16,
                alignItems: 'center',
                borderTopWidth: 1,
                borderTopColor: '#F3F4F6',
                backgroundColor: '#FFFFFF'
            }}>
                <View style={{
                    flex: 1,
                    backgroundColor: '#CABDFD',
                    borderRadius: 25,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    marginRight: 8,
                    opacity: 0.3
                }}>
                    <TextInput
                        style={{ fontSize: 14, color: '#000000' }}
                        placeholder="Type a message"
                        placeholderTextColor="#6B7280"
                        value={inputText}
                        onChangeText={setInputText}
                        onSubmitEditing={handleSend}
                        multiline
                    />
                </View>
                <TouchableOpacity
                    onPress={handleSend}
                    style={{
                        width: 44,
                        height: 44,
                        borderRadius: 22,
                        backgroundColor: '#CABDFD',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Ionicons name="send" size={20} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default ChatScreen;