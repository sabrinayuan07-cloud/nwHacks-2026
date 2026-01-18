import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    ActivityIndicator,
    Alert,
    Image,
    Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

// Replace with your ElevenLabs API key
const ELEVENLABS_API_KEY = 'sk_2b0019acf648c780f89dbda7a084f2d10618a395ecf3eaef';

// Available voices from ElevenLabs (includes male & female options)
const voices = [
    {
        id: 'EXAVITQu4vr4xnSDxMaL',
        name: 'Sarah',
        description: 'Soft & Calming',
        gender: 'female',
        avatar: require('../assets/images/FemaleOtter1.png')
    },
    {
        id: '21m00Tcm4TlvDq8ikWAM',
        name: 'Rachel',
        description: 'Warm & Gentle',
        gender: 'female',
        avatar: require('../assets/images/FemaleOtter2.png')
    },
    {
        id: 'TxGEqnHWrfWFTfGW9XjX',
        name: 'Josh',
        description: 'Deep & Warm',
        gender: 'male',
        avatar: require('../assets/images/MaleOtter1.png')
    },
    {
        id: 'ErXwobaYiN019PkySvjV',
        name: 'Antoni',
        description: 'Calm & Smooth',
        gender: 'male',
        avatar: require('../assets/images/MaleOtter2.png')
    },
    {
        id: 'pNInz6obpgDQGcFmaJgB',
        name: 'Adam',
        description: 'Deep & Grounding',
        gender: 'male',
        avatar: require('../assets/images/MaleOtter3.png')
    },
];

// Meditation scripts (shortened for faster loading)
const meditations = [
    {
        id: 1,
        title: 'Breathing Exercise',
        duration: '1 min',
        description: 'A simple breathing exercise to calm your mind',
        script: `Welcome. Find a comfortable position and gently close your eyes.

Take a deep breath in for four counts. One, two, three, four. Hold for four counts. One, two, three, four. Slowly exhale for four counts. One, two, three, four.

Let's repeat. Breathe in deeply. One, two, three, four. Hold gently. One, two, three, four. And release. One, two, three, four.

One more time. Deep breath in. Hold this peace within you. And slowly release any tension.

Notice how your body feels now. Carry this calm with you. When you're ready, gently open your eyes.`
    },
    {
        id: 2,
        title: 'Body Scan',
        duration: '1 min',
        description: 'Release tension throughout your body',
        script: `Get comfortable and close your eyes.

Bring attention to your feet. Let any tension melt away. Move up to your legs. Allow them to feel heavy and relaxed.

Notice your back and shoulders. Let them soften. Release any tension in your neck and face.

Feel your whole body, calm and at peace. You are safe. You are present. You are enough.

When you're ready, wiggle your fingers and toes, and gently open your eyes.`
    },
    {
        id: 3,
        title: 'Gratitude Moment',
        duration: '1 min',
        description: 'Cultivate appreciation and positivity',
        script: `Take a deep breath and settle into this moment.

Think of one thing you're grateful for today. Hold this in your mind. Feel the warmth of appreciation in your heart.

Now think of something about yourself that you're grateful for. Maybe it's your resilience, your kindness, or simply that you showed up today.

Breathe in this self-appreciation. You deserve kindness, especially from yourself.

Carry this grateful heart with you. You have so much to appreciate, including yourself.`
    }
];

export default function MeditationPage({ onNavigate }) {
    const [selectedVoice, setSelectedVoice] = useState(voices[0]);
    const [selectedMeditation, setSelectedMeditation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState(null);

    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [sound]);

    const generateAndPlayMeditation = async (meditation) => {
        if (ELEVENLABS_API_KEY === 'YOUR_API_KEY_HERE') {
            Alert.alert(
                'API Key Required',
                'Please add your ElevenLabs API key in meditation.js',
                [{ text: 'OK' }]
            );
            return;
        }

        setIsLoading(true);
        setSelectedMeditation(meditation);

        try {
            // Stop any currently playing audio
            if (sound) {
                await sound.unloadAsync();
            }

            // Call ElevenLabs API
            const response = await fetch(
                `https://api.elevenlabs.io/v1/text-to-speech/${selectedVoice.id}`,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'audio/mpeg',
                        'Content-Type': 'application/json',
                        'xi-api-key': ELEVENLABS_API_KEY,
                    },
                    body: JSON.stringify({
                        text: meditation.script,
                        model_id: 'eleven_turbo_v2',
                        voice_settings: {
                            stability: 0.7,
                            similarity_boost: 0.8,
                        },
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to generate audio');
            }

            // Convert response to blob and create URI
            const blob = await response.blob();
            const reader = new FileReader();

            reader.onloadend = async () => {
                const base64data = reader.result.split(',')[1];
                const uri = `data:audio/mpeg;base64,${base64data}`;

                // Play the audio
                const { sound: newSound } = await Audio.Sound.createAsync(
                    { uri },
                    { shouldPlay: true }
                );

                setSound(newSound);
                setIsPlaying(true);
                setIsLoading(false);

                // Handle playback status
                newSound.setOnPlaybackStatusUpdate((status) => {
                    if (status.didJustFinish) {
                        setIsPlaying(false);
                    }
                });
            };

            reader.readAsDataURL(blob);

        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Failed to generate meditation audio. Please try again.');
            setIsLoading(false);
        }
    };

    const stopMeditation = async () => {
        if (sound) {
            await sound.stopAsync();
            setIsPlaying(false);
        }
    };

    const pauseResumeMeditation = async () => {
        if (sound) {
            const status = await sound.getStatusAsync();
            if (status.isPlaying) {
                await sound.pauseAsync();
                setIsPlaying(false);
            } else {
                await sound.playAsync();
                setIsPlaying(true);
            }
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

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => onNavigate('home')} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Guided Meditation</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Voice Selection */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Choose a Voice</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {voices.map((voice) => (
                            <TouchableOpacity
                                key={voice.id}
                                onPress={() => setSelectedVoice(voice)}
                                style={[
                                    styles.voiceCard,
                                    selectedVoice.id === voice.id && styles.voiceCardSelected
                                ]}
                            >
                                <LinearGradient
                                    colors={selectedVoice.id === voice.id
                                        ? ['#D1C5FD', '#BFDBFE']
                                        : ['#F9FAFB', '#F3F4F6']}
                                    style={styles.voiceCardGradient}
                                >
                                    <View style={styles.avatarContainer}>
                                        <Image
                                            source={voice.avatar}
                                            style={styles.avatarImage}
                                            resizeMode="cover"
                                            fadeDuration={0}
                                        />
                                    </View>
                                    <Text style={[
                                        styles.voiceName,
                                        selectedVoice.id === voice.id && styles.voiceNameSelected
                                    ]}>
                                        {voice.name}
                                    </Text>
                                    <Text style={[
                                        styles.voiceDescription,
                                        selectedVoice.id === voice.id && styles.voiceDescriptionSelected
                                    ]}>
                                        {voice.description}
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Meditation Options */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Meditations</Text>
                    {meditations.map((meditation) => (
                        <TouchableOpacity
                            key={meditation.id}
                            onPress={() => generateAndPlayMeditation(meditation)}
                            disabled={isLoading}
                            style={styles.meditationCard}
                        >
                            <LinearGradient
                                colors={['#F5F3FF', '#EEF2FF']}
                                style={styles.meditationCardGradient}
                            >
                                <View style={styles.meditationInfo}>
                                    <Text style={styles.meditationTitle}>{meditation.title}</Text>
                                    <Text style={styles.meditationDescription}>{meditation.description}</Text>
                                    <Text style={styles.meditationDuration}>{meditation.duration}</Text>
                                </View>
                                <View style={styles.playButton}>
                                    {isLoading && selectedMeditation?.id === meditation.id ? (
                                        <ActivityIndicator color="#7C3AED" />
                                    ) : (
                                        <Ionicons name="play-circle" size={44} color="#7C3AED" />
                                    )}
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Now Playing Section */}
                {(isPlaying || (sound && selectedMeditation)) && (
                    <View style={styles.nowPlayingSection}>
                        <LinearGradient
                            colors={['#D1C5FD', '#BFDBFE']}
                            style={styles.nowPlayingCard}
                        >
                            <Text style={styles.nowPlayingLabel}>Now Playing</Text>
                            <Text style={styles.nowPlayingTitle}>{selectedMeditation?.title}</Text>
                            <Text style={styles.nowPlayingVoice}>Voice: {selectedVoice.name}</Text>

                            <View style={styles.controlsRow}>
                                <TouchableOpacity onPress={pauseResumeMeditation} style={styles.controlButton}>
                                    <Ionicons
                                        name={isPlaying ? "pause-circle" : "play-circle"}
                                        size={56}
                                        color="#FFFFFF"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={stopMeditation} style={styles.controlButton}>
                                    <Ionicons name="stop-circle" size={56} color="#FFFFFF" />
                                </TouchableOpacity>
                            </View>
                        </LinearGradient>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
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
        bottom: 100,
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        zIndex: 1,
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000000',
    },
    scrollView: {
        flex: 1,
        zIndex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#374151',
        marginBottom: 15,
    },
    voiceCard: {
        marginRight: 12,
        borderRadius: 16,
        overflow: 'hidden',
    },
    voiceCardSelected: {
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    voiceCardGradient: {
        padding: 16,
        alignItems: 'center',
        width: 110,
        borderRadius: 16,
    },
    avatarContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
        backgroundColor: '#E5E7EB',
        marginBottom: 8,
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    voiceName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginTop: 8,
    },
    voiceNameSelected: {
        color: '#FFFFFF',
    },
    voiceDescription: {
        fontSize: 11,
        color: '#9CA3AF',
        marginTop: 4,
        textAlign: 'center',
    },
    voiceDescriptionSelected: {
        color: '#F3E8FF',
    },
    meditationCard: {
        marginBottom: 12,
        borderRadius: 20,
        overflow: 'hidden',
    },
    meditationCardGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 20,
    },
    meditationInfo: {
        flex: 1,
    },
    meditationTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 4,
    },
    meditationDescription: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 6,
    },
    meditationDuration: {
        fontSize: 12,
        color: '#7C3AED',
        fontWeight: '600',
    },
    playButton: {
        marginLeft: 15,
    },
    nowPlayingSection: {
        marginTop: 10,
    },
    nowPlayingCard: {
        borderRadius: 25,
        padding: 25,
        alignItems: 'center',
    },
    nowPlayingLabel: {
        fontSize: 12,
        color: '#F3E8FF',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    nowPlayingTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#FFFFFF',
        marginTop: 8,
    },
    nowPlayingVoice: {
        fontSize: 14,
        color: '#F3E8FF',
        marginTop: 4,
    },
    controlsRow: {
        flexDirection: 'row',
        marginTop: 20,
        gap: 20,
    },
    controlButton: {
        padding: 5,
    },
});