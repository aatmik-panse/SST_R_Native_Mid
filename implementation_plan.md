# Newsee - Implementation Plan

## Goal
Build a smart city news and alerts app called **Newsee**.
The app will allow users to select a city, view news relevant to that city, bookmark articles, and view emergency alerts.

## Architecture
**Tech Stack**: React Native (Expo), React Navigation, Axios, AsyncStorage.

### Navigation Structure
- **Root Stack Navigator**
  - `CitySelection`: Initial screen to pick a city.
  - `MainTabs`: Bottom Tab Navigator (News, Bookmarks, Alerts).
  - `ArticleDetails`: Modal/Stack screen for WebView.

### Data Flow
1. **City Context/Storage**: Store selected city in AsyncStorage + Context API so it persists and is accessible.
2. **News Data**: Fetch from NewsAPI.org based on the selected city.
3. **Bookmarks**: Store generic article objects in AsyncStorage.

## Components & Screens

### [src/screens]
- `CitySelectorScreen.js`: simple list/picker of cities (e.g., New York, London, Tokyo, Delhi, Sydney). Saves selection and navigates to MainTabs.
- `NewsFeedScreen.js`: Fetches news using Axios. Displays `FlatList` of `NewsCard`. Pull-to-refresh.
- `NewsWebViewScreen.js`: Renders `WebView` for the article URL.
- `BookmarksScreen.js`: Loads saved articles from AsyncStorage.
- `EmergencyAlertsScreen.js`: Static JSON list of emergency alerts.

### [src/components]
- `NewsCard.js`: UI component to display article image, title, and description.

### [src/services]
- `newsApi.js`: Axios setup for NewsAPI.org.
- `storage.js`: Helper functions for Bookmarks (`saveBookmark`, `getBookmarks`, `removeBookmark`).

### [src/context]
- `CityContext.js`: To manage the currently selected city state across screens.

## API Integration
**Endpoint**: `https://newsapi.org/v2/everything`
**Params**: `q={CityName}`, `apiKey={API_KEY}`
**Fallback**: If API fails (due to key limits), show mock data for demonstration.

## Verification
- Verify City Selection persists.
- Verify News Fetching works (or falls back to mock).
- Verify Bookmarking (Add/Remove).
- Verify WebView loading.
