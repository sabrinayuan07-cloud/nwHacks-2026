import React, { useState } from 'react';

// Import pages
import WelcomePage from './tabs/welcome';
import { SignInPage, CWLAuthPage } from './tabs/signIn';
import { AccountStep1, AccountStep2, AccountStep3, AccountStep4 } from './tabs/createAccount';
import HomePage from './tabs/homepage';
import { EventsListPage } from './tabs/events';
import Messages from './tabs/messages';
import ProfilePage from './tabs/profile';
import MeditationPage from './tabs/meditation';

export default function App() {
    console.log('🚀 Using UPDATED App.js with Events navigation');
    const [currentPage, setCurrentPage] = useState('welcome');
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        pronouns: '',
        username: '',
        animal: '',
        pfp: '',
        interests: [],
        program: '',
        year: ''
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
                return <HomePage onNavigate={handleNavigate} userData={userData} />;
            case 'events-list':
                return <EventsListPage onNavigate={handleNavigate} />;
            case 'event-details':
                return <EventsListPage onNavigate={handleNavigate} />;
            case 'messages':
                return <Messages onNavigate={handleNavigate} />;
            case 'profile':
                return <ProfilePage onNavigate={handleNavigate} userData={userData} onUpdateUserData={handleUpdateUserData} />;
            case 'meditation':
                return <MeditationPage onNavigate={handleNavigate} />;
            default:
                return <WelcomePage onNavigate={handleNavigate} />;
        }
    };

    return renderPage();
}