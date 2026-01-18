import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView, SafeAreaView, Image, Modal, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BottomNav from './bottomNav';

// Expanded event data with more events
const allEventsData = [
    {
        id: 1,
        title: 'Connect & Craft',
        day: 'Wednesday',
        time: '6pm',
        type: 'in-person',
        image: require('../assets/images/EventsCraft.png'),
        color: ['#D1C5FD', '#CABDFD'],
        tags: ['creative', 'social', 'art'],
        description: 'Join us for a relaxing evening of crafting and connection. Bring your creativity and meet fellow students in a judgment-free space where we can unwind together.',
        fullDescription: 'Through hands-on activities and guided sharing, we\'ll explore questions like: What does creativity mean to you? When did stress become overwhelming? How do you want to feel in your daily life?\n\nThis isn\'t about being perfect or "fixing" yourself. It\'s about understanding your patterns, hearing others\' stories, and building healthier coping mechanisms—one small step at a time.',
        when: 'Wednesday at 6pm',
        arrivalNote: 'Please arrive at least 10 mins early',
        where: 'UBC Student Union Building Room 203',
        whatWeDo: 'We\'ll start by making simple crafts together (no pressure to be artistic—just enjoy the process).',
        availableSpots: '8/20',
        whatToExpect: [
            'Light icebreaker activity (20 mins)',
            'Guided sharing in small groups (25 mins)',
            'Creative craft challenge (30 mins)',
            'Optional reflection and goal-setting (15 mins)'
        ],
        whoShouldCome: 'Anyone looking to destress, meet new people, or explore creative outlets. All skill levels and experiences welcome.',
        whatToBring: 'Just yourself. We\'ll provide all materials and supplies. Come as you are.',
        facilitator: 'Sarah Chen - trained in art therapy and peer support'
    },
    {
        id: 2,
        title: 'Mindful Bites',
        day: 'Thursday',
        time: '5pm',
        type: 'in-person',
        image: require('../assets/images/EventsCooking.png'),
        color: ['#BFDBFE', '#DBEAFE'],
        tags: ['food', 'mindfulness', 'cooking'],
        description: 'Join us for a judgment-free space where we explore our relationships with food through cooking, conversation, and connection.',
        fullDescription: 'Through hands-on activities and guided sharing, we\'ll explore questions like: What does food mean to you? When did eating become stressful? How do you want to feel around food?\n\nThis isn\'t about meal plans or "fixing" your eating. It\'s about understanding your patterns, hearing others\' stories, and building a healthier relationship with food—one small step at a time.',
        when: 'Thursday at 5pm',
        arrivalNote: 'Please arrive at least 10 mins early',
        where: 'UBC Oak Collegium Kitchen',
        whatWeDo: 'We\'ll start by making simple snacks together (no pressure to eat what you make).',
        availableSpots: '5/20',
        whatToExpect: [
            'Light icebreaker activity (20 mins)',
            'Guided sharing in small groups (25 mins)',
            'Creative "recipe for food peace" challenge (30 mins)',
            'Optional reflection and goal-setting (15 mins)'
        ],
        whoShouldCome: 'Anyone struggling with eating patterns, food guilt, body image issues, emotional eating, or who just wants to feel more at peace around meals. All bodies, all experiences welcome.',
        whatToBring: 'Just yourself. We\'ll provide all materials and ingredients. Come as you are.',
        facilitator: 'Dr. Maya Patel - trained in eating disorder support and body-positive approaches'
    },
    {
        id: 3,
        title: 'Night Owl Network',
        day: 'Friday',
        time: '10pm',
        type: 'online',
        image: require('../assets/images/EventsStargaze.png'),
        color: ['#D1C5FD', '#CABDFD'],
        tags: ['support', 'online', 'night'],
        description: 'For the late-night thinkers and midnight worriers. Connect with others who understand what it\'s like when your mind won\'t quiet down.',
        fullDescription: 'This online space is for students who find themselves awake late at night, whether due to insomnia, anxiety, irregular schedules, or just being a night owl. Connect with others who get it.\n\nThrough gentle conversation and shared experiences, we create a supportive community for those navigating the quiet hours.',
        when: 'Friday at 10pm',
        arrivalNote: 'Join the Zoom link 5 mins early for technical check',
        where: 'Online via Zoom (link sent upon registration)',
        whatWeDo: 'We\'ll have casual conversation, optional guided meditation, and peer support in a relaxed virtual environment.',
        availableSpots: '12/25',
        whatToExpect: [
            'Casual check-in and introductions (15 mins)',
            'Open discussion on sleep, stress, and late-night thoughts (30 mins)',
            'Optional guided relaxation exercise (15 mins)',
            'Resource sharing and peer support (15 mins)'
        ],
        whoShouldCome: 'Anyone who struggles with sleep, experiences nighttime anxiety, or just wants connection during late hours. No judgment, just understanding.',
        whatToBring: 'Just yourself and maybe a cozy blanket. Cameras optional—participate however you\'re comfortable.',
        facilitator: 'Alex Kim - peer support specialist with lived experience in sleep anxiety'
    },
    {
        id: 4,
        title: 'Study Buddies',
        day: 'Monday',
        time: '2pm',
        type: 'in-person',
        image: require('../assets/images/EventsCraft.png'),
        color: ['#FED7AA', '#FDBA74'],
        tags: ['academic', 'study', 'productivity'],
        description: 'A supportive study session where we work together, share tips, and keep each other motivated.',
        fullDescription: 'Join fellow students for a focused study session in a supportive environment. Whether you\'re tackling assignments, preparing for exams, or working on projects, you\'ll find encouragement and accountability here.',
        when: 'Monday at 2pm',
        arrivalNote: 'Bring your laptop and study materials',
        where: 'Koerner Library Study Room 301',
        whatWeDo: 'We\'ll do focused study blocks with short breaks, share productivity tips, and support each other\'s academic goals.',
        availableSpots: '10/15',
        whatToExpect: [
            'Goal-setting for the session (10 mins)',
            'Focused study block 1 (45 mins)',
            'Break and social time (10 mins)',
            'Focused study block 2 (45 mins)',
            'Wrap-up and wins sharing (10 mins)'
        ],
        whoShouldCome: 'Any student looking for study motivation, accountability, or just company while working on academics.',
        whatToBring: 'Your study materials, laptop, headphones, and any snacks you need.',
        facilitator: 'Student volunteers - peer-led study group'
    },
    {
        id: 5,
        title: 'Morning Meditation',
        day: 'Tuesday',
        time: '8am',
        type: 'in-person',
        image: require('../assets/images/EventsStargaze.png'),
        color: ['#A7F3D0', '#6EE7B7'],
        tags: ['wellness', 'mindfulness', 'meditation'],
        description: 'Start your day with intention. Join us for guided meditation and mindful movement to set a calm, focused tone for your day.',
        fullDescription: 'This early morning session combines gentle stretching, breathing exercises, and guided meditation to help you begin your day feeling grounded and centered.',
        when: 'Tuesday at 8am',
        arrivalNote: 'Arrive 5 mins early to settle in',
        where: 'AMS Nest Room 2511',
        whatWeDo: 'Gentle movement, breathwork, and guided meditation to start your day mindfully.',
        availableSpots: '15/20',
        whatToExpect: [
            'Arrival and settling in (5 mins)',
            'Gentle stretching and movement (15 mins)',
            'Breathing exercises (10 mins)',
            'Guided meditation (20 mins)',
            'Silent reflection and closing (10 mins)'
        ],
        whoShouldCome: 'Anyone interested in meditation, mindfulness, or starting the day with intention. All experience levels welcome.',
        whatToBring: 'Comfortable clothes. Yoga mats provided, but bring your own if you prefer.',
        facilitator: 'Jamie Lee - certified meditation instructor'
    },
    {
        id: 6,
        title: 'Creative Writing Circle',
        day: 'Wednesday',
        time: '4pm',
        type: 'in-person',
        image: require('../assets/images/EventsCraft.png'),
        color: ['#C4B5FD', '#A78BFA'],
        tags: ['creative', 'writing', 'art'],
        description: 'A safe space to share your writing, get gentle feedback, and connect with fellow writers. All genres and skill levels welcome.',
        fullDescription: 'Whether you write poetry, fiction, personal essays, or just journal entries you\'d like to share, this circle is for you. We focus on supportive feedback and creative expression.',
        when: 'Wednesday at 4pm',
        arrivalNote: 'Bring something you\'d like to share (optional)',
        where: 'UBC Student Union Building Room 205',
        whatWeDo: 'Share writing, provide supportive feedback, do creative writing prompts, and celebrate each other\'s work.',
        availableSpots: '6/12',
        whatToExpect: [
            'Check-in and introductions (10 mins)',
            'Voluntary reading and sharing (30 mins)',
            'Supportive feedback session (20 mins)',
            'Creative prompt writing exercise (20 mins)',
            'Closing reflection (10 mins)'
        ],
        whoShouldCome: 'Anyone who writes or wants to start writing. All genres, styles, and experience levels welcome.',
        whatToBring: 'Something to write with and on. Optional: a piece of writing to share.',
        facilitator: 'Morgan Rivers - published author and peer writing mentor'
    },
    {
        id: 7,
        title: 'Game Night',
        day: 'Friday',
        time: '7pm',
        type: 'in-person',
        image: require('../assets/images/EventsCooking.png'),
        color: ['#FDE68A', '#FCD34D'],
        tags: ['social', 'games', 'fun'],
        description: 'Unwind after a long week with board games, card games, and good company. Low-key, low-pressure fun.',
        fullDescription: 'Join us for a relaxed evening of games and socializing. We have a variety of board games, card games, and party games. Come solo or bring friends!',
        when: 'Friday at 7pm',
        arrivalNote: 'Drop in anytime between 7-10pm',
        where: 'AMS Nest Student Space',
        whatWeDo: 'Play games, snack, chat, and decompress from the week in a relaxed social environment.',
        availableSpots: '20/30',
        whatToExpect: [
            'Open format - come and go as you please',
            'Multiple game stations running simultaneously',
            'Snacks and refreshments provided',
            'Mix of competitive and cooperative games',
            'Casual socializing and making new friends'
        ],
        whoShouldCome: 'Anyone looking for a fun, low-pressure social event. Gamers and non-gamers alike!',
        whatToBring: 'Just yourself! Feel free to bring your favorite game to share.',
        facilitator: 'Student volunteers - peer-organized social event'
    },
    {
        id: 8,
        title: 'Yoga & Stretch',
        day: 'Thursday',
        time: '12pm',
        type: 'in-person',
        image: require('../assets/images/EventsStargaze.png'),
        color: ['#FBCFE8', '#F9A8D4'],
        tags: ['wellness', 'fitness', 'yoga'],
        description: 'Midday movement break! Join us for gentle yoga and stretching to reset and recharge.',
        fullDescription: 'Take a break from studying or work with this accessible yoga and stretching session. Perfect for beginners or anyone needing to move their body.',
        when: 'Thursday at 12pm',
        arrivalNote: 'Wear comfortable clothes',
        where: 'UBC Recreation Centre Studio B',
        whatWeDo: 'Gentle yoga flows, stretching, and relaxation to help you reset mid-day.',
        availableSpots: '18/25',
        whatToExpect: [
            'Warm-up and centering (5 mins)',
            'Gentle yoga flow (25 mins)',
            'Targeted stretching (15 mins)',
            'Relaxation and cool-down (10 mins)',
            'Optional Q&A about movement and wellness (5 mins)'
        ],
        whoShouldCome: 'Anyone who wants to move their body, reduce stress, or take a study break. All fitness levels welcome.',
        whatToBring: 'Water bottle. Yoga mats provided.',
        facilitator: 'Taylor Kim - yoga instructor and wellness peer'
    }
];

export function EventsListPage({ onNavigate }) {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [joinedEventName, setJoinedEventName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all'); // 'all', 'in-person', 'online'
    const [joinedEvents, setJoinedEvents] = useState([]); // Track joined events
    const searchInputRef = useRef(null);

    // Filter events based on search and type (including description and whoShouldCome)
    const filteredEvents = allEventsData.filter(event => {
        const searchLower = searchQuery.toLowerCase().trim();
        const matchesSearch = searchQuery === '' ||
            event.title.toLowerCase().includes(searchLower) ||
            event.description.toLowerCase().includes(searchLower) ||
            event.fullDescription.toLowerCase().includes(searchLower) ||
            event.whoShouldCome.toLowerCase().includes(searchLower) ||
            event.day.toLowerCase().includes(searchLower) ||
            event.tags.some(tag => tag.toLowerCase().includes(searchLower));

        const matchesFilter = filterType === 'all' || event.type === filterType;

        return matchesSearch && matchesFilter;
    });

    const focusSearchInput = () => {
        searchInputRef.current?.focus();
    };

    const handleEventPress = (event) => {
        setSelectedEvent(event);
        onNavigate('event-details');
    };

    const handleBackToList = () => {
        setSelectedEvent(null);
        onNavigate('events-list');
    };

    const handleJoinEvent = () => {
        setJoinedEventName(selectedEvent.title);
        setJoinedEvents([...joinedEvents, selectedEvent.id]);
        setShowSuccessModal(true);
        setTimeout(() => {
            setShowSuccessModal(false);
            handleBackToList();
        }, 2000);
    };

    // Helper to get available spots (decreases by 1 if user joined)
    const getAvailableSpots = (event) => {
        const spots = event.availableSpots.split('/');
        const current = parseInt(spots[0]);
        const total = parseInt(spots[1]);
        if (joinedEvents.includes(event.id)) {
            return `${current + 1}/${total}`;
        }
        return event.availableSpots;
    };

    // Events List View
    if (!selectedEvent) {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />

                {/* Gradient circles background */}
                <View style={styles.gradientCircleTopRight}>
                    <View style={[styles.circle, { backgroundColor: '#E0E7FF', opacity: 0.5 }]} />
                </View>
                <View style={styles.gradientCircleBottomLeft}>
                    <View style={[styles.circle, { backgroundColor: '#E9D5FF', opacity: 0.5 }]} />
                </View>

                {/* Search bar */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <TextInput
                            ref={searchInputRef}
                            style={styles.searchInput}
                            placeholder="Search events..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholderTextColor="#9CA3AF"
                        />
                        <TouchableOpacity onPress={focusSearchInput}>
                            <Text style={styles.searchIcon}>🔍</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Filter buttons */}
                <View style={styles.filterContainer}>
                    <TouchableOpacity
                        style={[styles.filterButton, filterType === 'all' && styles.filterButtonActive]}
                        onPress={() => setFilterType('all')}
                    >
                        <Text style={[styles.filterText, filterType === 'all' && styles.filterTextActive]}>
                            All
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterButton, filterType === 'in-person' && styles.filterButtonActive]}
                        onPress={() => setFilterType('in-person')}
                    >
                        <Text style={[styles.filterText, filterType === 'in-person' && styles.filterTextActive]}>
                            In-Person
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterButton, filterType === 'online' && styles.filterButtonActive]}
                        onPress={() => setFilterType('online')}
                    >
                        <Text style={[styles.filterText, filterType === 'online' && styles.filterTextActive]}>
                            Online
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Events list */}
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.eventsContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {filteredEvents.length === 0 ? (
                        <View style={styles.noResultsContainer}>
                            <Text style={styles.noResultsText}>No events found</Text>
                            <Text style={styles.noResultsSubtext}>Try adjusting your search or filters</Text>
                        </View>
                    ) : (
                        filteredEvents.map((event) => (
                            <TouchableOpacity
                                key={event.id}
                                onPress={() => handleEventPress(event)}
                                activeOpacity={0.8}
                            >
                                <LinearGradient
                                    colors={event.color}
                                    style={styles.eventCard}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <View style={styles.eventContent}>
                                        <View style={styles.eventTextContainer}>
                                            <Text style={styles.eventTitle}>{event.title}</Text>
                                            <Text style={styles.eventTime}>{event.day} at {event.time}</Text>
                                        </View>
                                        <View style={styles.eventImageContainer}>
                                            <Image
                                                source={event.image}
                                                style={styles.eventImage}
                                                resizeMode="contain"
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.eventTypeTag}>
                                        <Text style={styles.eventTypeText}>{event.type}</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        ))
                    )}
                </ScrollView>

                {/* Fixed Bottom navigation */}
                <View style={styles.bottomNavContainer}>
                    <BottomNav currentPage="events-list" onNavigate={onNavigate} />
                </View>
            </View>
        );
    }

    // Event Details View
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header with back button */}
            <View style={styles.detailsHeader}>
                <TouchableOpacity onPress={handleBackToList} style={styles.backButton}>
                    <Text style={styles.backArrow}>← Event Details</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.detailsScrollView}
                contentContainerStyle={styles.detailsContent}
                showsVerticalScrollIndicator={true}
            >
                {/* Event title card */}
                <LinearGradient
                    colors={selectedEvent.color}
                    style={styles.detailsTitleCard}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Text style={styles.detailsTitle}>{selectedEvent.title}</Text>
                    <Text style={styles.detailsTime}>{selectedEvent.day} at {selectedEvent.time.replace('pm', '')}</Text>
                    <View style={styles.detailsTypeTag}>
                        <Text style={styles.detailsTypeText}>{selectedEvent.type}</Text>
                    </View>
                </LinearGradient>

                {/* Note box */}
                <View style={styles.noteBox}>
                    <Text style={styles.noteTitle}>Note to all attendees: </Text>
                    <Text style={styles.noteText}>
                        Please refrain yourself from using your phone during activities except in the case of an emergency.
                    </Text>
                </View>

                {/* About section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>About this event</Text>
                    <Text style={styles.sectionText}>{selectedEvent.description}</Text>
                    <Text style={styles.sectionText}>{selectedEvent.fullDescription}</Text>
                </View>

                {/* When section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>When</Text>
                    <Text style={styles.sectionText}>{selectedEvent.when}</Text>
                    <Text style={styles.sectionText}>{selectedEvent.arrivalNote}</Text>
                </View>

                {/* Where section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Where</Text>
                    <Text style={styles.sectionText}>{selectedEvent.where}</Text>
                </View>

                {/* What we'll do section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>What we'll do</Text>
                    <Text style={styles.sectionText}>{selectedEvent.whatWeDo}</Text>
                </View>

                {/* Available spots */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Available spots: {getAvailableSpots(selectedEvent)}</Text>
                </View>

                {/* Who should come */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Who should come:</Text>
                    <Text style={styles.sectionText}>{selectedEvent.whoShouldCome}</Text>
                </View>

                {/* What to expect */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>What to expect:</Text>
                    {selectedEvent.whatToExpect.map((item, index) => (
                        <Text key={index} style={styles.bulletText}>• {item}</Text>
                    ))}
                </View>

                {/* What to bring */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>What to bring:</Text>
                    <Text style={styles.sectionText}>{selectedEvent.whatToBring}</Text>
                </View>

                {/* Facilitator */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Facilitated by:</Text>
                    <Text style={styles.sectionText}>{selectedEvent.facilitator}</Text>
                </View>

                {/* Join button */}
                <TouchableOpacity
                    style={styles.joinButtonContainer}
                    onPress={handleJoinEvent}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={['#D1C5FD', '#CABDFD', '#BFDBFE']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        locations={[0, 0.4, 1]}
                        style={styles.joinButton}
                    >
                        <Text style={styles.joinButtonText}>Join Event</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </ScrollView>

            {/* Success Modal */}
            <Modal
                transparent={true}
                visible={showSuccessModal}
                animationType="fade"
            >
                <View style={styles.modalOverlay}>
                    <LinearGradient
                        colors={['#E9D5FF', '#DBEAFE']}
                        style={styles.successModalContent}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <Text style={styles.successModalTitle}>Successfully Joined!</Text>
                        <Text style={styles.successModalText}>You've joined {joinedEventName}</Text>
                    </LinearGradient>
                </View>
            </Modal>

            {/* Fixed Bottom navigation */}
            <View style={styles.bottomNavContainer}>
                <BottomNav currentPage="event-details" onNavigate={onNavigate} />
            </View>
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
        top: -150,
        right: -100,
        width: 350,
        height: 350,
        overflow: 'hidden',
    },
    gradientCircleBottomLeft: {
        position: 'absolute',
        bottom: 100,
        left: -150,
        width: 400,
        height: 400,
        overflow: 'hidden',
    },
    circle: {
        width: '100%',
        height: '100%',
        borderRadius: 200,
    },
    searchContainer: {
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 10,
        zIndex: 1,
    },
    searchBar: {
        backgroundColor: '#F3F4F6',
        borderRadius: 25,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    searchIcon: {
        fontSize: 18,
        marginLeft: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#000000',
    },
    filterContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingBottom: 10,
        gap: 10,
    },
    filterButton: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        backgroundColor: '#FFFFFF',
    },
    filterButtonActive: {
        backgroundColor: '#7C3AED',
        borderColor: '#7C3AED',
    },
    filterText: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
    },
    filterTextActive: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    scrollView: {
        flex: 1,
        zIndex: 1,
    },
    eventsContainer: {
        padding: 20,
        paddingBottom: 120, // Extra padding for fixed bottom nav
    },
    bottomNavContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    noResultsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    noResultsText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#6B7280',
        marginBottom: 8,
    },
    noResultsSubtext: {
        fontSize: 14,
        color: '#9CA3AF',
    },
    eventCard: {
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        minHeight: 150,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    eventContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    eventTextContainer: {
        flex: 1,
    },
    eventTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    eventTime: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: '500',
    },
    eventImageContainer: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    eventImage: {
        width: '100%',
        height: '100%',
    },
    eventTypeTag: {
        position: 'absolute',
        top: 15,
        right: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
    },
    eventTypeText: {
        fontSize: 12,
        color: '#7C3AED',
        fontWeight: '600',
    },
    // Event Details Styles
    detailsHeader: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backArrow: {
        fontSize: 18,
        color: '#000000',
        fontWeight: '600',
    },
    detailsScrollView: {
        flex: 1,
    },
    detailsContent: {
        padding: 20,
        paddingBottom: 120,
    },
    detailsTitleCard: {
        borderRadius: 20,
        padding: 25,
        marginBottom: 20,
        position: 'relative',
    },
    detailsTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    detailsTime: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: '500',
    },
    detailsTypeTag: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 15,
    },
    detailsTypeText: {
        fontSize: 13,
        color: '#7C3AED',
        fontWeight: '600',
    },
    noteBox: {
        backgroundColor: '#E0E7FF',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
    },
    noteTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 5,
    },
    noteText: {
        fontSize: 15,
        color: '#1E293B',
        lineHeight: 22,
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 10,
    },
    sectionText: {
        fontSize: 15,
        color: '#475569',
        lineHeight: 24,
        marginBottom: 8,
    },
    bulletText: {
        fontSize: 15,
        color: '#475569',
        lineHeight: 24,
        marginBottom: 5,
    },
    joinButtonContainer: {
        marginTop: 20,
        marginBottom: 20,
    },
    joinButton: {
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: '#D1C5FD',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    joinButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    successModalContent: {
        borderRadius: 25,
        padding: 35,
        alignItems: 'center',
        width: '80%',
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 10,
    },
    successModalTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#7C3AED',
        marginBottom: 10,
    },
    successModalText: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
    },
});