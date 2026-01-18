import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TextInput, ScrollView, SafeAreaView, Image } from 'react-native';

// Username generation data
const adjectives = ['happy', 'gentle', 'wise', 'calm', 'brave', 'kind', 'sweet', 'silly', 'curious', 'jolly', 'peaceful', 'cheerful', 'friendly', 'clever', 'cozy', 'bright', 'sunny', 'quiet', 'warm', 'cool', 'swift', 'tiny', 'mighty', 'noble', 'pure', 'soft', 'neat', 'proud', 'lucky', 'sleepy', 'bouncy', 'fuzzy', 'snuggly', 'playful', 'graceful', 'patient', 'creative', 'dreamy', 'gentle', 'honest', 'humble', 'joyful', 'lively', 'merry', 'serene', 'tender', 'vivid', 'witty', 'zesty'];

const animals = ['otter', 'cat', 'dog', 'bunny'];

// Map animal names to their PNG images
const animalImages = {
    otter: require('../assets/images/OtterWelcome.png'),
    cat: require('../assets/images/MessageCat.png'),
    dog: require('../assets/images/MessageDog.png'),
    bunny: require('../assets/images/MessageBunny.png'),
};

const interestOptions = [
    'Reading', 'Writing', 'Gaming', 'Cooking', 'Baking', 'Art', 'Music',
    'Sports', 'Fitness', 'Yoga', 'Hiking', 'Camping', 'Photography',
    'Movies', 'TV Shows', 'Anime', 'Travel', 'Languages', 'Dancing',
    'Meditation', 'Podcasts', 'Board Games', 'Crafts', 'Fashion',
    'Tech', 'Coding', 'Science', 'History', 'Politics', 'Volunteering'
];

const generateUsername = () => {
    const adj1 = adjectives[Math.floor(Math.random() * adjectives.length)];
    const adj2 = adjectives[Math.floor(Math.random() * adjectives.length)];
    const animal = animals[Math.floor(Math.random() * animals.length)];
    return `${adj1}-${adj2}-${animal}`;
};

// Account Creation Step 1: Name & Pronouns
export function AccountStep1({ onNavigate, userData, onUpdateUserData }) {
    const [firstName, setFirstName] = useState(userData.firstName);
    const [lastName, setLastName] = useState(userData.lastName);
    const [pronouns, setPronouns] = useState(userData.pronouns);
    const [customPronouns, setCustomPronouns] = useState('');
    const [showOtherInput, setShowOtherInput] = useState(false);

    const handlePronounSelect = (pronoun) => {
        if (pronoun === 'other') {
            setShowOtherInput(true);
            setPronouns('');
        } else {
            setShowOtherInput(false);
            setPronouns(pronoun);
            setCustomPronouns('');
        }
    };

    const handleNext = () => {
        const finalPronouns = showOtherInput ? customPronouns : pronouns;
        onUpdateUserData({ firstName, lastName, pronouns: finalPronouns });
        onNavigate('account-step2');
    };

    const isFormValid = firstName && lastName && (pronouns || (showOtherInput && customPronouns.trim()));

    return (
        <SafeAreaView style={styles.whiteContainer}>
            <StatusBar barStyle="dark-content" />

            <TouchableOpacity
                style={styles.backButtonWhite}
                onPress={() => onNavigate('cwl-auth')}
            >
                <Text style={styles.backArrowDark}>← Back</Text>
            </TouchableOpacity>

            <Text style={styles.progressText}>Step 1 of 4</Text>

            <View style={styles.accountStepContainer}>
                <Text style={styles.stepTitle}>Let's get to know you</Text>
                <Text style={styles.stepSubtitle}>This info stays private unless you choose to share it</Text>

                <Text style={styles.inputLabel}>First Name</Text>
                <TextInput
                    style={styles.input}
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder="Enter your first name"
                />

                <Text style={styles.inputLabel}>Last Name</Text>
                <TextInput
                    style={styles.input}
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder="Enter your last name"
                />

                <Text style={styles.inputLabel}>Pronouns</Text>
                <View style={styles.pronounsContainer}>
                    {['he/him', 'she/her', 'they/them', 'other'].map((pronoun) => (
                        <TouchableOpacity
                            key={pronoun}
                            style={[
                                styles.pronounChip, 
                                (pronouns === pronoun || (pronoun === 'other' && showOtherInput)) && styles.pronounChipSelected
                            ]}
                            onPress={() => handlePronounSelect(pronoun)}
                        >
                            <Text style={[
                                styles.pronounText, 
                                (pronouns === pronoun || (pronoun === 'other' && showOtherInput)) && styles.pronounTextSelected
                            ]}>
                                {pronoun}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Custom Pronouns Input - shows when "other" is selected */}
                {showOtherInput && (
                    <TextInput
                        style={[styles.input, styles.customPronounsInput]}
                        value={customPronouns}
                        onChangeText={setCustomPronouns}
                        placeholder="Enter your pronouns (e.g., ze/zir, xe/xem)"
                        autoFocus
                    />
                )}

                <TouchableOpacity
                    style={[styles.nextButton, !isFormValid && styles.nextButtonDisabled]}
                    onPress={handleNext}
                    disabled={!isFormValid}
                >
                    <Text style={styles.nextButtonText}>Next →</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

// Account Creation Step 2: Username Picker
export function AccountStep2({ onNavigate, userData, onUpdateUserData }) {
    const [username, setUsername] = useState(userData.username || generateUsername());

    const handleNext = () => {
        // Extract the animal from the username
        const animal = animals.find(a => username.includes(a)) || 'otter';
        onUpdateUserData({
            username,
            animal: animal,
            pfp: animalImages[animal]
        });
        onNavigate('account-step3');
    };

    // Get current animal for preview
    const currentAnimal = animals.find(a => username.includes(a)) || 'otter';

    return (
        <SafeAreaView style={styles.whiteContainer}>
            <StatusBar barStyle="dark-content" />

            <TouchableOpacity
                style={styles.backButtonWhite}
                onPress={() => onNavigate('account-step1')}
            >
                <Text style={styles.backArrowDark}>← Back</Text>
            </TouchableOpacity>

            <Text style={styles.progressText}>Step 2 of 4</Text>

            <View style={styles.accountStepContainer}>
                <Text style={styles.stepTitle}>Your anonymous username</Text>
                <Text style={styles.stepSubtitle}>We've generated a fun username for you!</Text>

                <View style={styles.usernameDisplay}>
                    <Image 
                        source={animalImages[currentAnimal]}
                        style={styles.usernamePreviewImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.usernameText}>{username}</Text>
                </View>

                <TouchableOpacity
                    style={styles.regenerateButton}
                    onPress={() => setUsername(generateUsername())}
                >
                    <Text style={styles.regenerateButtonText}>🔄 Generate another</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={handleNext}
                >
                    <Text style={styles.nextButtonText}>Next →</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

// Account Creation Step 3: Animal PFP
export function AccountStep3({ onNavigate, userData }) {
    const handleNext = () => {
        onNavigate('account-step4');
    };

    return (
        <SafeAreaView style={styles.whiteContainer}>
            <StatusBar barStyle="dark-content" />

            <TouchableOpacity
                style={styles.backButtonWhite}
                onPress={() => onNavigate('account-step2')}
            >
                <Text style={styles.backArrowDark}>← Back</Text>
            </TouchableOpacity>

            <Text style={styles.progressText}>Step 3 of 4</Text>

            <View style={styles.accountStepContainer}>
                <Text style={styles.stepTitle}>Your profile picture</Text>
                <Text style={styles.stepSubtitle}>Based on your username: {userData.username}</Text>

                <View style={styles.pfpDisplay}>
                    <Image 
                        source={userData.pfp}
                        style={styles.pfpImage}
                        resizeMode="contain"
                    />
                </View>

                <Text style={styles.pfpAnimalName}>{userData.animal}</Text>

                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={handleNext}
                >
                    <Text style={styles.nextButtonText}>Next →</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

// Account Creation Step 4: Interests
export function AccountStep4({ onNavigate, userData, onUpdateUserData }) {
    const [selectedInterests, setSelectedInterests] = useState(userData.interests);

    const toggleInterest = (interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter(i => i !== interest));
        } else if (selectedInterests.length < 3) {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    const handleFinish = () => {
        onUpdateUserData({ interests: selectedInterests });
        onNavigate('home');
    };

    return (
        <SafeAreaView style={styles.whiteContainer}>
            <StatusBar barStyle="dark-content" />

            <TouchableOpacity
                style={styles.backButtonWhite}
                onPress={() => onNavigate('account-step3')}
            >
                <Text style={styles.backArrowDark}>← Back</Text>
            </TouchableOpacity>

            <Text style={styles.progressText}>Step 4 of 4</Text>

            <ScrollView contentContainerStyle={styles.accountStepContainer}>
                <Text style={styles.stepTitle}>Your top 3 interests</Text>
                <Text style={styles.stepSubtitle}>Select up to 3 ({selectedInterests.length}/3 selected)</Text>

                <View style={styles.interestsGrid}>
                    {interestOptions.map((interest) => (
                        <TouchableOpacity
                            key={interest}
                            style={[
                                styles.interestChip,
                                selectedInterests.includes(interest) && styles.interestChipSelected
                            ]}
                            onPress={() => toggleInterest(interest)}
                        >
                            <Text style={[
                                styles.interestText,
                                selectedInterests.includes(interest) && styles.interestTextSelected
                            ]}>
                                {interest}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity
                    style={[styles.nextButton, selectedInterests.length !== 3 && styles.nextButtonDisabled]}
                    onPress={handleFinish}
                    disabled={selectedInterests.length !== 3}
                >
                    <Text style={styles.nextButtonText}>Create Account</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    whiteContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    backButtonWhite: {
        padding: 20,
        paddingTop: 10,
    },
    backArrowDark: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '600',
    },
    progressText: {
        fontSize: 14,
        color: '#9CA3AF',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    accountStepContainer: {
        padding: 30,
    },
    stepTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#000000',
        marginBottom: 10,
    },
    stepSubtitle: {
        fontSize: 15,
        color: '#6B7280',
        marginBottom: 30,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
        marginTop: 16,
    },
    input: {
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    pronounsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginTop: 10,
    },
    pronounChip: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#E5E7EB',
        backgroundColor: '#FFFFFF',
    },
    pronounChipSelected: {
        borderColor: '#D1C5FD',
        backgroundColor: '#F3E8FF',
    },
    pronounText: {
        fontSize: 14,
        color: '#6B7280',
    },
    pronounTextSelected: {
        color: '#7C3AED',
        fontWeight: '600',
    },
    customPronounsInput: {
        marginTop: 12,
    },
    nextButton: {
        backgroundColor: '#D1C5FD',
        padding: 18,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 40,
    },
    nextButtonDisabled: {
        opacity: 0.5,
    },
    nextButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    usernameDisplay: {
        backgroundColor: '#F3E8FF',
        padding: 30,
        borderRadius: 20,
        alignItems: 'center',
        marginVertical: 30,
    },
    usernamePreviewImage: {
        width: 80,
        height: 80,
        marginBottom: 15,
    },
    usernameText: {
        fontSize: 28,
        fontWeight: '700',
        color: '#7C3AED',
    },
    regenerateButton: {
        padding: 15,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#D1C5FD',
        alignItems: 'center',
        marginBottom: 20,
    },
    regenerateButtonText: {
        fontSize: 16,
        color: '#7C3AED',
        fontWeight: '600',
    },
    pfpDisplay: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 40,
    },
    pfpImage: {
        width: 200,
        height: 200,
    },
    pfpAnimalName: {
        fontSize: 24,
        fontWeight: '600',
        color: '#6B7280',
        textAlign: 'center',
        textTransform: 'capitalize',
    },
    interestsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 20,
    },
    interestChip: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#E5E7EB',
        backgroundColor: '#FFFFFF',
    },
    interestChipSelected: {
        borderColor: '#D1C5FD',
        backgroundColor: '#F3E8FF',
    },
    interestText: {
        fontSize: 14,
        color: '#6B7280',
    },
    interestTextSelected: {
        color: '#7C3AED',
        fontWeight: '600',
    },
});