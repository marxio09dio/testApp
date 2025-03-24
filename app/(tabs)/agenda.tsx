import React, { useState } from 'react';
import { router } from "expo-router"; // Import Expo Router
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    StyleSheet,
    FlatList
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AgendaScreen = () => {
    const [activeTab, setActiveTab] = useState('Today');
    const [events, setEvents] = useState([
        {
            id: '1',
            title: 'Medicina',
            pet: 'Tommy',
            time: '3:13 PM',
            date: 'Mon, Mar 24',
            fullDate: 'March 24, 2025',
            icon: 'pill',
            color: '#3B82F6',
            status: 'completed',
            description: 'Give Tommy his monthly heart medication. Remember to administer after a meal.',
            location: 'Home',
            notes: 'Prescribed by Dr. Wilson on February 15. Dosage: 1 pill.',
            reminder: '15 minutes before',
            repeat: 'Monthly',
            petImage: 'https://example.com/tommy.jpg', // This would be a local asset in a real app
            attachments: [
                { id: '1', name: 'Prescription.pdf', icon: 'file-pdf-box' },
                { id: '2', name: 'Medication_Instructions.jpg', icon: 'file-image' }
            ]
        },
        {
            id: '2',
            title: 'Vet Checkup',
            pet: 'Tommy',
            time: '5:30 PM',
            date: 'Mon, Mar 24',
            fullDate: 'March 24, 2025',
            icon: 'paw',
            color: '#8B5CF6',
            status: 'upcoming',
            description: 'Regular check-up appointment with Dr. Martinez.',
            location: 'Happy Paws Veterinary Clinic, 123 Main St.',
            notes: 'Bring vaccination records. Tommy needs rabies booster.',
            reminder: '1 hour before',
            repeat: 'Every 6 months',
            petImage: 'https://example.com/tommy.jpg',
            attachments: [
                { id: '1', name: 'Last_Visit_Report.pdf', icon: 'file-pdf-box' }
            ]
        },
        {
            id: '3',
            title: 'Grooming',
            pet: 'Tommy',
            time: '11:00 AM',
            date: 'Tue, Mar 25',
            fullDate: 'March 25, 2025',
            icon: 'content-cut',
            color: '#F59E0B',
            status: 'upcoming',
            description: 'Full grooming session including bath, haircut, and nail trimming.',
            location: 'Fluffy Friends Grooming Salon, 456 Oak Ave.',
            notes: 'Use hypoallergenic shampoo. Tommy gets anxious during nail trims.',
            reminder: '30 minutes before',
            repeat: 'Monthly',
            petImage: 'https://example.com/tommy.jpg',
            attachments: []
        },
        {
            id: '4',
            title: 'Walk',
            pet: 'Max',
            time: '4:00 PM',
            date: 'Mon, Mar 24',
            fullDate: 'March 24, 2025',
            icon: 'walk',
            color: '#10B981',
            status: 'upcoming',
            description: 'Evening walk at the park. Bring frisbee for play session.',
            location: 'Sunshine Park, West Entrance',
            notes: 'Bring water bottle and poop bags. Max needs at least 30 minutes of exercise.',
            reminder: '15 minutes before',
            repeat: 'Daily',
            petImage: 'https://example.com/max.jpg',
            attachments: []
        },
        {
            id: '5',
            title: 'Vaccination',
            pet: 'Bella',
            time: '2:30 PM',
            date: 'Wed, Mar 26',
            fullDate: 'March 26, 2025',
            icon: 'needle',
            color: '#EF4444',
            status: 'upcoming',
            description: 'Annual vaccination appointment for distemper and bordetella.',
            location: 'Pet Care Center, 789 Elm St.',
            notes: 'Bella may need to stay for 15 minutes after for observation. Bring treats.',
            reminder: '1 day before',
            repeat: 'Yearly',
            petImage: 'https://example.com/bella.jpg',
            attachments: [
                { id: '1', name: 'Vaccination_Schedule.pdf', icon: 'file-pdf-box' },
                { id: '2', name: 'Insurance_Info.pdf', icon: 'file-pdf-box' }
            ]
        }
    ]);

    // Function to toggle completion status
    const toggleCompletion = (id) => {
        setEvents(events.map(event =>
            event.id === id
                ? { ...event, status: event.status === 'completed' ? 'upcoming' : 'completed' }
                : event
        ));
    };

    const renderEventItem = ({ item }) => (
        <TouchableOpacity style={styles.eventItem}
            onPress={() => router.push(`/event/${item.id}`)} // Navigate to details
        >
            <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                <MaterialCommunityIcons name={item.icon} size={18} color="#FFFFFF" />
            </View>

            <View style={styles.eventContent}>
                <View style={styles.eventDetails}>
                    <Text style={[
                        styles.eventTitle,
                        item.status === 'completed' && styles.completedText
                    ]}>
                        {item.title}
                    </Text>
                    <Text style={styles.eventSubtitle}>{item.pet}</Text>
                </View>

                <View style={styles.eventTimeContainer}>
                    <Text style={styles.eventTime}>{item.time}</Text>
                    <Text style={styles.eventDate}>{item.date}</Text>
                </View>
            </View>

            {/* Completion Toggle Button */}
            <TouchableOpacity
                style={styles.completionButton}
                onPress={() => toggleCompletion(item.id)}
            >
                <MaterialCommunityIcons
                    name={item.status === 'completed' ? "check-circle" : "circle-outline"}
                    size={22}
                    color={item.status === 'completed' ? "#10B981" : "#D1D5DB"}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Agenda</Text>
                <Text style={styles.headerSubtitle}>Tap circle to mark as completed</Text>
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                <View style={styles.tabWrapper}>
                    {['Past', 'Today', 'Next'].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => setActiveTab(tab)}
                            style={[
                                styles.tab,
                                activeTab === tab && styles.activeTab
                            ]}
                        >
                            <Text style={[
                                styles.tabText,
                                activeTab === tab && styles.activeTabText
                            ]}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Calendar Date Indicator */}
            <View style={styles.dateContainer}>
                <View style={styles.dateRow}>
                    <MaterialCommunityIcons name="calendar" size={16} color="#6B7280" />
                    <Text style={styles.dateText}>Monday, March 24, 2025</Text>
                </View>
            </View>

            {/* Event List */}
            <FlatList
                data={events}
                renderItem={renderEventItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />

            {/* Add Event Button */}
            <View style={styles.addButtonContainer}>
                <TouchableOpacity style={styles.addButton}>
                    <MaterialCommunityIcons name="plus" size={20} color="#FFFFFF" />
                    <Text style={styles.addButtonText}>Add Event</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 8,
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#9CA3AF',
        marginTop: 4,
    },
    tabContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    tabWrapper: {
        flexDirection: 'row',
        backgroundColor: '#F3F4F6',
        borderRadius: 24,
        padding: 3,
    },
    tab: {
        flex: 1,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 22,
    },
    activeTab: {
        backgroundColor: '#F472B6',
    },
    tabText: {
        textAlign: 'center',
        fontWeight: '500',
        color: '#6B7280',
        fontSize: 14,
    },
    activeTabText: {
        color: '#FFFFFF',
    },
    dateContainer: {
        paddingHorizontal: 20,
        paddingVertical: 6,
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateText: {
        marginLeft: 6,
        color: '#6B7280',
        fontWeight: '500',
        fontSize: 14,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 20,
    },
    eventItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    eventContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 12,
        marginRight: 8,
    },
    eventDetails: {
        flex: 1,
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1F2937',
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#9CA3AF',
    },
    eventSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 2,
    },
    eventTimeContainer: {
        alignItems: 'flex-end',
    },
    eventTime: {
        fontSize: 14,
        fontWeight: '500',
        color: '#4B5563',
    },
    eventDate: {
        fontSize: 13,
        color: '#9CA3AF',
        marginTop: 2,
    },
    completionButton: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButtonContainer: {
        position: 'absolute',
        bottom: 80,
        right: 20,
    },
    addButton: {
        backgroundColor: '#F472B6',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 24,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        marginLeft: 6,
    },
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
    },
    navItemText: {
        fontSize: 12,
        color: '#9CA3AF',
        marginTop: 4,
    },
    navItemTextActive: {
        fontSize: 12,
        color: '#F472B6',
        marginTop: 4,
    },
});

export default AgendaScreen;