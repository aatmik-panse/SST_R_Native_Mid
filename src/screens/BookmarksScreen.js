import React, { useState, useCallback } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getBookmarks, removeBookmark } from '../utils/storage';
import NewsCard from '../components/NewsCard';

const BookmarksScreen = ({ navigation }) => {
    const [bookmarks, setBookmarks] = useState([]);

    useFocusEffect(
        useCallback(() => {
            loadBookmarks();
        }, [])
    );

    const loadBookmarks = async () => {
        const data = await getBookmarks();
        setBookmarks(data.reverse()); // Newest first
    };

    const handleRemove = async (article) => {
        await removeBookmark(article.url);
        loadBookmarks();
    };

    if (bookmarks.length === 0) {
        return (
            <View style={styles.center}>
                <Text style={styles.emptyText}>No bookmarks yet.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={bookmarks}
                keyExtractor={(item) => item.url}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <NewsCard
                        article={item}
                        onPress={() => navigation.navigate('ArticleDetails', { url: item.url, title: item.title })}
                        onBookmark={() => handleRemove(item)}
                        isBookmarked={true}
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
    emptyText: {
        fontSize: 16,
        color: '#888',
    },
});

export default BookmarksScreen;
