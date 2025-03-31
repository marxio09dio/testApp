import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getEventColors, getEventIcon } from "../../utils/eventUtils";
import { events, pets } from "@/data/mackupData";

const HomeScreen = () => {
  // Group events by time of day (morning, afternoon, evening)
  const getTimeOfDay = (timeString) => {
    const hour = parseInt(timeString.split(':')[0]);
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    return "Evening";
  };

  // Group events by time period
  const groupedEvents = events.reduce((groups, event) => {
    const timeOfDay = getTimeOfDay(event.time);
    if (!groups[timeOfDay]) groups[timeOfDay] = [];
    groups[timeOfDay].push(event);
    return groups;
  }, {});

  // Calculate stats for the summary box
  const todaysEventCount = events.length;
  const upcomingEventCount = events.filter(e => {
    const [hours] = e.time.split(':').map(Number);
    const now = new Date();
    return hours > now.getHours();
  }).length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.greeting}>Hello, Márcio!</Text>
            <Text style={styles.subGreeting}>Your pets are waiting for you</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={22} color="#555" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Pet & Events Summary Card */}
        <View style={styles.summaryCardContainer}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryIconRow}>
              <View style={styles.summaryIconBadge}>
                <Ionicons name="calendar" size={18} color="#FFF" />
              </View>
              <TouchableOpacity>
                <Text style={styles.viewAllLink}>View Calendar</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.summaryCardTitle}>Pet Day Summary</Text>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{todaysEventCount}</Text>
                <Text style={styles.statLabel}>Total Events</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{upcomingEventCount}</Text>
                <Text style={styles.statLabel}>Upcoming</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{pets.length}</Text>
                <Text style={styles.statLabel}>Active Pets</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Today's Events - Horizontal Cards (Simplified) */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Schedule</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalEventsContainer}
          >
            {events.map((item) => (
              <TouchableOpacity key={item.id} style={styles.horizontalEventCard}>
                <View style={[styles.horizontalEventIconContainer, { backgroundColor: getEventColors(item.type)[0] }]}>
                  {getEventIcon(item.type)}
                </View>
                <Text style={styles.eventTitle} numberOfLines={1}>{item.title}</Text>
                <View style={styles.eventMeta}>
                  <Text style={styles.eventTime}>{item.time}</Text>
                  <Text style={styles.eventPetName} numberOfLines={1}>{item.pet}</Text>
                </View>
              </TouchableOpacity>
            ))}

            {events.length > 10 && (
              <TouchableOpacity style={styles.seeMoreCard}>
                <Text style={styles.seeMoreText}>View all</Text>
                <Ionicons name="arrow-forward" size={14} color="#6366F1" />
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>

        {/* My Pets - Horizontal Grid */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Furry Friends</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.petGrid}>
            {pets.slice(0, 6).map((pet) => (
              <TouchableOpacity key={pet.id} style={styles.petCard}>
                <Image source={{ uri: pet.image }} style={styles.petImage} />
                <View style={styles.petInfoContainer}>
                  <Text style={styles.petName}>{pet.name}</Text>
                  <Text style={styles.petBreed}>{pet.breed}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtonsRow}>
            {[
              { icon: "calendar", title: "New Event", color: "#6366F1" },
              { icon: "paw", title: "Add Pet", color: "#10B981" },
              { icon: "medical", title: "Health", color: "#F59E0B" },
              { icon: "map", title: "Find Vet", color: "#EC4899" }
            ].map((action, index) => (
              <TouchableOpacity key={index} style={styles.actionButton}>
                <View style={[styles.actionIconContainer, { backgroundColor: action.color }]}>
                  <Ionicons name={action.icon} size={18} color="#FFF" />
                </View>
                <Text style={styles.actionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB"
  },
  scrollContent: {
    paddingBottom: 30
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20
  },
  greeting: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937"
  },
  subGreeting: {
    fontSize: 15,
    color: "#6B7280",
    marginTop: 2
  },
  notificationButton: {
    position: "relative",
    backgroundColor: "#FFF",
    borderRadius: 12,
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  notificationBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#F97316"
  },
  summaryCardContainer: {
    paddingHorizontal: 20,
    marginBottom: 24
  },
  summaryCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2
  },
  summaryIconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12
  },
  summaryIconBadge: {
    backgroundColor: "#6366F1",
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  viewAllLink: {
    fontSize: 14,
    color: "#6366F1",
    fontWeight: "500"
  },
  summaryCardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 12
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  statItem: {
    flex: 1,
    alignItems: "center"
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2937"
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#E5E7EB"
  },
  sectionContainer: {
    marginBottom: 24
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 12
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1F2937"
  },
  seeAllText: {
    fontSize: 14,
    color: "#6366F1",
    fontWeight: "500"
  },
  horizontalEventsContainer: {
    paddingLeft: 20,
    paddingRight: 8,
    paddingBottom: 4
  },
  horizontalEventCard: {
    width: 120,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  horizontalEventIconContainer: {
    borderRadius: 8,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8
  },
  eventTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 6
  },
  eventMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  eventTime: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6366F1"
  },
  eventPetName: {
    fontSize: 11,
    color: "#6B7280",
    flex: 1,
    textAlign: "right"
  },
  seeMoreCard: {
    width: 80,
    height: "100%",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    padding: 12,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  seeMoreText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6366F1",
    marginRight: 4
  },
  petGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    justifyContent: "space-between"
  },
  petCard: {
    width: "31%", // Approx 3 per row with spacing
    marginHorizontal: 4,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    overflow: "hidden"
  },
  petImage: {
    width: "100%",
    height: 90,
    resizeMode: "cover"
  },
  petInfoContainer: {
    padding: 8
  },
  petName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1F2937"
  },
  petBreed: {
    fontSize: 11,
    color: "#6B7280"
  },
  quickActionsContainer: {
    paddingHorizontal: 20
  },
  actionButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12
  },
  actionButton: {
    alignItems: "center",
    width: "23%"
  },
  actionIconContainer: {
    width: 46,
    height: 46,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6
  },
  actionText: {
    fontSize: 12,
    color: "#4B5563",
    fontWeight: "500"
  }
});

export default HomeScreen;