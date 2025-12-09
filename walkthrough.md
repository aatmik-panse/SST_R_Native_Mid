# Newsee - Walkthrough

I have successfully built the **Newsee** app, selecting it as the fastest and most straightforward option from your list.

## 🚀 How to Run

1. **Navigate to the directory**:
   ```bash
   cd city-pulse
   ```

2. **Start the Development Server**:
   ```bash
   npx expo start
   ```
   - Press `i` to run on iOS Simulator (if available).
   - Press `a` to run on Android Emulator.
   - Scan the QR code with the **Expo Go** app on your physical device.

## 📱 Features Implemented

- **City Selector**: Choose from a list of major cities. Selection is saved purely locally.
- **News Feed**: Fetches latest news for the selected city using NewsAPI.org.
  - *Note*: Includes a fallback to "Mock Data" if the API key is missing or rate-limited.
- **Bookmarks**: Save articles to read later. Persists across app restarts.
- **Emergency Alerts**: A dedicated tab for critical city updates (currently using static demo data).
- **Article View**: Open full articles in an embedded WebView.

## ⚠️ Configuration

### API Key
The app is currently configured with a placeholder/demo API key in `src/services/newsApi.js`.
To get real data:
1. Get a free API key from [NewsAPI.org](https://newsapi.org/).
2. Open `src/services/newsApi.js`.
3. Replace `const API_KEY = '...'` with your new key.

## 📁 Project Structure

- `App.js`: Main entry point and Navigation setup.
- `src/screens`: All 5 screens (CitySelector, NewsFeed, Article, Bookmarks, Alerts).
- `src/components`: UI components (NewsCard).
- `src/context`: State management (CityContext).
- `src/services`: API handling.
- `src/utils`: Storage helpers.

## ✅ Checklist Completion
- [x] City-based news
- [x] WebView integration
- [x] Bookmark system
- [x] Emergency section
- [x] Pull-to-refresh
