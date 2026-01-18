import React, { useState } from 'react';
import { View } from 'react-native';
import MessagesList from './messages/tabs/MessageScreen';
import ChatScreen from './messages/tabs/ChatScreen';
import BottomNav from './bottomNav';

export default function Messages({ onNavigate }) {
    const [selectedChat, setSelectedChat] = useState(null);

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            {selectedChat ? (
                <ChatScreen
                    chatData={selectedChat}
                    onBack={() => setSelectedChat(null)}
                />
            ) : (
                <>
                    <MessagesList onSelectChat={setSelectedChat} />
                    <View style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 10,
                    }}>
                        <BottomNav currentPage="messages" onNavigate={onNavigate} />
                    </View>
                </>
            )}
        </View>
    );
}