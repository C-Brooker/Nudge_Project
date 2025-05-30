# Nudge - Habit Tracker App

A full-stack habit tracking application built with React Native (Expo) frontend and NestJS backend.

## Prerequisites

Before running this project, make sure you have the following installed:

- **Docker Desktop** - [Download here](https://www.docker.com/products/docker-desktop/)
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **Yarn** package manager - [Install here](https://yarnpkg.com/getting-started/install)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/C-Brooker/Nudge_Project.git
cd <project-name>
```

### 2. Environment Configuration

#### Backend Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=habit_tracker
DB_USER=postgres
DB_PASSWORD=your_password

# API Keys
GEMINI_API_KEY=your_gemini_api_key (get from google)

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
REFRESH_JWT_SECRET=your_refresh_jwt_secret_key
```

#### Frontend Environment Variables

Create a `.env` file in the frontend directory with:

```env
EXPO_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Backend Setup

Navigate to the backend directory and start the services:

```bash
cd backend

# Start the database with Docker Compose
docker-compose up -d

# Install dependencies
npm install

# Run database migrations (if applicable)
npm run migration:run

# Start the development server
npm run start
```

The backend API will be available at `http://localhost:3000`

### 4. Frontend Setup

Navigate to the frontend directory and set up the Expo project:

```bash
cd frontend

# Install dependencies
npx expo install

# Start the Expo development server
npx expo start
```

### 5. Running the App

After starting both backend and frontend:

1. The Expo CLI will display a QR code in your terminal
2. Install the **Expo Go** app on your mobile device
3. Scan the QR code with the Expo Go app (iOS) or your camera app (Android)
4. The app will load on your device

## Docker Commands

### Database Management

```bash
# Start the database
docker-compose up -d

# Stop the database
docker-compose down

## Scripts

### Backend
- `npm run start` - Start development server
- `npm run build` - Build the application

### Frontend
- `npx expo start` - Start Expo development server
- `npx expo run:ios` - Run on iOS simulator
- `npx expo run:android` - Run on Android emulator
- `npx expo start --web` - Run in web browser

## Project Structure
├── backend/           # NestJS API server
├── frontend/          # React Native (Expo) app
├── backend/docker-compose.yml # Database configuration
└── README.md
*Based on how Expo Go works there could be connection issues, and so tunneling could help.

