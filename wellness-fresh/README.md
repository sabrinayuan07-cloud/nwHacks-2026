# Ripple

A wellness community app built for students at UBC. This is our hackathon project for nwHacks 2026.

**Why Ripple?** Small impacts make big changes. Just like our mascot the otter - one small action can ripple out and create meaningful connections. We built this because we believe in the power of small moments to make a big difference in someone's day.

## What It Does

So basically, we wanted to make something that actually helps students. College can be rough - there's a lot of pressure, stress, and sometimes it feels like you're just going through the motions alone. We built Wellness Fresh to create a space where students can connect with each other around wellness activities and support.

The app lets you:
- Join wellness events (everything from cooking workshops to meditation sessions)
- Chat with other students anonymously or reveal your identity when you're comfortable
- Create a profile that can be completely anonymous or public
- Share encouragement messages with the community
- Browse upcoming events and find ones that match your interests

## Tech Stack

- React Native with Expo (because we wanted it to work on both iOS and Android without too much hassle)
- Expo Router for navigation
- Linear gradients for the aesthetic (we tried to make it look friendly and approachable)

## Getting Started

First, make sure you have Node.js installed. Then:

```bash
npm install
npm start
```

This'll start the Expo dev server. From there you can:
- Press `i` to open in iOS simulator
- Press `a` to open in Android emulator
- Scan the QR code with Expo Go on your phone

## Project Structure

```
wellness-fresh/
├── tabs/
│   ├── homepage.js       # Main feed with community messages
│   ├── events.js         # Browse and join events
│   ├── messages.js       # Chat with other students
│   ├── profile.js        # User profile (anonymous or public)
│   ├── meditation.js     # Guided meditation feature
│   ├── signIn.js         # Login flow
│   └── createAccount.js  # Account creation steps
└── App.js                # Main app router
```

## Features We Built

### Anonymous Profiles
Your profile can be completely anonymous with a randomly generated username (like "happy-calm-otter" - we love our otter mascot!). Or you can reveal your real name and add your program/year if you want.

### Events
Browse wellness events around campus. Filter by type (in-person vs online) and facilitator type (AI-guided, human-led, or hybrid). Each event has all the details you need - when, where, what to expect, and how many spots are available.

### Messaging
Chat with other students you've met at events. You can choose to stay anonymous or reveal your real name when you're ready.

### Community Feed
Share encouraging messages anonymously with other students. Sometimes we all need a reminder that we're not alone in this.

## Current Limitations

This was built during a hackathon, so there's definitely stuff we'd want to improve:
- Right now all the data is hardcoded - no backend yet
- Event registration doesn't actually persist anywhere
- Messages are stored locally only
- No actual authentication with UBC CWL (just a mock flow)

But it works for a demo! And the structure is there if someone wants to build it out more.

## Contributors

Built by students, for students. Made with way too much coffee and way too little sleep.

## License

We're still figuring this out. For now, use it however you want.
