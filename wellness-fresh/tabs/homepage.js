import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  Image 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomePage({ userData, onNavigate }) {
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

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.appName}>Name</Text>
            <Text style={styles.subtitle}>Your UBC wellness community</Text>
          </View>
          <TouchableOpacity style={styles.notificationIcon}>
            <Text style={styles.bellIcon}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Otter Mascot with Speech Bubble */}
        <View style={styles.mascotSection}>
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>Hey there!</Text>
          </View>
          <Image 
            source={require('../assets/images/OtterWelcome.png')}
            style={styles.otterImage}
            resizeMode="contain"
          />
        </View>

        {/* Encouragement Message Card */}
        <View style={styles.messageCard}>
          <LinearGradient
            colors={['#D1C5FD40', '#BFDBFE40']}
            style={styles.messageCardGradient}
          >
            <Text style={styles.messageText}>
              "Remember, progress isn't always visible. Trust the process."
            </Text>
          </LinearGradient>
        </View>

        {/* Share Encouragement Button */}
        <TouchableOpacity style={styles.shareButton}>
          <LinearGradient
            colors={['#D1C5FD', '#CABDFD', '#BFDBFE']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            locations={[0, 0.4, 1]}
            style={styles.shareButtonGradient}
          >
            <Text style={styles.shareButtonText}>
              Share your own words{'\n'}of encouragement!
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <View style={styles.navIconActive}>
              <Text style={styles.navIcon}>🏠</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem}>
            <View style={styles.navIconInactive}>
              <Text style={styles.navIcon}>📅</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem}>
            <View style={styles.navIconInactive}>
              <Text style={styles.navIcon}>💬</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem}>
            <View style={styles.navIconInactive}>
              <Text style={styles.navIcon}>👤</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingTop: 60,
    paddingBottom: 120,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
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
  },
  notificationIcon: {
    padding: 5,
  },
  bellIcon: {
    fontSize: 24,
  },

  // Mascot Section
  mascotSection: {
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  speechBubble: {
    backgroundColor: '#D1C5FD',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 50,
    marginBottom: -20,
    zIndex: 1,
  },
  speechText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  otterImage: {
    width: 200,
    height: 200,
    zIndex: 0,
  },

  // Message Card
  messageCard: {
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 20,
  },
  messageCardGradient: {
    padding: 30,
    borderRadius: 25,
  },
  messageText: {
    fontSize: 18,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '500',
  },

  // Share Button
  shareButton: {
    marginBottom: 30,
    shadowColor: '#D1C5FD',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  shareButtonGradient: {
    paddingVertical: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 24,
  },

  // Bottom Navigation
  bottomNav: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  navItem: {
    alignItems: 'center',
  },
  navIconActive: {
    backgroundColor: '#D1C5FD20',
    padding: 10,
    borderRadius: 15,
  },
  navIconInactive: {
    padding: 10,
  },
  navIcon: {
    fontSize: 24,
  },
});