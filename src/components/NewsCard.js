import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const NewsCard = ({ article, onPress, onBookmark, isBookmarked }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
            {article.urlToImage ? (
                <Image source={{ uri: article.urlToImage }} style={styles.image} />
            ) : (
                <View style={[styles.image, styles.placeholder]} />
            )}

            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>{article.title}</Text>
                <Text style={styles.description} numberOfLines={2}>{article.description}</Text>

                <View style={styles.footer}>
                    <Text style={styles.source}>{article.source?.name} • {new Date(article.publishedAt).toLocaleDateString()}</Text>
                    {onBookmark && (
                        <TouchableOpacity onPress={onBookmark} style={styles.bookmarkButton}>
                            <Ionicons
                                name={isBookmarked ? "bookmark" : "bookmark-outline"}
                                size={24}
                                color="#007AFF"
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        marginBottom: 20,
        marginHorizontal: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#F3F4F6',

        // Smooth Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 4,
    },
    image: {
        width: '100%',
        height: 200,
        backgroundColor: '#F3F4F6',
    },
    placeholder: {
        backgroundColor: '#E5E7EB',
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 8,
        color: '#1F2937', // Slate 800
        lineHeight: 26,
        letterSpacing: -0.5,
    },
    description: {
        fontSize: 15,
        color: '#64748B', // Slate 500
        marginBottom: 16,
        lineHeight: 24,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    source: {
        fontSize: 12,
        color: '#6366F1', // Indigo 500
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    bookmarkButton: {
        padding: 4,
    },
});

export default NewsCard;
