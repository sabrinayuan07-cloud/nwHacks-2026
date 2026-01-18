import React, { useState } from 'react';
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
    Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from './bottomNav';

// Map animal names to their PNG images (same as createAccount.js)
const animalImages = {
    otter: require('../assets/images/OtterWelcome.png'),
    cat: require('../assets/images/MessageCat.png'),
    dog: require('../assets/images/MessageDog.png'),
    bunny: require('../assets/images/MessageBunny.png'),
};

const animals = ['otter', 'cat', 'dog', 'bunny'];

const interestOptions = [
    'Reading', 'Writing', 'Gaming', 'Cooking', 'Baking', 'Art', 'Music',
    'Sports', 'Fitness', 'Yoga', 'Hiking', 'Camping', 'Photography',
    'Movies', 'TV Shows', 'Anime', 'Travel', 'Languages', 'Dancing',
    'Meditation', 'Podcasts', 'Board Games', 'Crafts', 'Fashion',
    'Tech', 'Coding', 'Science', 'History', 'Politics', 'Volunteering'
];

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

export default function ProfilePage({ userData, onNavigate, onUpdateUserData }) {
    const [isPublicView, setIsPublicView] = useState(false); // false = anonymous (default), true = public
    const [showEditModal, setShowEditModal] = useState(false);
    const [showEditInterestsModal, setShowEditInterestsModal] = useState(false);
    const [editUsername, setEditUsername] = useState(userData?.username || '');
    const [editPronouns, setEditPronouns] = useState(userData?.pronouns || '');
    const [editProgram, setEditProgram] = useState(userData?.program || '');
    const [editYear, setEditYear] = useState(userData?.year || '');
    const [selectedInterests, setSelectedInterests] = useState(userData?.interests || []);

    // Get the profile picture - check pfp first, then animal, then extract from username
    const getProfilePicture = () => {
        if (userData?.pfp) {
            // pfp is already an image source
            return userData.pfp;
        }
        // If animal is stored, use it
        if (userData?.animal && animalImages[userData.animal]) {
            return animalImages[userData.animal];
        }
        // Otherwise, extract animal from username as fallback
        if (userData?.username) {
            const animal = animals.find(a => userData.username.toLowerCase().includes(a));
            if (animal && animalImages[animal]) {
                return animalImages[animal];
            }
        }
        // Default to otter
        return animalImages.otter;
    };

    const handleLogout = () => {
        Alert.alert(
            'Log Out',
            'Are you sure you want to log out?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Log Out', onPress: () => onNavigate('welcome'), style: 'destructive' }
            ]
        );
    };

    const handleEditProfile = () => {
        if (isPublicView) {
            // Load program and year for public view
            setEditProgram(userData?.program || '');
            setEditYear(userData?.year || '');
        } else {
            // Load username and pronouns for anonymous view
            setEditUsername(userData?.username || '');
            setEditPronouns(userData?.pronouns || '');
        }
        setShowEditModal(true);
    };

    const handleSaveProfile = () => {
        if (onUpdateUserData) {
            if (isPublicView) {
                // Save program and year for public view
                onUpdateUserData({
                    program: editProgram,
                    year: editYear
                });
            } else {
                // Save username and pronouns for anonymous view
                onUpdateUserData({
                    username: editUsername,
                    pronouns: editPronouns
                });
            }
        }
        setShowEditModal(false);
    };

    const handleToggleView = () => {
        setIsPublicView(!isPublicView);
    };

    const toggleInterest = (interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter(i => i !== interest));
        } else if (selectedInterests.length < 3) {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    const handleSaveInterests = () => {
        if (onUpdateUserData) {
            onUpdateUserData({ interests: selectedInterests });
        }
        setShowEditInterestsModal(false);
    };

    const handleEditInterests = () => {
        setSelectedInterests(userData?.interests || []);
        setShowEditInterestsModal(true);
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

            {/* Eye Icon Button - Top Right */}
            <View style={styles.eyeIconContainer}>
                <TouchableOpacity onPress={handleToggleView} style={styles.eyeIconButton}>
                    <Ionicons 
                        name={isPublicView ? "eye" : "eye-off"} 
                        size={24} 
                        color="#000000" 
                    />
                </TouchableOpacity>
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
                            <Image
                                source={getProfilePicture()}
                                style={styles.avatarImage}
                                resizeMode="contain"
                            />
                        </LinearGradient>
                    </View>
                    {isPublicView ? (
                        <>
                            <Text
                                style={styles.username}
                                numberOfLines={1}
                                adjustsFontSizeToFit
                                minimumFontScale={0.6}
                            >
                                {userData?.firstName && userData?.lastName 
                                    ? `${userData.firstName} ${userData.lastName}`
                                    : userData?.firstName || userData?.lastName || 'Your Name'}
                            </Text>
                            <Text style={styles.pronouns}>{userData?.pronouns || 'they/them'}</Text>
                            {(userData?.program || userData?.year) && (
                                <View style={styles.publicInfoContainer}>
                                    {userData?.program && (
                                        <Text style={styles.publicInfoText}>Program: {userData.program}</Text>
                                    )}
                                    {userData?.year && (
                                        <Text style={styles.publicInfoText}>Year: {userData.year}</Text>
                                    )}
                                </View>
                            )}
                        </>
                    ) : (
                        <>
                            <Text
                                style={styles.username}
                                numberOfLines={1}
                                adjustsFontSizeToFit
                                minimumFontScale={0.6}
                            >
                                {userData?.username || 'calm-otter'}
                            </Text>
                            <Text style={styles.pronouns}>{userData?.pronouns || 'they/them'}</Text>
                        </>
                    )}
                </View>

                {/* Interests Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Interests</Text>
                        {!isPublicView && (
                            <TouchableOpacity onPress={handleEditInterests}>
                                <Text style={styles.editInterestsText}>Edit</Text>
                            </TouchableOpacity>
                        )}
                    </View>
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
                    <TouchableOpacity 
                        style={styles.editProfileButton} 
                        onPress={handleEditProfile}
                    >
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

            {/* Edit Profile Modal */}
            <Modal
                visible={showEditModal}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setShowEditModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.editModalContent}>
                        <View style={styles.editModalHeader}>
                            <Text style={styles.editModalTitle}>
                                {isPublicView ? 'Edit Public Profile' : 'Edit Profile'}
                            </Text>
                            <TouchableOpacity onPress={() => setShowEditModal(false)}>
                                <Text style={styles.closeButton}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        {!isPublicView && (
                            <>
                                <Text style={styles.inputLabel}>Username</Text>
                                <TextInput
                                    style={styles.editInput}
                                    value={editUsername}
                                    onChangeText={setEditUsername}
                                    placeholder="Enter username"
                                    placeholderTextColor="#9CA3AF"
                                />
                            </>
                        )}

                        {isPublicView ? (
                            <>
                                <Text style={styles.inputLabel}>Program</Text>
                                <TextInput
                                    style={styles.editInput}
                                    value={editProgram}
                                    onChangeText={setEditProgram}
                                    placeholder="e.g., Computer Science, Psychology"
                                    placeholderTextColor="#9CA3AF"
                                />

                                <Text style={styles.inputLabel}>Year</Text>
                                <TextInput
                                    style={styles.editInput}
                                    value={editYear}
                                    onChangeText={setEditYear}
                                    placeholder="e.g., First Year, Second Year, Graduate"
                                    placeholderTextColor="#9CA3AF"
                                />
                            </>
                        ) : (
                            <>
                                <Text style={styles.inputLabel}>Pronouns</Text>
                                <TextInput
                                    style={styles.editInput}
                                    value={editPronouns}
                                    onChangeText={setEditPronouns}
                                    placeholder="e.g., they/them, she/her, he/him"
                                    placeholderTextColor="#9CA3AF"
                                />
                            </>
                        )}

                        <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
                            <LinearGradient
                                colors={['#D1C5FD', '#BFDBFE']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.saveButtonGradient}
                            >
                                <Text style={styles.saveButtonText}>Save Changes</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Edit Interests Modal */}
            <Modal
                visible={showEditInterestsModal}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setShowEditInterestsModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.editModalContent}>
                        <View style={styles.editModalHeader}>
                            <Text style={styles.editModalTitle}>Edit Interests</Text>
                            <TouchableOpacity onPress={() => setShowEditInterestsModal(false)}>
                                <Text style={styles.closeButton}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.inputLabel}>Select up to 3 interests ({selectedInterests.length}/3 selected)</Text>
                        
                        <ScrollView style={styles.interestsGridModal} showsVerticalScrollIndicator={true}>
                            <View style={styles.interestsGrid}>
                                {interestOptions.map((interest) => (
                                    <TouchableOpacity
                                        key={interest}
                                        style={[
                                            styles.interestChipModal,
                                            selectedInterests.includes(interest) && styles.interestChipModalSelected
                                        ]}
                                        onPress={() => toggleInterest(interest)}
                                    >
                                        <Text style={[
                                            styles.interestTextModal,
                                            selectedInterests.includes(interest) && styles.interestTextModalSelected
                                        ]}>
                                            {interest}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>

                        <TouchableOpacity 
                            style={[styles.saveButton, selectedInterests.length === 0 && styles.saveButtonDisabled]} 
                            onPress={handleSaveInterests}
                            disabled={selectedInterests.length === 0}
                        >
                            <LinearGradient
                                colors={['#D1C5FD', '#BFDBFE']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.saveButtonGradient}
                            >
                                <Text style={styles.saveButtonText}>Save Interests</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

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
    eyeIconContainer: {
        position: 'absolute',
        top: 60,
        right: 20,
        zIndex: 10,
    },
    eyeIconButton: {
        padding: 8,
    },
    publicInfoContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    publicInfoText: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 4,
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
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000000',
    },
    editInterestsText: {
        fontSize: 14,
        color: '#7C3AED',
        fontWeight: '600',
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
    },
    editProfileGradient: {
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
        borderWidth: 0.7,
        borderColor: '#000000',
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
        borderWidth: 0.7,
        borderColor: '#000000',
    },
    privacyButtonText: {
        color: '#7C3AED',
        fontSize: 16,
        fontWeight: '600',
    },
    logoutButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 0.7,
        borderColor: '#000000',
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

    // Edit Profile Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    editModalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        width: '100%',
        padding: 24,
    },
    editModalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    editModalTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#374151',
    },
    closeButton: {
        fontSize: 28,
        color: '#9CA3AF',
        fontWeight: '300',
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
        marginTop: 10,
    },
    editInput: {
        backgroundColor: '#F9FAFB',
        borderRadius: 15,
        padding: 16,
        fontSize: 16,
        color: '#374151',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    saveButton: {
        marginTop: 25,
    },
    saveButtonGradient: {
        paddingVertical: 16,
        borderRadius: 25,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    saveButtonDisabled: {
        opacity: 0.5,
    },
    interestsGridModal: {
        maxHeight: 300,
        marginBottom: 20,
    },
    interestsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    interestChipModal: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#E5E7EB',
        backgroundColor: '#FFFFFF',
    },
    interestChipModalSelected: {
        borderColor: '#D1C5FD',
        backgroundColor: '#F3E8FF',
    },
    interestTextModal: {
        fontSize: 14,
        color: '#6B7280',
    },
    interestTextModalSelected: {
        color: '#7C3AED',
        fontWeight: '600',
    },
});
