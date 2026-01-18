import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomePage({ onNavigate }) {
    return (
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
                    source={require('../assets/images/OtterWelcome.png')}
                    style={styles.otterImage}
                    resizeMode="contain"
                />
                <Text style={styles.appName}>Ripple</Text>
                <Text style={styles.subtitle}>Small impacts, big changes</Text>
                <Text style={styles.question}>What brings you here?</Text>
                <Text style={styles.subQuestion}>Choose your journey</Text>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => onNavigate('signin')}
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
}

const styles = StyleSheet.create({
    container: {
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
    footer: {
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
        fontSize: 12,
        color: '#9CA3AF',
    },
});