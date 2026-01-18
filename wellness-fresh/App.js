import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
    const [currentPage, setCurrentPage] = useState('welcome');
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        pronouns: '',
        username: '',
        animal: '',
        pfp: '',
        interests: []
    });

    // Username generation data
    const adjectives = ['happy', 'gentle', 'wise', 'calm', 'brave', 'kind', 'sweet', 'silly', 'curious', 'jolly', 'peaceful', 'cheerful', 'friendly', 'clever', 'cozy', 'bright', 'sunny', 'quiet', 'warm', 'cool', 'swift', 'tiny', 'mighty', 'noble', 'pure', 'soft', 'neat', 'proud', 'lucky', 'sleepy', 'bouncy', 'fuzzy', 'snuggly', 'playful', 'graceful', 'patient', 'creative', 'dreamy', 'gentle', 'honest', 'humble', 'joyful', 'lively', 'merry', 'serene', 'tender', 'vivid', 'witty', 'zesty'];

    const animals = ['elephant', 'panda', 'otter', 'cat', 'dog', 'bunny', 'fox', 'bear', 'koala', 'penguin', 'owl', 'deer', 'hedgehog', 'raccoon', 'squirrel', 'turtle', 'dolphin', 'seal', 'hamster', 'mouse', 'bird', 'butterfly', 'ladybug', 'bee', 'frog', 'duck', 'swan', 'peacock', 'parrot', 'whale'];

    const fruits = ['strawberry', 'mango', 'peach', 'cherry', 'kiwi', 'plum', 'grape', 'orange', 'lemon', 'melon', 'apple', 'pear', 'berry', 'coconut', 'papaya', 'guava', 'fig', 'date', 'lime', 'banana'];

    const allNouns = [...animals, ...fruits];

    const animalEmojis = {
        elephant: '🐘', panda: '🐼', otter: '🦦', cat: '🐱', dog: '🐶', bunny: '🐰',
        fox: '🦊', bear: '🐻', koala: '🐨', penguin: '🐧', owl: '🦉', deer: '🦌',
        hedgehog: '🦔', raccoon: '🦝', squirrel: '🐿️', turtle: '🐢', dolphin: '🐬',
        seal: '🦭', hamster: '🐹', mouse: '🐭', bird: '🐦', butterfly: '🦋',
        ladybug: '🐞', bee: '🐝', frog: '🐸', duck: '🦆', swan: '🦢', peacock: '🦚',
        parrot: '🦜', whale: '🐋', strawberry: '🍓', mango: '🥭', peach: '🍑',
        cherry: '🍒', kiwi: '🥝', plum: '🍑', grape: '🍇', orange: '🍊',
        lemon: '🍋', melon: '🍉', apple: '🍎', pear: '🍐', berry: '🫐',
        coconut: '🥥', papaya: '🍈', guava: '🍈', fig: '🍇', date: '🫒',
        lime: '🍋', banana: '🍌'
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
        const noun = allNouns[Math.floor(Math.random() * allNouns.length)];
        return `${adj1}${adj2}${noun}`;
    };

    // Welcome Page
    const WelcomePage = () => (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.gradientCircleTopRight}>
                <LinearGradient colors={['#BFDBFE', '#DBEAFE']} style={styles.circle} />
            </View>
            <View style={styles.gradientCircleBottomLeft}>
                <LinearGradient colors={['#D1C5FD', '#CABDFD']} style={styles.circle} />
            </View>
            <View style={styles.content}>
                <Image
                    source={require('./assets/images/OtterWelcome.png')}
                    style={styles.otterImage}
                    resizeMode="contain"
                />
                <Text style={styles.appName}>RedBull</Text>
                <Text style={styles.subtitle}>Your UBC wellness community</Text>
                <Text style={styles.question}>What brings you here?</Text>
                <Text style={styles.subQuestion}>Choose your journey</Text>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => setCurrentPage('signin')}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={['#D1C5FD', '#CABDFD', '#BFDBFE']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        locations={[0, 0.4, 1]}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>I'm a student</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.5}>
                    <LinearGradient
                        colors={['#D1C5FD', '#CABDFD', '#BFDBFE']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        locations={[0, 0.4, 1]}
                        style={[styles.button, styles.buttonDisabled]}
                    >
                        <Text style={styles.buttonText}>I'm here to support</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <Text style={styles.footer}>Built by student, for students.</Text>
        </View>
    );

    // Sign In Page
    const SignInPage = () => (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.gradientCircleTopRight}>
                <LinearGradient colors={['#BFDBFE', '#DBEAFE']} style={styles.circle} />
            </View>
            <View style={styles.gradientCircleBottomLeft}>
                <LinearGradient colors={['#D1C5FD', '#CABDFD']} style={styles.circle} />
            </View>

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => setCurrentPage('welcome')}
            >
                <Text style={styles.backArrow}>← Back</Text>
            </TouchableOpacity>

            <View style={styles.content}>
                <View style={styles.headerSection}>
                    <Text style={styles.appName}>RedBull</Text>
                    <Text style={styles.subtitle}>Your UBC wellness community</Text>
                </View>
                <View style={styles.signinOtterContainer}>
                    <Image
                        source={require('./assets/images/Signin.png')}
                        style={styles.otterImageSignin}
                        resizeMode="contain"
                    />
                </View>
                <Text style={styles.welcomeBack}>Welcome back!</Text>
                <Text style={styles.signinSubtext}>Sign in to continue</Text>
                <TouchableOpacity
                    style={styles.signinButtonContainer}
                    onPress={() => setCurrentPage('cwl-auth')}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={['#D1C5FD', '#CABDFD', '#BFDBFE']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        locations={[0, 0.4, 1]}
                        style={styles.signinButton}
                    >
                        <Text style={styles.buttonText}>Create an account</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <Text style={styles.footer}>Built by student, for students.</Text>
        </View>
    );

    // CWL Authentication Page
    const CWLAuthPage = () => {
        const [loginName, setLoginName] = useState('');
        const [password, setPassword] = useState('');
        const [loading, setLoading] = useState(false);

        const handleLogin = () => {
            setLoading(true);
            setTimeout(() => {
                setCurrentPage('account-step1');
            }, 2000);
        };

        return (
            <SafeAreaView style={styles.whiteContainer}>
                <StatusBar barStyle="dark-content" />

                <TouchableOpacity
                    style={styles.backButtonWhite}
                    onPress={() => setCurrentPage('signin')}
                >
                    <Text style={styles.backArrowDark}>← Back</Text>
                </TouchableOpacity>

                <ScrollView contentContainerStyle={styles.cwlContainer}>
                    <View style={styles.cwlHeader}>
                        <View style={styles.ubcLogoPlaceholder}>
                            <Text style={styles.ubcLogoText}>UBC</Text>
                        </View>
                        <Text style={styles.cwlTitle}>CWL Authentication</Text>
                        <Text style={styles.cwlSubtitle}>Login to continue to U-Pass BC Program at UBC</Text>
                    </View>

                    <View style={styles.cwlForm}>
                        <Text style={styles.inputLabel}>Login Name</Text>
                        <TextInput
                            style={styles.input}
                            value={loginName}
                            onChangeText={setLoginName}
                            placeholder="Enter your CWL login"
                            autoCapitalize="none"
                        />

                        <Text style={styles.inputLabel}>Password</Text>
                        <TextInput
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Enter your password"
                            secureTextEntry
                        />

                        <TouchableOpacity
                            style={[styles.cwlButton, loading && styles.cwlButtonLoading]}
                            onPress={handleLogin}
                            disabled={loading}
                        >
                            <Text style={styles.cwlButtonText}>
                                {loading ? 'Logging in, please wait...' : 'Login'}
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.cwlFooter}>
                            <Text style={styles.cwlFooterText}>
                                Recover your CWL login or Reset your CWL password via Email
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    };

    // Account Creation Step 1: Name & Pronouns
    const AccountStep1 = () => {
        const [firstName, setFirstName] = useState(userData.firstName);
        const [lastName, setLastName] = useState(userData.lastName);
        const [pronouns, setPronouns] = useState(userData.pronouns);

        const handleNext = () => {
            setUserData({ ...userData, firstName, lastName, pronouns });
            setCurrentPage('account-step2');
        };

        return (
            <SafeAreaView style={styles.whiteContainer}>
                <StatusBar barStyle="dark-content" />

                <TouchableOpacity
                    style={styles.backButtonWhite}
                    onPress={() => setCurrentPage('cwl-auth')}
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
                                style={[styles.pronounChip, pronouns === pronoun && styles.pronounChipSelected]}
                                onPress={() => setPronouns(pronoun)}
                            >
                                <Text style={[styles.pronounText, pronouns === pronoun && styles.pronounTextSelected]}>
                                    {pronoun}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity
                        style={[styles.nextButton, (!firstName || !lastName || !pronouns) && styles.nextButtonDisabled]}
                        onPress={handleNext}
                        disabled={!firstName || !lastName || !pronouns}
                    >
                        <Text style={styles.nextButtonText}>Next →</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    };

    // Account Creation Step 2: Username Picker
    const AccountStep2 = () => {
        const [username, setUsername] = useState(userData.username || generateUsername());

        const handleNext = () => {
            const animal = allNouns.find(noun => username.includes(noun));
            setUserData({
                ...userData,
                username,
                animal: animal || 'otter',
                pfp: animalEmojis[animal] || '🦦'
            });
            setCurrentPage('account-step3');
        };

        return (
            <SafeAreaView style={styles.whiteContainer}>
                <StatusBar barStyle="dark-content" />

                <TouchableOpacity
                    style={styles.backButtonWhite}
                    onPress={() => setCurrentPage('account-step1')}
                >
                    <Text style={styles.backArrowDark}>← Back</Text>
                </TouchableOpacity>

                <Text style={styles.progressText}>Step 2 of 4</Text>

                <View style={styles.accountStepContainer}>
                    <Text style={styles.stepTitle}>Your anonymous username</Text>
                    <Text style={styles.stepSubtitle}>We've generated a fun username for you!</Text>

                    <View style={styles.usernameDisplay}>
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
    };

    // Account Creation Step 3: Animal PFP
    const AccountStep3 = () => {
        const handleNext = () => {
            setCurrentPage('account-step4');
        };

        return (
            <SafeAreaView style={styles.whiteContainer}>
                <StatusBar barStyle="dark-content" />

                <TouchableOpacity
                    style={styles.backButtonWhite}
                    onPress={() => setCurrentPage('account-step2')}
                >
                    <Text style={styles.backArrowDark}>← Back</Text>
                </TouchableOpacity>

                <Text style={styles.progressText}>Step 3 of 4</Text>

                <View style={styles.accountStepContainer}>
                    <Text style={styles.stepTitle}>Your profile picture</Text>
                    <Text style={styles.stepSubtitle}>Based on your username: {userData.username}</Text>

                    <View style={styles.pfpDisplay}>
                        <Text style={styles.pfpEmoji}>{userData.pfp}</Text>
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
    };

    // Account Creation Step 4: Interests
    const AccountStep4 = () => {
        const [selectedInterests, setSelectedInterests] = useState(userData.interests);

        const toggleInterest = (interest) => {
            if (selectedInterests.includes(interest)) {
                setSelectedInterests(selectedInterests.filter(i => i !== interest));
            } else if (selectedInterests.length < 3) {
                setSelectedInterests([...selectedInterests, interest]);
            }
        };

        const handleFinish = () => {
            setUserData({ ...userData, interests: selectedInterests });
            setCurrentPage('home');
        };

        return (
            <SafeAreaView style={styles.whiteContainer}>
                <StatusBar barStyle="dark-content" />

                <TouchableOpacity
                    style={styles.backButtonWhite}
                    onPress={() => setCurrentPage('account-step3')}
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
    };

    // Home Page (Placeholder)
    const HomePage = () => (
        <SafeAreaView style={styles.whiteContainer}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.homeContainer}>
                <Text style={styles.homeTitle}>Welcome, {userData.username}! {userData.pfp}</Text>
                <Text style={styles.homeSubtitle}>Your account has been created</Text>

                <View style={styles.profileSummary}>
                    <Text style={styles.summaryText}>Name: {userData.firstName} {userData.lastName}</Text>
                    <Text style={styles.summaryText}>Pronouns: {userData.pronouns}</Text>
                    <Text style={styles.summaryText}>Interests: {userData.interests.join(', ')}</Text>
                </View>

                <Text style={styles.homeNote}>Home/Events page coming next! 🎉</Text>
            </View>
        </SafeAreaView>
    );

    // Render current page
    const renderPage = () => {
        switch (currentPage) {
            case 'welcome': return <WelcomePage />;
            case 'signin': return <SignInPage />;
            case 'cwl-auth': return <CWLAuthPage />;
            case 'account-step1': return <AccountStep1 />;
            case 'account-step2': return <AccountStep2 />;
            case 'account-step3': return <AccountStep3 />;
            case 'account-step4': return <AccountStep4 />;
            case 'home': return <HomePage />;
            default: return <WelcomePage />;
        }
    };

    return renderPage();
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    whiteContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    gradientCircleTopRight: {
        position: 'absolute',
        top: -100,
        right: -100,
        width: 300,
        height: 300,
        overflow: 'hidden',
    },
    gradientCircleBottomLeft: {
        position: 'absolute',
        bottom: -150,
        left: -100,
        width: 350,
        height: 350,
        overflow: 'hidden',
    },
    circle: {
        width: '100%',
        height: '100%',
        borderRadius: 200,
        opacity: 0.6,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
        zIndex: 1,
    },
    otterImage: {
        width: 120,
        height: 120,
        marginBottom: 20,
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
        marginBottom: 60,
    },
    question: {
        fontSize: 28,
        fontWeight: '600',
        color: '#D1C5FD',
        marginBottom: 8,
        textAlign: 'center',
    },
    subQuestion: {
        fontSize: 16,
        color: '#6B7280',
        marginBottom: 30,
    },
    buttonContainer: {
        width: '100%',
        marginBottom: 15,
    },
    button: {
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: '#D1C5FD',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 10,
    },
    backArrow: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '600',
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
    headerSection: {
        position: 'absolute',
        top: 80,
        alignItems: 'center',
    },
    signinOtterContainer: {
        marginBottom: 30,
    },
    otterImageSignin: {
        width: 150,
        height: 150,
    },
    welcomeBack: {
        fontSize: 32,
        fontWeight: '600',
        color: '#D1C5FD',
        marginBottom: 8,
    },
    signinSubtext: {
        fontSize: 16,
        color: '#6B7280',
        marginBottom: 40,
    },
    signinButtonContainer: {
        width: '100%',
    },
    signinButton: {
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: '#D1C5FD',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
        fontSize: 12,
        color: '#9CA3AF',
    },
    cwlContainer: {
        padding: 30,
        paddingTop: 20,
    },
    cwlHeader: {
        alignItems: 'center',
        marginBottom: 40,
    },
    ubcLogoPlaceholder: {
        width: 80,
        height: 80,
        backgroundColor: '#002145',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    ubcLogoText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '700',
    },
    cwlTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#002145',
        marginBottom: 10,
    },
    cwlSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
    },
    cwlForm: {
        width: '100%',
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
    cwlButton: {
        backgroundColor: '#002145',
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 30,
    },
    cwlButtonLoading: {
        backgroundColor: '#003366',
    },
    cwlButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    cwlFooter: {
        marginTop: 30,
        padding: 20,
        backgroundColor: '#E0F2FE',
        borderRadius: 12,
    },
    cwlFooterText: {
        fontSize: 13,
        color: '#0369A1',
        textAlign: 'center',
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
    usernameText: {
        fontSize: 32,
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
    pfpEmoji: {
        fontSize: 120,
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
    homeContainer: {
        flex: 1,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    homeTitle: {
        fontSize: 32,
        fontWeight: '700',
        color: '#000000',
        marginBottom: 10,
        textAlign: 'center',
    },
    homeSubtitle: {
        fontSize: 16,
        color: '#6B7280',
        marginBottom: 40,
    },
    profileSummary: {
        backgroundColor: '#F9FAFB',
        padding: 20,
        borderRadius: 15,
        width: '100%',
        marginBottom: 30,
    },
    summaryText: {
        fontSize: 14,
        color: '#374151',
        marginBottom: 8,
    },
    homeNote: {
        fontSize: 18,
        color: '#7C3AED',
        fontWeight: '600',
    },
});