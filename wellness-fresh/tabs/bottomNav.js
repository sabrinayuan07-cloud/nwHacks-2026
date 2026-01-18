import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BottomNav({ currentPage, onNavigate }) {
    const isHome = currentPage === 'home';
    const isEvents = currentPage === 'events-list' || currentPage === 'event-details';
    const isMessages = currentPage === 'messages';
    const isProfile = currentPage === 'profile';

    return (
        <View style={styles.bottomNav}>
            <TouchableOpacity
                style={styles.navIcon}
                onPress={() => onNavigate('home')}
            >
                <Ionicons
                    name={isHome ? "home" : "home-outline"}
                    size={28}
                    color={isHome ? '#7C3AED' : '#9CA3AF'}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.navIcon}
                onPress={() => onNavigate('events-list')}
            >
                <Ionicons
                    name={isEvents ? "calendar" : "calendar-outline"}
                    size={28}
                    color={isEvents ? '#7C3AED' : '#9CA3AF'}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.navIcon}
                onPress={() => onNavigate('messages')}
            >
                <Ionicons
                    name={isMessages ? "chatbubble" : "chatbubble-outline"}
                    size={28}
                    color={isMessages ? '#7C3AED' : '#9CA3AF'}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.navIcon}
                onPress={() => onNavigate('profile')}
            >
                <Ionicons
                    name={isProfile ? "person" : "person-outline"}
                    size={28}
                    color={isProfile ? '#7C3AED' : '#9CA3AF'}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF',
        paddingVertical: 15,
        paddingBottom: 30,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 10,
    },
    navIcon: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});