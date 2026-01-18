import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Image,
    Modal,
    TextInput,
    Keyboard,
    Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from './bottomNav';

export default function HomePage({ onNavigate }) {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showEncouragementModal, setShowEncouragementModal] = useState(false);
    const [encouragementMessage, setEncouragementMessage] = useState('');

    // Sample friend requests data
    const friendRequests = [
        { id: 1, name: 'Pink Cat', event: 'Mindful Bites', avatar: '🦦' },
        { id: 2, name: 'Cloud Bunny', event: 'Connect & Craft', avatar: '🦦' },
    ];

    // Community encouragement messages
    const communityMessages = [
        "You're doing amazing, keep going!",
        "One step at a time is still progress.",
        "Be kind to yourself today.",
        "You are stronger than you think.",
        "It's okay to take a break.",
    ];

    const handleAcceptRequest = (id) => {
        console.log('Accepted request:', id);
        // Handle accept logic here
    };

    const handleDeclineRequest = (id) => {
        console.log('Declined request:', id);
        // Handle decline logic here
    };

    const handleShareEncouragement = () => {
        if (encouragementMessage.trim()) {
            console.log('Shared message:', encouragementMessage);
            // Handle sharing logic here
            setEncouragementMessage('');
            setShowEncouragementModal(false);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#FFFFFF"
                translucent={false}
            />

            {/* Decorative Circles */}
            <View style={styles.gradientCircleTopRight}>
                <LinearGradient
                    colors={['#BFDBFE', '#DBEAFE']}
                    style={styles.circle}
                />
            </View>
            <View style={styles.gradientCircleBottomLeft}>
                <LinearGradient
                    colors={['#D1C5FD', '#CABDFD']}
                    style={styles.circle}
                />
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.appName}>Ripple</Text>
                        <Text style={styles.subtitle}>Small impacts, big changes</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.notificationIcon}
                        onPress={() => setShowNotifications(true)}
                    >
                        <View style={styles.bellIcon}>
                            <View style={styles.bellTop} />
                            <View style={styles.bellBottom} />
                            <View style={styles.bellClapper} />
                        </View>
                        {friendRequests.length > 0 && (
                            <View style={styles.notificationBadge}>
                                <Text style={styles.badgeText}>{friendRequests.length}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Mascot Section with Speech Bubble and Otter */}
                <View style={styles.mascotSection}>
                    <View style={styles.speechBubbleWrapper}>
                        <View style={styles.speechBubble}>
                            <Text style={styles.speechText}>Hey there!</Text>
                        </View>
                        <View style={styles.speechBubbleTail} />
                    </View>
                    <Image
                        source={require('../assets/images/HomePage.png')}
                        style={styles.otterImage}
                        resizeMode="contain"
                        fadeDuration={0}
                    />
                </View>

                {/* Encouragement Message Card */}
                <View style={styles.messageCardWrapper}>
                    <LinearGradient
                        colors={['#E9D5FF', '#DBEAFE']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.messageCard}
                    >
                        <Text style={styles.messageText}>
                            "Remember, progress isn't always visible. Trust the process."
                        </Text>
                    </LinearGradient>
                </View>

                {/* Community Encouragement Messages */}
                <View style={styles.communitySection}>
                    <Text style={styles.communitySectionTitle}>Words from our community</Text>
                    {communityMessages.map((message, index) => (
                        <View key={index} style={styles.communityMessageCard}>
                            <Text style={styles.communityMessageText}>"{message}"</Text>
                        </View>
                    ))}
                </View>

                {/* Share Encouragement Button */}
                <TouchableOpacity
                    style={styles.shareButton}
                    onPress={() => setShowEncouragementModal(true)}
                >
                    <LinearGradient
                        colors={['#D1C5FD', '#BFDBFE']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.shareButtonGradient}
                    >
                        <Text style={styles.shareButtonText}>
                            Share your own words{'\n'}of encouragement!
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </ScrollView>

            {/* Meditation Floating Button */}
            <TouchableOpacity
                style={styles.meditationButton}
                onPress={() => onNavigate('meditation')}
                activeOpacity={0.8}
            >
                <LinearGradient
                    colors={['#D1C5FD', '#BFDBFE']}
                    style={styles.meditationButtonGradient}
                >
                    <Ionicons name="headset" size={24} color="#FFFFFF" />
                </LinearGradient>
            </TouchableOpacity>

            {/* Bottom Navigation - Fixed at bottom */}
            <View style={styles.bottomNavContainer}>
                <BottomNav currentPage="home" onNavigate={onNavigate} />
            </View>

            {/* Notifications Modal */}
            <Modal
                visible={showNotifications}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setShowNotifications(false)}
            >
                <TouchableOpacity
                    style={styles.notificationModalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowNotifications(false)}
                >
                    <View style={styles.notificationModalContent}>
                        {/* Header */}
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Connection Requests</Text>
                            <TouchableOpacity onPress={() => setShowNotifications(false)}>
                                <Text style={styles.closeButton}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Friend Requests List */}
                        <ScrollView style={styles.requestsList}>
                            {friendRequests.map((request) => (
                                <View key={request.id} style={styles.requestCard}>
                                    <View style={styles.requestInfo}>
                                        <View style={styles.avatarCircle}>
                                            <Text style={styles.avatarEmoji}>{request.avatar}</Text>
                                        </View>
                                        <View style={styles.requestDetails}>
                                            <Text style={styles.requestName}>{request.name}</Text>
                                            <Text style={styles.requestEvent}>
                                                Met at {request.event}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.requestActions}>
                                        <TouchableOpacity
                                            style={styles.acceptButton}
                                            onPress={() => handleAcceptRequest(request.id)}
                                        >
                                            <Text style={styles.acceptButtonText}>Accept</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.declineButton}
                                            onPress={() => handleDeclineRequest(request.id)}
                                        >
                                            <Text style={styles.declineButtonText}>Decline</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* Encouragement Message Modal */}
            <Modal
                visible={showEncouragementModal}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setShowEncouragementModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.encouragementModalContent}>
                        {/* Header */}
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Share Encouragement</Text>
                            <TouchableOpacity onPress={() => setShowEncouragementModal(false)}>
                                <Text style={styles.closeButton}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.encouragementSubtitle}>
                            Your message will be shared anonymously with others
                        </Text>

                        {/* Text Input */}
                        <TextInput
                            style={styles.textInput}
                            placeholder="Type your encouraging message..."
                            placeholderTextColor="#9CA3AF"
                            multiline
                            numberOfLines={6}
                            value={encouragementMessage}
                            onChangeText={setEncouragementMessage}
                            textAlignVertical="top"
                            blurOnSubmit={true}
                            onSubmitEditing={() => Keyboard.dismiss()}
                            returnKeyType="done"
                        />

                        {/* Share Button */}
                        <TouchableOpacity
                            style={styles.shareModalButton}
                            onPress={handleShareEncouragement}
                        >
                            <LinearGradient
                                colors={['#D1C5FD', '#BFDBFE']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.shareModalButtonGradient}
                            >
                                <Text style={styles.shareModalButtonText}>Share Message</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },

    // Decorative Circles
    gradientCircleTopRight: {
        position: 'absolute',
        top: -100,
        right: -100,
        width: 250,
        height: 250,
        overflow: 'hidden',
        zIndex: 0,
    },
    gradientCircleBottomLeft: {
        position: 'absolute',
        bottom: 200,
        left: -100,
        width: 300,
        height: 300,
        overflow: 'hidden',
        zIndex: 0,
    },
    circle: {
        width: '100%',
        height: '100%',
        borderRadius: 200,
        opacity: 0.4,
    },

    scrollView: {
        flex: 1,
        zIndex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 120,
    },

    // Header
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 40,
    },
    appName: {
        fontSize: 48,
        fontWeight: '700',
        color: '#000000',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        color: '#6B7280',
    },
    notificationIcon: {
        padding: 5,
        position: 'relative',
    },

    // Bell Icon
    bellIcon: {
        width: 24,
        height: 24,
        alignItems: 'center',
        position: 'relative',
    },
    bellTop: {
        width: 18,
        height: 16,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#CABDFD',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomWidth: 0,
    },
    bellBottom: {
        width: 20,
        height: 3,
        backgroundColor: '#CABDFD',
        borderRadius: 2,
    },
    bellClapper: {
        width: 4,
        height: 4,
        backgroundColor: '#CABDFD',
        borderRadius: 2,
        position: 'absolute',
        bottom: -2,
    },

    // Notification Badge
    notificationBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#EF4444',
        borderRadius: 10,
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: '700',
    },

    // Mascot Section (Speech Bubble + Otter together)
    mascotSection: {
        alignItems: 'center',
        marginBottom: 30,
    },

    // Speech Bubble
    speechBubbleWrapper: {
        alignItems: 'center',
        marginBottom: 10,
    },
    speechBubble: {
        backgroundColor: '#D1C5FD',
        paddingHorizontal: 45,
        paddingVertical: 18,
        borderRadius: 50,
    },
    speechBubbleTail: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 12,
        borderRightWidth: 12,
        borderTopWidth: 15,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#D1C5FD',
        marginTop: -2,
        marginRight: -20,
    },
    speechText: {
        fontSize: 30,
        fontWeight: '600',
        color: '#FFFFFF',
    },

    // Otter Image
    otterImage: {
        width: 180,
        height: 180,
        marginTop: -10,
    },

    // Message Card
    messageCardWrapper: {
        alignItems: 'center',
        marginBottom: 60,
    },
    messageCard: {
        width: '100%',
        borderRadius: 35,
        paddingHorizontal: 35,
        paddingVertical: 40,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    messageText: {
        fontSize: 19,
        color: '#374151',
        textAlign: 'center',
        lineHeight: 28,
        fontWeight: '500',
    },

    // Share Button
    shareButton: {
        marginBottom: 30,
        alignSelf: 'center',
        width: '75%',
    },
    shareButtonGradient: {
        paddingVertical: 18,
        paddingHorizontal: 25,
        borderRadius: 35,
        alignItems: 'center',
        borderWidth: 0.7,
        borderColor: '#000000',
    },
    shareButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: 24,
    },

    // Meditation Floating Button
    meditationButton: {
        position: 'absolute',
        bottom: 100,
        right: 20,
        zIndex: 11,
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    meditationButtonGradient: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Bottom Navigation Container
    bottomNavContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },

    // Community Messages Section
    communitySection: {
        marginBottom: 25,
    },
    communitySectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#7C3AED',
        marginBottom: 15,
    },
    communityMessageCard: {
        backgroundColor: '#F5F3FF',
        borderRadius: 15,
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#DDD6FE',
    },
    communityMessageText: {
        fontSize: 14,
        color: '#6D28D9',
        fontStyle: 'italic',
        lineHeight: 20,
    },

    // Notification Modal (no dark overlay)
    notificationModalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 20,
        paddingBottom: 100,
    },
    notificationModalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        width: '100%',
        maxHeight: '70%',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 15,
    },

    // Modal Styles (for encouragement modal)
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#374151',
    },
    closeButton: {
        fontSize: 28,
        color: '#9CA3AF',
        fontWeight: '300',
    },

    // Friend Requests
    requestsList: {
        maxHeight: 400,
    },
    requestCard: {
        backgroundColor: '#F9FAFB',
        borderRadius: 20,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    requestInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatarCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#D1C5FD',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarEmoji: {
        fontSize: 24,
    },
    requestDetails: {
        flex: 1,
    },
    requestName: {
        fontSize: 17,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 4,
    },
    requestEvent: {
        fontSize: 14,
        color: '#6B7280',
    },
    requestActions: {
        flexDirection: 'row',
        gap: 10,
    },
    acceptButton: {
        flex: 1,
        backgroundColor: '#CABDFD',
        paddingVertical: 12,
        borderRadius: 15,
        alignItems: 'center',
    },
    acceptButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
    },
    declineButton: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        paddingVertical: 12,
        borderRadius: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    declineButtonText: {
        color: '#6B7280',
        fontSize: 15,
        fontWeight: '600',
    },

    // Encouragement Modal
    encouragementModalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        width: '100%',
        padding: 24,
    },
    encouragementSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 20,
        textAlign: 'center',
    },
    textInput: {
        backgroundColor: '#F9FAFB',
        borderRadius: 20,
        padding: 16,
        fontSize: 16,
        color: '#374151',
        minHeight: 150,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginBottom: 20,
    },
    shareModalButton: {
        width: '100%',
    },
    shareModalButtonGradient: {
        paddingVertical: 16,
        borderRadius: 25,
        alignItems: 'center',
    },
    shareModalButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '600',
    },
});