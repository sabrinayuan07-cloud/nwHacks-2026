import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MessagesList = ({ onSelectChat }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    const messages = [
        {
            id: 1,
            name: 'Pink Cat',
            message: 'Hey! Are you coming to Mindful bites...',
            time: '2m ago',
            unread: true,
            color: '#CABDFD',
            image: require('../../../assets/images/MessageCat.png'),
            isGroup: false
        },
        {
            id: 2,
            name: 'Cloud Bunny',
            message: 'Thanks for the encouragement during...',
            time: '1h ago',
            unread: true,
            color: '#DBEAFE',
            image: require('../../../assets/images/MessageBunny.png'),
            isGroup: false
        },
        {
            id: 3,
            name: 'Connect & Craft',
            message: "Hey everyone! I'm here a bit early, we're...",
            time: 'Yesterday',
            unread: false,
            color: '#CABDFD',
            isGroup: true,
            groupImages: [
                require('../../../assets/images/MessageDog.png'),
                require('../../../assets/images/MessageCat.png'),
                require('../../../assets/images/MessageBunny.png')
            ]
        }
    ];

    const filteredMessages = messages.filter(msg =>
        msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderAvatar = (msg) => {
        if (msg.isGroup) {
            return (
                <View style={{ width: 56, height: 56, marginRight: 12, position: 'relative' }}>
                    <Image
                        source={msg.groupImages[2]}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            position: 'absolute',
                            top: 8,
                            left: 16,
                            borderWidth: 2,
                            borderColor: '#FFFFFF'
                        }}
                    />
                    <Image
                        source={msg.groupImages[1]}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            position: 'absolute',
                            top: 4,
                            left: 8,
                            borderWidth: 2,
                            borderColor: '#FFFFFF'
                        }}
                    />
                    <Image
                        source={msg.groupImages[0]}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            borderWidth: 2,
                            borderColor: '#FFFFFF'
                        }}
                    />
                </View>
            );
        } else {
            return (
                <Image
                    source={msg.image}
                    style={{
                        width: 56,
                        height: 56,
                        borderRadius: 28,
                        marginRight: 12
                    }}
                />
            );
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <View style={{ padding: 20, paddingTop: 60 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Messages</Text>
                    <TouchableOpacity onPress={() => setShowSearch(!showSearch)}>
                        <Ionicons name="search" size={24} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>

            {showSearch && (
                <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
                    <TextInput
                        style={{
                            backgroundColor: '#F3F4F6',
                            borderRadius: 10,
                            padding: 12,
                            fontSize: 16
                        }}
                        placeholder="Search messages..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoFocus
                    />
                </View>
            )}

            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                {filteredMessages.map((msg) => (
                    <TouchableOpacity
                        key={msg.id}
                        onPress={() => onSelectChat(msg)}
                        style={{
                            flexDirection: 'row',
                            padding: 20,
                            borderBottomWidth: 1,
                            borderBottomColor: '#F3F4F6'
                        }}
                    >
                        {renderAvatar(msg)}

                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                                <Text style={{ fontSize: 18, fontWeight: '600' }}>{msg.name}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, color: '#9CA3AF', marginRight: 4 }}>{msg.time}</Text>
                                    {msg.unread && (
                                        <View style={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: 4,
                                            backgroundColor: '#CABDFD'
                                        }} />
                                    )}
                                </View>
                            </View>
                            <Text style={{ fontSize: 14, color: '#6B7280' }} numberOfLines={1}>
                                {msg.message}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default MessagesList;