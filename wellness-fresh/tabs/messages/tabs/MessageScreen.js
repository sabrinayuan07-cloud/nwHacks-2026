import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
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
            color: '#CABDFD'
        },
        {
            id: 2,
            name: 'Cloud Bunny',
            message: 'Thanks for the encouragement during...',
            time: '1h ago',
            unread: true,
            color: '#DBEAFE'
        },
        {
            id: 3,
            name: 'Connect & Craft',
            message: "Hey everyone! I'm here a bit early, we're...",
            time: 'Yesterday',
            unread: false,
            color: '#CABDFD'
        }
    ];

    const filteredMessages = messages.filter(msg =>
        msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                        <View style={{
                            width: 56,
                            height: 56,
                            borderRadius: 28,
                            backgroundColor: msg.color,
                            marginRight: 12
                        }} />

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