# 🚛 TruckTech AI Advisor
TruckTech is an AI-powered assistant designed to support truck drivers and logistics professionals with essential tools for daily operations. Built using Node.js, Express, HTML, CSS, JavaScript, and Bootstrap, the application includes a feature-rich front-end and a backend API integrated with OpenAI to deliver smart responses for trucking-related inquiries.

truck-ai-advisor/
├── public/
│   ├── index.html              # Main HTML interface
│   ├── css/style.css           # Custom styling
│   ├── js/script.js            # Frontend logic and API interaction
│   └── images/                 # Branding/logo
├── server.js                   # Express server handling API routes
├── api/
│   └── chat.js                 # API route for OpenAI integration
├── .env                        # Environment variables (API keys, etc.)
├── package.json                # Project dependencies and scripts
└── README.md                   # Project documentation

# 🚀 Getting Started
Prerequisites
Node.js (v18+ recommended)

OpenAI API Key

# Setup Instructions
## 1. Clone the repository
git clone https://github.com/yourusername/truck-ai-advisor.git
cd truck-ai-advisor

npm install

## 2. Install dependencies
npm install

## Add your API key
Create a .env file in the root directory and add:
OPENAI_API_KEY=your_api_key_here

## Run the app
Run the app

Open http://localhost:3000 in your browser.

# 🧠 Features
## AI Chat Assistant
Type in trucking-related questions to receive intelligent responses powered by OpenAI.

## Pre-Trip Planner
Select a U.S. state and get localized pre-trip inspection plans based on DOT requirements.

## Quick Examples
Click predefined questions for instant insight without typing.

## Light/Dark Mode Toggle
Accessible UI for day and night use with a theme switcher.

# 🔌 API Integration
The backend utilizes the /api/chat route to interact with OpenAI's Chat Completion API. Here's an outline of the advanced technique:

- POST /api/chat
- Request Body: { message: "..." }
- Response: { reply: "..." }

This is implemented using node-fetch and Express middleware, with environmental security via .env

# 📊 Capabilities & Limitations
## ✅ Capabilities
Provides accurate AI-generated insights for common trucking tasks.

Includes pre-trip planning tailored by U.S. state.

Lightweight, responsive, and easy to deploy.

## ❌ Limitations
Relies on OpenAI API availability and quota.

No data persistence or user accounts (stateless app).

Pre-trip data is statically fetched (no real-time government API).

# 🔮 Future Improvements
Add driver profiles for saving preferences or routes.

Implement real-time traffic or DOT updates via external APIs.

Add mobile responsiveness enhancements and accessibility improvements.

Build a maintenance planner or load calculator using AI integration.

Language translation system

