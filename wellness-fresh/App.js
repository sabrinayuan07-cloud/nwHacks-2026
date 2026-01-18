import HomePage from './tabs/homepage';
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';

// Import pages
import WelcomePage from './tabs/welcome';
import { SignInPage, CWLAuthPage } from './tabs/signIn';
import { AccountStep1, AccountStep2, AccountStep3, AccountStep4 } from './tabs/createAccount';

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

    const handleNavigate = (page) => {
        setCurrentPage(page);
    };

    const handleUpdateUserData = (newData) => {
        setUserData({ ...userData, ...newData });
    };

    // Render current page
    const renderPage = () => {
        switch (currentPage) {
            case 'welcome':
                return <WelcomePage onNavigate={handleNavigate} />;
            case 'signin':
                return <SignInPage onNavigate={handleNavigate} />;
            case 'cwl-auth':
                return <CWLAuthPage onNavigate={handleNavigate} />;
            case 'account-step1':
                return <AccountStep1 onNavigate={handleNavigate} userData={userData} onUpdateUserData={handleUpdateUserData} />;
            case 'account-step2':
                return <AccountStep2 onNavigate={handleNavigate} userData={userData} onUpdateUserData={handleUpdateUserData} />;
            case 'account-step3':
                return <AccountStep3 onNavigate={handleNavigate} userData={userData} />;
            case 'account-step4':
                return <AccountStep4 onNavigate={handleNavigate} userData={userData} onUpdateUserData={handleUpdateUserData} />;
            case 'home':
                return <HomePage />;
            default:
                return <WelcomePage onNavigate={handleNavigate} />;
        }
    };

    return renderPage();
}

const styles = StyleSheet.create({
    whiteContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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