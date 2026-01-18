import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Modal, Image } from 'react-native';
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
    const [isRevealed, setIsRevealed] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(''); // 'reveal', 'hide', or 'success'

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
        if (isRevealed) {
            setModalType('hide');
            setShowModal(true);
        } else {
            setModalType('reveal');
            setShowModal(true);
        }
    };

    const handleConfirm = () => {
        setShowModal(false);
        if (modalType === 'reveal') {
            setIsRevealed(true);
            setTimeout(() => {
                setModalType('success');
                setShowModal(true);
            }, 300);
        } else if (modalType === 'hide') {
            setIsRevealed(false);
            setTimeout(() => {
                setModalType('success');
                setShowModal(true);
            }, 300);
        }
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const getModalContent = () => {
        switch (modalType) {
            case 'reveal':
                return {
                    title: 'Reveal Your Name',
                    message: `Do you want to reveal your real name to ${chatData.name}? They will be able to see your identity.`,
                    showButtons: true
                };
            case 'hide':
                return {
                    title: 'Hide Your Name',
                    message: `Do you want to hide your real name from ${chatData.name}? You will return to anonymous mode.`,
                    showButtons: true
                };
            case 'success':
                return {
                    title: 'Success',
                    message: isRevealed ? 'Your name has been revealed!' : 'You are now anonymous again!',
                    showButtons: false
                };
            default:
                return { title: '', message: '', showButtons: false };
        }
    };

    const modalContent = getModalContent();

    const renderHeaderAvatar = () => {
        if (chatData.isGroup) {
            return (
                <View style={{ width: 40, height: 40, marginRight: 12, position: 'relative' }}>
                    <Image
                        source={chatData.groupImages[2]}
                        style={{
                            width: 28,
                            height: 28,
                            borderRadius: 14,
                            position: 'absolute',
                            top: 6,
                            left: 12,
                            borderWidth: 1,
                            borderColor: '#FFFFFF'
                        }}
                    />
                    <Image
                        source={chatData.groupImages[1]}
                        style={{
                            width: 28,
                            height: 28,
                            borderRadius: 14,
                            position: 'absolute',
                            top: 3,
                            left: 6,
                            borderWidth: 1,
                            borderColor: '#FFFFFF'
                        }}
                    />
                    <Image
                        source={chatData.groupImages[0]}
                        style={{
                            width: 28,
                            height: 28,
                            borderRadius: 14,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            borderWidth: 1,
                            borderColor: '#FFFFFF'
                        }}
                    />
                </View>
            );
        } else {
            return (
                <Image
                    source={chatData.image}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        marginRight: 12
                    }}
                />
            );
        }
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
                
                {renderHeaderAvatar()}

                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, fontWeight: '600' }}>{chatData.name}</Text>
                    <Text style={{ fontSize: 12, color: '#9CA3AF' }}>Active Now</Text>
                </View>
                <TouchableOpacity onPress={handleRevealName}>
                    <Ionicons 
                        name={isRevealed ? "eye" : "eye-off"} 
                        size={24} 
                        color="#000" 
                    />
                </TouchableOpacity>
            </View>

            <View style={{ padding: 20, alignItems: 'center', backgroundColor: '#FFFFFF' }}>
                <Text style={{ fontSize: 12, color: '#9CA3AF', textAlign: 'center' }}>
                    {isRevealed 
                        ? `${chatData.name} can see your real name` 
                        : "You're chatting anonymously. You can\nreveal your name anytime."}
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

            {/* Custom Modal */}
            <Modal
                transparent={true}
                visible={showModal}
                animationType="fade"
                onRequestClose={handleCancel}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 20
                }}>
                    <View style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: 20,
                        padding: 24,
                        width: '85%',
                        maxWidth: 340,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5
                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: '600',
                            marginBottom: 12,
                            textAlign: 'center',
                            color: '#000000'
                        }}>
                            {modalContent.title}
                        </Text>
                        <Text style={{
                            fontSize: 14,
                            color: '#6B7280',
                            textAlign: 'center',
                            marginBottom: 24,
                            lineHeight: 20
                        }}>
                            {modalContent.message}
                        </Text>

                        {modalContent.showButtons ? (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity
                                    onPress={handleCancel}
                                    style={{
                                        flex: 1,
                                        paddingVertical: 12,
                                        paddingHorizontal: 20,
                                        borderRadius: 12,
                                        backgroundColor: '#F3F4F6',
                                        marginRight: 8
                                    }}
                                >
                                    <Text style={{
                                        color: '#6B7280',
                                        fontSize: 16,
                                        fontWeight: '600',
                                        textAlign: 'center'
                                    }}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleConfirm}
                                    style={{
                                        flex: 1,
                                        paddingVertical: 12,
                                        paddingHorizontal: 20,
                                        borderRadius: 12,
                                        backgroundColor: '#CABDFD',
                                        marginLeft: 8
                                    }}
                                >
                                    <Text style={{
                                        color: '#FFFFFF',
                                        fontSize: 16,
                                        fontWeight: '600',
                                        textAlign: 'center'
                                    }}>
                                        {modalType === 'reveal' ? 'Reveal' : 'Hide'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TouchableOpacity
                                onPress={handleCancel}
                                style={{
                                    paddingVertical: 12,
                                    paddingHorizontal: 20,
                                    borderRadius: 12,
                                    backgroundColor: '#CABDFD'
                                }}
                            >
                                <Text style={{
                                    color: '#FFFFFF',
                                    fontSize: 16,
                                    fontWeight: '600',
                                    textAlign: 'center'
                                }}>
                                    OK
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
};

export default ChatScreen;