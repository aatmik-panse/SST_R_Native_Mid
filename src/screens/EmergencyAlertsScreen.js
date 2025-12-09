import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ALERTS = [
    {
        id: '1',
        severity: 'high',
        title: 'Severe Thunderstorm Warning',
        description: 'Heavy rain and strong winds expected in the downtown area. Seek shelter.',
        time: '20 mins ago',
    },
    {
        id: '2',
        severity: 'medium',
        title: 'Traffic Congestion',
        description: 'Major delays on Main St due to construction. Use detailed routes.',
        time: '1 hour ago',
    },
    {
        id: '3',
        severity: 'low',
        title: 'Public Park Maintenance',
        description: 'Central Park will be closed until 2 PM for maintenance.',
        time: '3 hours ago',
    },
];

const EmergencyAlertsScreen = () => {
    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'high': return '#EF4444'; // Red 500
            case 'medium': return '#F59E0B'; // Amber 500
            case 'low': return '#10B981'; // Emerald 500
            default: return '#94A3B8';
        }
    };

    const getIcon = (severity) => {
        switch (severity) {
            case 'high': return 'alert-circle';
            case 'medium': return 'warning';
            case 'low': return 'checkmark-circle';
            default: return 'notifications';
        }
    };

    const getSeverityLabel = (severity) => {
        switch (severity) {
            case 'high': return 'CRITICAL';
            case 'medium': return 'ADVISORY';
            case 'low': return 'INFO';
            default: return 'NOTICE';
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={ALERTS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => {
                    const color = getSeverityColor(item.severity);
                    const backgroundColor = item.severity === 'high' ? '#FEF2F2' : 'white'; // Light Red for high

                    return (
                        <View style={[styles.card, { backgroundColor, borderColor: color }]}>
                            <View style={styles.header}>
                                <View style={styles.badgeContainer}>
                                    <View style={[styles.badge, { backgroundColor: color }]}>
                                        <Text style={styles.badgeText}>{getSeverityLabel(item.severity)}</Text>
                                    </View>
                                    <View style={styles.timeContainer}>
                                        <Ionicons name="time-outline" size={14} color="#64748B" />
                                        <Text style={styles.timeText}>{item.time}</Text>
                                    </View>
                                </View>
                                <Ionicons name={getIcon(item.severity)} size={28} color={color} style={styles.iconAb} />
                            </View>

                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.description}>{item.description}</Text>

                            <View style={styles.actionRow}>
                                <Text style={[styles.readMore, { color }]}>View Details</Text>
                                <Ionicons name="arrow-forward" size={16} color={color} />
                            </View>
                        </View>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    list: {
        padding: 20,
    },
    card: {
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',

        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    badgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    badge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    timeText: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '500',
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
        color: '#1E293B',
        marginBottom: 8,
        letterSpacing: -0.5,
    },
    description: {
        fontSize: 15,
        color: '#475569',
        marginBottom: 20,
        lineHeight: 24,
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    readMore: {
        fontSize: 14,
        fontWeight: '700',
    }
});

export default EmergencyAlertsScreen;
