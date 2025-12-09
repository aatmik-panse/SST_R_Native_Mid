import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARKS_KEY = 'news_bookmarks';

export const getBookmarks = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(BOOKMARKS_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error('Error reading bookmarks', e);
        return [];
    }
};

export const saveBookmark = async (article) => {
    try {
        const currentBookmarks = await getBookmarks();
        // Check if already exists
        if (!currentBookmarks.some(b => b.url === article.url)) {
            const newBookmarks = [...currentBookmarks, article];
            await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(newBookmarks));
            return true;
        }
        return false;
    } catch (e) {
        console.error('Error saving bookmark', e);
        return false;
    }
};

export const removeBookmark = async (url) => {
    try {
        const currentBookmarks = await getBookmarks();
        const newBookmarks = currentBookmarks.filter(b => b.url !== url);
        await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(newBookmarks));
        return true;
    } catch (e) {
        console.error('Error removing bookmark', e);
        return false;
    }
};

export const isBookmarked = async (url) => {
    try {
        const currentBookmarks = await getBookmarks();
        return currentBookmarks.some(b => b.url === url);
    } catch (e) {
        return false;
    }
};
