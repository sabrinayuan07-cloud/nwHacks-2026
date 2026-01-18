import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
    const [currentPage, setCurrentPage] = useState('welcome'); // 'welcome' or 'signin'

    // Welcome Page Component
    const WelcomePage = () => (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Gradient Circles - Top Right */}
            <View style={styles.gradientCircleTopRight}>
                <LinearGradient
                    colors={['#BFDBFE', '#DBEAFE']}
                    style={styles.circle}
                />
            </View>

            {/* Gradient Circles - Bottom Left */}
            <View style={styles.gradientCircleBottomLeft}>
                <LinearGradient
                    colors={['#D1C5FD', '#CABDFD']}
                    style={styles.circle}
                />
            </View>

            {/* Content */}
            <View style={styles.content}>
                {/* Otter Image */}
                <Image
                    source={require('./otter_images/OtterWelcome.png')}
                    style={styles.otterImage}
                    resizeMode="contain"
                />

                {/* App Name */}
                <Text style={styles.appName}>RedBull</Text>
                <Text style={styles.subtitle}>Your UBC wellness community</Text>

                {/* Main Question */}
                <Text style={styles.question}>What brings you here?</Text>
                <Text style={styles.subQuestion}>Choose your journey</Text>

                {/* Buttons */}
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

                <TouchableOpacity
                    style={styles.buttonContainer}
                    activeOpacity={0.5}
                >
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

            {/* Footer */}
            <Text style={styles.footer}>Built by student, for students.</Text>
        </View>
    );

    // Sign In Page Component
    const SignInPage = () => (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Gradient Circles - Top Right */}
            <View style={styles.gradientCircleTopRight}>
                <LinearGradient
                    colors={['#BFDBFE', '#DBEAFE']}
                    style={styles.circle}
                />
            </View>

            {/* Gradient Circles - Bottom Left */}
            <View style={styles.gradientCircleBottomLeft}>
                <LinearGradient
                    colors={['#D1C5FD', '#CABDFD']}
                    style={styles.circle}
                />
            </View>

            {/* Content */}
            <View style={styles.content}>
                {/* App Name at Top */}
                <View style={styles.headerSection}>
                    <Text style={styles.appName}>RedBull</Text>
                    <Text style={styles.subtitle}>Your UBC wellness community</Text>
                </View>

                {/* Otter Image - Center */}
                <View style={styles.signinOtterContainer}>
                    <Image
                        source={require('./otter_images/Signin.png')}
                        style={styles.otterImageSignin}
                        resizeMode="contain"
                    />
                </View>

                {/* Welcome Back Text */}
                <Text style={styles.welcomeBack}>Welcome back!</Text>
                <Text style={styles.signinSubtext}>Sign in to continue</Text>

                {/* Sign In Button */}
                <TouchableOpacity
                    style={styles.signinButtonContainer}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={['#D1C5FD', '#CABDFD', '#BFDBFE']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        locations={[0, 0.4, 1]}
                        style={styles.signinButton}
                    >
                        <Text style={styles.buttonText}>Continue with cwl</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

            {/* Footer */}
            <Text style={styles.footer}>Built by student, for students.</Text>
        </View>
    );

    // Render the current page
    return currentPage === 'welcome' ? <WelcomePage /> : <SignInPage />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    // Gradient Circles
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

    // Content Container
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
        zIndex: 1,
    },

    // Welcome Page Styles
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
        fontFamily: 'System',
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

    // Sign In Page Styles
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

    // Footer
    footer: {
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
        fontSize: 12,
        color: '#9CA3AF',
    },
});