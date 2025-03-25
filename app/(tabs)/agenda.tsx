import React, { useState } from "react"
import { router } from "expo-router"
import { View, Text, TouchableOpacity, StatusBar, SafeAreaView, StyleSheet, FlatList } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { getEventColors, getEventIcon } from "../../utils/eventUtils"
import { events } from "@/data/mackupData"

const AgendaScreen = () => {
  const [activeTab, setActiveTab] = useState("Today")
  const [eventList, setEventList] = useState(events)

  // Function to toggle completion status
  const toggleCompletion = (id: string) => {
    setEventList(
      eventList.map((event) =>
        event.id === id
          ? {
              ...event,
              status: event.status === "completed" ? "upcoming" : "completed"
            }
          : event
      )
    )
  }

  const renderEventItem = ({ item }: { item: (typeof events)[0] }) => (
    <TouchableOpacity style={styles.eventItem} onPress={() => router.push(`/event/${item.id}`)}>
      <View style={[styles.eventIconContainer, { backgroundColor: getEventColors(item.type)[0] }]}>
        {getEventIcon(item.type)}
      </View>

      <View style={styles.eventDetails}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventSubtext}>
          {item.pet} - {item.date} - {item.time}
        </Text>
      </View>

      {/* Completion Toggle Button */}
      <TouchableOpacity style={styles.completionButton} onPress={() => toggleCompletion(item.id)}>
        <MaterialCommunityIcons
          name={item.status === "completed" ? "check-circle" : "circle-outline"}
          size={22}
          color={item.status === "completed" ? "#10B981" : "#D1D5DB"}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  )

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
          {["Past", "Today", "Next"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
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
        data={eventList}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Add Event Button */}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton}>
          <MaterialCommunityIcons name="plus" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333"
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4
  },
  tabContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  tabWrapper: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 24,
    padding: 3
  },
  tab: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 22
  },
  activeTab: {
    backgroundColor: "#FF7A9D"
  },
  tabText: {
    textAlign: "center",
    fontWeight: "500",
    color: "#6B7280",
    fontSize: 14
  },
  activeTabText: {
    color: "#FFFFFF"
  },
  dateContainer: {
    paddingHorizontal: 16,
    paddingVertical: 6
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  dateText: {
    marginLeft: 6,
    color: "#6B7280",
    fontWeight: "500",
    fontSize: 14
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20
  },
  eventItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
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
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2
  },
  completionButton: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  addButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20
  },
  addButton: {
    backgroundColor: "#FF7A9D",
    width: 50,
    height: 50,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4
  }
})

export default AgendaScreen
