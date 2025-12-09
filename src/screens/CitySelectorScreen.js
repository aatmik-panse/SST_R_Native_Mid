import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CityContext } from '../context/CityContext';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 2;
const GAP = 16;
const PADDING = 24;
const ITEM_WIDTH = (width - (PADDING * 2) - GAP) / COLUMN_COUNT;

const CITIES = [
    'Bangalore', 'New Delhi', 'Mumbai', 'Hyderabad',
    'Chennai', 'Kolkata', 'New York', 'London',
    'Tokyo', 'San Francisco', 'Dubai', 'Paris',
    'Singapore', 'Sydney', 'Toronto', 'Berlin'
];

// Modern Color Palette
const COLORS = {
    primary: '#6366F1', // Indigo 500
    background: '#F8FAFC', // Slate 50
    card: '#FFFFFF',
    text: '#1E293B', // Slate 800
    subtext: '#64748B', // Slate 500
    accent: '#818CF8'
};

const CitySelectorScreen = () => {
    const { selectCity, city: currentCity } = useContext(CityContext);

    const handleSelect = (city) => {
        selectCity(city);
    };

    const renderItem = ({ item }) => {
        const isSelected = currentCity === item;
        return (
            <TouchableOpacity
                style={[styles.item, isSelected && styles.selectedItem]}
                onPress={() => handleSelect(item)}
                activeOpacity={0.7}
            >
                <View style={[styles.iconContainer, isSelected && styles.selectedIconContainer]}>
                    <Ionicons
                        name={isSelected ? "location" : "location-outline"}
                        size={32}
                        color={isSelected ? "#FFF" : COLORS.primary}
                    />
                </View>
                <Text style={[styles.text, isSelected && styles.selectedText]}>{item}</Text>
                {isSelected && (
                    <View style={styles.badge}>
                        <Ionicons name="checkmark" size={12} color="#FFF" />
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
            <View style={styles.header}>
                <Text style={styles.kicker}>WELCOME TO</Text>
                <Text style={styles.title}>Newsee</Text>
                <Text style={styles.subtitle}>Choose your location to get started</Text>
            </View>
            <FlatList
                data={CITIES}
                keyExtractor={(item) => item}
                renderItem={renderItem}
                numColumns={COLUMN_COUNT}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.row}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 24,
    },
    kicker: {
        fontSize: 12,
        fontWeight: '700',
        color: COLORS.primary,
        letterSpacing: 1.5,
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 34,
        fontWeight: '900',
        color: COLORS.text,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.subtext,
        lineHeight: 24,
    },
    list: {
        padding: 24,
        paddingTop: 8,
    },
    row: {
        justifyContent: 'space-between',
    },
    item: {
        width: ITEM_WIDTH,
        backgroundColor: COLORS.card,
        paddingVertical: 24,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginBottom: 16,
        alignItems: 'center',
        justifyContent: 'center',

        // Soft Modern Shadow
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0)',
    },
    selectedItem: {
        backgroundColor: COLORS.card,
        borderColor: COLORS.primary,
        shadowColor: COLORS.primary,
        shadowOpacity: 0.15,
        shadowRadius: 12,
        transform: [{ scale: 1.02 }],
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#EEF2FF', // Indigo 50
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    selectedIconContainer: {
        backgroundColor: COLORS.primary,
    },
    text: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.text,
        textAlign: 'center',
    },
    selectedText: {
        color: COLORS.primary,
    },
    badge: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default CitySelectorScreen;
