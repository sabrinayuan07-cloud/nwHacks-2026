import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BottomNav from './bottomNav';

// Sample upcoming events data
const upcomingEvents = [
    {
        id: 1,
        title: 'Mindful Bites',
        time: 'Tomorrow, 6:00 PM - 8:00 PM',
        icon: require('../assets/images/EventsCooking.png'),
    },
    {
        id: 2,
        title: 'Connect & Craft',
        time: 'Wednesday, 11:00 AM - 1:00 PM',
        icon: require('../assets/images/EventsCraft.png'),
    },
];

export default function ProfilePage({ userData, onNavigate }) {
    const handleLogout = () => {
        onNavigate('welcome');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

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
                {/* Profile Avatar */}
                <View style={styles.avatarSection}>
                    <View style={styles.avatarContainer}>
                        <LinearGradient
                            colors={['#E9D5FF', '#D1C5FD']}
                            style={styles.avatarBackground}
                        >
                            {userData?.pfp ? (
                                <Text style={styles.avatarEmoji}>{userData.pfp}</Text>
                            ) : (
                                <Image
                                    source={require('../assets/images/OtterWelcome.png')}
                                    style={styles.avatarImage}
                                    resizeMode="contain"
                                />
                            )}
                        </LinearGradient>
                    </View>
                    <Text style={styles.username}>{userData?.username || 'calm-otter'}</Text>
                    <Text style={styles.pronouns}>{userData?.pronouns || 'they/them'}</Text>
                </View>

                {/* Interests Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Interests</Text>
                    <View style={styles.interestsContainer}>
                        {(userData?.interests && userData.interests.length > 0
                            ? userData.interests
                            : ['Cooking', 'Music', 'Reading']
                        ).map((interest, index) => (
                            <LinearGradient
                                key={index}
                                colors={['#D1C5FD', '#CABDFD']}
                                style={styles.interestChip}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Text style={styles.interestText}>{interest}</Text>
                            </LinearGradient>
                        ))}
                    </View>
                </View>

                {/* Upcoming Events Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Your upcoming events</Text>
                    <View style={styles.eventsCard}>
                        {upcomingEvents.map((event) => (
                            <View key={event.id} style={styles.eventItem}>
                                <Image
                                    source={event.icon}
                                    style={styles.eventIcon}
                                    resizeMode="contain"
                                />
                                <View style={styles.eventInfo}>
                                    <Text style={styles.eventTitle}>{event.title}</Text>
                                    <Text style={styles.eventTime}>{event.time}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonsSection}>
                    <TouchableOpacity style={styles.editProfileButton}>
                        <LinearGradient
                            colors={['#D1C5FD', '#CABDFD', '#BFDBFE']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            locations={[0, 0.4, 1]}
                            style={styles.editProfileGradient}
                        >
                            <Text style={styles.editProfileText}>Edit Profile</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.privacyButton}>
                        <Text style={styles.privacyButtonText}>Privacy Settings</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.logoutText}>Log out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Fixed Bottom Navigation */}
            <View style={styles.bottomNavContainer}>
                <BottomNav currentPage="profile" onNavigate={onNavigate} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
        paddingTop: 80,
        paddingBottom: 120,
    },

    // Avatar Section
    avatarSection: {
        alignItems: 'center',
        marginBottom: 30,
    },
    avatarContainer: {
        marginBottom: 15,
    },
    avatarBackground: {
        width: 140,
        height: 140,
        borderRadius: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarImage: {
        width: 100,
        height: 100,
    },
    avatarEmoji: {
        fontSize: 80,
    },
    username: {
        fontSize: 24,
        fontWeight: '700',
        color: '#000000',
        marginBottom: 5,
    },
    pronouns: {
        fontSize: 16,
        color: '#6B7280',
    },

    // Sections
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000000',
        marginBottom: 15,
    },

    // Interests
    interestsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    interestChip: {
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 25,
    },
    interestText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
    },

    // Events Card
    eventsCard: {
        backgroundColor: '#F8FAFF',
        borderRadius: 20,
        padding: 15,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    eventItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    eventIcon: {
        width: 40,
        height: 40,
        marginRight: 15,
    },
    eventInfo: {
        flex: 1,
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
        marginBottom: 3,
    },
    eventTime: {
        fontSize: 13,
        color: '#6B7280',
    },

    // Buttons Section
    buttonsSection: {
        marginTop: 20,
        alignItems: 'center',
    },
    editProfileButton: {
        width: '100%',
        marginBottom: 15,
        shadowColor: '#D1C5FD',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    editProfileGradient: {
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
    },
    editProfileText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    privacyButton: {
        width: '100%',
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
        backgroundColor: '#F3E8FF',
        marginBottom: 15,
    },
    privacyButtonText: {
        color: '#7C3AED',
        fontSize: 16,
        fontWeight: '600',
    },
    logoutButton: {
        paddingVertical: 10,
    },
    logoutText: {
        color: '#6B7280',
        fontSize: 16,
        fontWeight: '500',
    },

    // Fixed Bottom Nav Container
    bottomNavContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
});
