import React from "react"
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { getEventColors, getEventIcon } from "../../utils/eventUtils"
import { events, pets } from "@/data/mackupData"

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.greeting}>Hello, Kevin</Text>
            <Text style={styles.subGreeting}>Your pets are doing great today</Text>
          </View>
          <TouchableOpacity style={styles.notificationIcon}>
            <Ionicons name="notifications-outline" size={20} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Upcoming Events */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Today's Events</Text>
          <View style={styles.eventsCard}>
            {events.map((item) => (
              <View key={item.id} style={styles.eventItem}>
                <View style={[styles.eventIconContainer, { backgroundColor: getEventColors(item.type)[0] }]}>
                  {getEventIcon(item.type)}
                </View>
                <View style={styles.eventDetails}>
                  <Text style={styles.eventTitle}>{item.title}</Text>
                  <Text style={styles.eventSubtext}>
                    {item.pet} - {item.date}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* My Pets */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>My Pets</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.petScrollContainer}
          >
            {pets.map((pet) => (
              <View key={pet.id} style={styles.petCard}>
                <Image source={{ uri: pet.image }} style={styles.petImage} />
                <View style={styles.petInfoContainer}>
                  <Text style={styles.petName}>{pet.name}</Text>
                  <Text style={styles.petBreed}>{pet.breed}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsList}>
            {[
              { icon: "calendar", title: "Agenda", color: "#007AFF" },
              { icon: "paw", title: "Pets", color: "#34C759" },
              { icon: "map", title: "Map", color: "#FF9500" },
              { icon: "person", title: "Profile", color: "#5856D6" }
            ].map((action, index) => (
              <TouchableOpacity key={index} style={styles.quickActionButton}>
                <View style={[styles.quickActionIconContainer, { backgroundColor: action.color + "15" }]}>
                  <Ionicons name={action.icon} size={20} color={action.color} />
                </View>
                <Text style={styles.quickActionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  scrollContent: {
    paddingBottom: 20
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16
  },
  greeting: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333"
  },
  subGreeting: {
    fontSize: 14,
    color: "#666"
  },
  notificationIcon: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  sectionContainer: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    paddingHorizontal: 16,
    marginBottom: 12
  },
  eventsCard: {
    marginHorizontal: 16
  },
  eventItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0"
  },
  eventIconContainer: {
    borderRadius: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12
  },
  eventDetails: {
    flex: 1
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937"
  },
  eventSubtext: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2
  },
  petScrollContainer: {
    paddingHorizontal: 16
  },
  petCard: {
    width: 140,
    marginRight: 12,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden"
  },
  petImage: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
    borderRadius: 12
  },
  petInfoContainer: {
    padding: 10
  },
  petName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333"
  },
  petBreed: {
    fontSize: 12,
    color: "#666"
  },
  quickActionsContainer: {
    marginTop: 16
  },
  quickActionsList: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16
  },
  quickActionButton: {
    alignItems: "center"
  },
  quickActionIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6
  },
  quickActionText: {
    fontSize: 12,
    color: "#666"
  }
})

export default HomeScreen
