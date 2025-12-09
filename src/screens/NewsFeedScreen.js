import React, { useContext, useEffect, useState, useCallback } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text, RefreshControl } from 'react-native';
import { CityContext } from '../context/CityContext';
import { fetchNewsByCity } from '../services/newsApi';
import NewsCard from '../components/NewsCard';
import { saveBookmark, removeBookmark, getBookmarks } from '../utils/storage';
import { useFocusEffect } from '@react-navigation/native';

const NewsFeedScreen = ({ navigation }) => {
    const { city } = useContext(CityContext);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [bookmarkedUrls, setBookmarkedUrls] = useState(new Set());

    useEffect(() => {
        if (city) {
            loadNews();
        }
    }, [city]);

    useFocusEffect(
        useCallback(() => {
            loadBookmarks();
        }, [])
    );

    const loadBookmarks = async () => {
        const saved = await getBookmarks();
        setBookmarkedUrls(new Set(saved.map(a => a.url)));
    };

    const loadNews = async () => {
        setLoading(true);
        const data = await fetchNewsByCity(city);
        setArticles(data);
        setLoading(false);
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadNews();
        setRefreshing(false);
    };

    const handleBookmark = async (article) => {
        if (bookmarkedUrls.has(article.url)) {
            await removeBookmark(article.url);
            const newSet = new Set(bookmarkedUrls);
            newSet.delete(article.url);
            setBookmarkedUrls(newSet);
        } else {
            await saveBookmark(article);
            setBookmarkedUrls(new Set(bookmarkedUrls).add(article.url));
        }
    };

    if (!city) {
        return (
            <View style={styles.center}>
                <Text>Please select a city first.</Text>
            </View>
        );
    }

    if (loading && !refreshing) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={articles}
                keyExtractor={(item) => item.url}
                contentContainerStyle={styles.list}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                renderItem={({ item }) => (
                    <NewsCard
                        article={item}
                        onPress={() => navigation.navigate('ArticleDetails', { url: item.url, title: item.title })}
                        onBookmark={() => handleBookmark(item)}
                        isBookmarked={bookmarkedUrls.has(item.url)}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F9FC',
    },
    list: {
        paddingVertical: 16,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default NewsFeedScreen;
