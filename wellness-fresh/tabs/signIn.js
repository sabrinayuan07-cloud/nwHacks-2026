import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export function SignInPage({ onNavigate }) {
    return (
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
                onPress={() => onNavigate('welcome')}
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
                        source={require('../assets/images/Signin.png')}
                        style={styles.otterImageSignin}
                        resizeMode="contain"
                    />
                </View>
                <Text style={styles.welcomeBack}>Welcome back!</Text>
                <Text style={styles.signinSubtext}>Sign in to continue</Text>
                <TouchableOpacity
                    style={styles.signinButtonContainer}
                    onPress={() => onNavigate('cwl-auth')}
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
}

export function CWLAuthPage({ onNavigate }) {
    const [loginName, setLoginName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true);
        setTimeout(() => {
            onNavigate('account-step1');
        }, 2000);
    };

    return (
        <SafeAreaView style={styles.whiteContainer}>
            <StatusBar barStyle="dark-content" />

            <TouchableOpacity
                style={styles.backButtonWhite}
                onPress={() => onNavigate('signin')}
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
});