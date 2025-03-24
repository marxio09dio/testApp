import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Sample events (this would typically be retrieved from state or an API)
const events = [
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
];

const EventDetailsScreen = () => {
    const { eventId } = useLocalSearchParams(); // Get event ID from route params
    const event = events.find(e => e.id === eventId); // Find event by ID

    if (!event) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Event not found</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

            {/* Header */}
            <View style={styles.detailsHeader}>
                <TouchableOpacity
                    style={styles.backButton}
                    //onPress={() => navigation.goBack()}
                >
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#1F2937" />
                </TouchableOpacity>
                <Text style={styles.detailsHeaderTitle}>Event Details</Text>
                <TouchableOpacity style={styles.editButton}>
                    <MaterialCommunityIcons name="pencil" size={22} color="#1F2937" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.detailsContent}>
                {/* Event Title Section */}
                <View style={[styles.detailsSection, styles.titleSection]}>
                    <View style={styles.titleRow}>
                        <View style={[styles.detailsIconContainer, { backgroundColor: event.color }]}>
                            <MaterialCommunityIcons name={event.icon} size={24} color="#FFFFFF" />
                        </View>
                        <View style={styles.titleContent}>
                            <Text style={[
                                styles.detailsTitle,
                              //  styles.completedDetailText
                            ]}>
                                {event.title}
                            </Text>
                            <Text style={styles.detailsDate}>{event.fullDate} • {event.time}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.detailsCompletionButton}
                           // onPress={toggleCompletion}
                        >
                            <MaterialCommunityIcons
                                name={"circle-outline"}
                                size={26}
                                color={ "#D1D5DB"}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Pet Info Section */}
                <View style={styles.detailsSection}>
                    <Text style={styles.sectionTitle}>Pet</Text>
                    <View style={styles.petInfoContainer}>
                        <View style={styles.petImagePlaceholder}>
                            <MaterialCommunityIcons name="paw" size={24} color="#FFFFFF" />
                        </View>
                        <Text style={styles.petName}>{event.pet}</Text>
                    </View>
                </View>

                {/* Description Section */}
                <View style={styles.detailsSection}>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.sectionContent}>{event.description}</Text>
                </View>

                {/* Location Section */}
                <View style={styles.detailsSection}>
                    <Text style={styles.sectionTitle}>Location</Text>
                    <View style={styles.locationRow}>
                        <MaterialCommunityIcons name="map-marker" size={20} color="#4B5563" />
                        <Text style={styles.locationText}>{event.location}</Text>
                    </View>
                </View>

                {/* Notes Section */}
                <View style={styles.detailsSection}>
                    <Text style={styles.sectionTitle}>Notes</Text>
                    <Text style={styles.sectionContent}>{event.notes}</Text>
                </View>

                {/* Reminder & Repeat Section */}
                <View style={styles.detailsSection}>
                    <View style={styles.reminderRow}>
                        <View style={styles.reminderItem}>
                            <MaterialCommunityIcons name="bell" size={18} color="#4B5563" />
                            <Text style={styles.reminderText}>Reminder: {event.reminder}</Text>
                        </View>
                        <View style={styles.reminderItem}>
                            <MaterialCommunityIcons name="repeat" size={18} color="#4B5563" />
                            <Text style={styles.reminderText}>Repeat: {event.repeat}</Text>
                        </View>
                    </View>
                </View>

                {/* Attachments Section */}
                {event.attachments.length > 0 && (
                    <View style={styles.detailsSection}>
                        <Text style={styles.sectionTitle}>Attachments</Text>
                        {event.attachments.map(attachment => (
                            <View key={attachment.id} style={styles.attachmentItem}>
                                <MaterialCommunityIcons name={attachment.icon} size={20} color="#4B5563" />
                                <Text style={styles.attachmentName}>{attachment.name}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Bottom Padding */}
                <View style={styles.bottomPadding} />
            </ScrollView>

            {/* Bottom Action Button */}
            <View style={styles.detailsBottomActions}>
                <TouchableOpacity
                    style={[
                        styles.completeButton,
                         styles.completeButtonActive
                    ]}
                    //onPress={toggleCompletion}
                >
                    <MaterialCommunityIcons
                        name={ "check"}
                        size={20}
                        color="#FFFFFF"
                    />
                    <Text style={styles.completeButtonText}>
                        "Mark as Incomplete" 
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default EventDetailsScreen;


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

    // Event Details Screen Styles
    detailsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    backButton: {
        padding: 4,
    },
    detailsHeaderTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    },
    editButton: {
        padding: 4,
    },
    detailsContent: {
        flex: 1,
    },
    detailsSection: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    titleSection: {
        backgroundColor: '#F9FAFB',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailsIconContainer: {
        width: 46,
        height: 46,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContent: {
        flex: 1,
        marginLeft: 14,
    },
    detailsTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1F2937',
    },
    completedDetailText: {
        textDecorationLine: 'line-through',
        color: '#9CA3AF',
    },
    detailsDate: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 2,
    },
    detailsCompletionButton: {
        padding: 6,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4B5563',
        marginBottom: 8,
    },
    sectionContent: {
        fontSize: 15,
        color: '#4B5563',
        lineHeight: 22,
    },
    petInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    petImagePlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#8B5CF6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    petName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1F2937',
        marginLeft: 12,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        marginLeft: 6,
        fontSize: 15,
        color: '#4B5563',
        flex: 1,
    },
    reminderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    reminderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
        marginBottom: 8,
    },
    reminderText: {
        marginLeft: 6,
        fontSize: 14,
        color: '#4B5563',
    },
    attachmentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    attachmentName: {
        marginLeft: 8,
        fontSize: 14,
        color: '#4B5563',
    },
    bottomPadding: {
        height: 80,
    },
    detailsBottomActions: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    completeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 8,
    },
    completeButtonActive: {
        backgroundColor: '#10B981',
    },
    uncompleteButton: {
        backgroundColor: '#6B7280',
    },
    completeButtonText: {
        marginLeft: 8,
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 16,
    }
});