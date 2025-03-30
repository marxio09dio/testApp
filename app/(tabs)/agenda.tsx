import React, { useState, useEffect } from "react"
import { router } from "expo-router"
import { View, Text, TouchableOpacity, StatusBar, SafeAreaView, StyleSheet, FlatList, Modal, ScrollView } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { getEventColors, getEventIcon } from "../../utils/eventUtils"
import { events } from "@/data/mackupData"

const AgendaScreen = () => {
  const [activeTab, setActiveTab] = useState("Today")
  const [originalEvents, setOriginalEvents] = useState(events)
  const [eventList, setEventList] = useState(events)
  const [showFilters, setShowFilters] = useState(false)
  const [filterModalVisible, setFilterModalVisible] = useState(false)
  
  // Filter states
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedPets, setSelectedPets] = useState<string[]>([])
  const [hideCompleted, setHideCompleted] = useState(false)
  
  // Get unique event types and pets for filters
  const eventTypes = [...new Set(events.map(event => event.type))]
  const petNames = [...new Set(events.map(event => event.pet))]

  // Apply filters whenever filter criteria change
  useEffect(() => {
    applyFilters()
  }, [selectedTypes, selectedPets, hideCompleted, activeTab, originalEvents])

  // Apply all filters to the original events list
  const applyFilters = () => {
    let filtered = [...originalEvents]
    
    // Filter by tab (date)
    // In a real app, you would filter by actual dates
    // For now, we'll just pretend each tab has different events
    
    // Filter by event types if any are selected
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(event => selectedTypes.includes(event.type))
    }
    
    // Filter by pets if any are selected
    if (selectedPets.length > 0) {
      filtered = filtered.filter(event => selectedPets.includes(event.pet))
    }
    
    // Hide completed events if the toggle is on
    if (hideCompleted) {
      filtered = filtered.filter(event => event.status !== "completed")
    }
    
    setEventList(filtered)
  }

  // Toggle filter selection for event types
  const toggleTypeFilter = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type))
    } else {
      setSelectedTypes([...selectedTypes, type])
    }
  }

  // Toggle filter selection for pets
  const togglePetFilter = (pet: string) => {
    if (selectedPets.includes(pet)) {
      setSelectedPets(selectedPets.filter(p => p !== pet))
    } else {
      setSelectedPets([...selectedPets, pet])
    }
  }

  // Toggle completion status
  const toggleCompletion = (id: string) => {
    const updatedEvents = originalEvents.map((event) =>
      event.id === id
        ? {
            ...event,
            status: event.status === "completed" ? "upcoming" : "completed"
          }
        : event
    )
    setOriginalEvents(updatedEvents)
  }

  // Reset all filters
  const resetFilters = () => {
    setSelectedTypes([])
    setSelectedPets([])
    setHideCompleted(false)
  }

  // Check if any filters are active
  const hasActiveFilters = selectedTypes.length > 0 || selectedPets.length > 0 || hideCompleted

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

  // Filter modal component
  const FilterModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={filterModalVisible}
      onRequestClose={() => setFilterModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter Events</Text>
            <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
              <MaterialCommunityIcons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Event Type Filters */}
            <Text style={styles.filterSectionTitle}>Event Type</Text>
            <View style={styles.filterOptions}>
              {eventTypes.map((type) => (
                <TouchableOpacity
                  key={`type-${type}`}
                  style={[
                    styles.filterChip,
                    selectedTypes.includes(type) && { backgroundColor: getEventColors(type)[0] }
                  ]}
                  onPress={() => toggleTypeFilter(type)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      selectedTypes.includes(type) && { color: "#FFFFFF" }
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Pet Filters */}
            <Text style={styles.filterSectionTitle}>Pet</Text>
            <View style={styles.filterOptions}>
              {petNames.map((pet) => (
                <TouchableOpacity
                  key={`pet-${pet}`}
                  style={[
                    styles.filterChip,
                    selectedPets.includes(pet) && { backgroundColor: "#6366F1" }
                  ]}
                  onPress={() => togglePetFilter(pet)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      selectedPets.includes(pet) && { color: "#FFFFFF" }
                    ]}
                  >
                    {pet}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Hide Completed Toggle */}
            <Text style={styles.filterSectionTitle}>Status</Text>
            <TouchableOpacity
              style={[
                styles.toggleContainer,
                hideCompleted && { backgroundColor: "#F3F4F6" }
              ]}
              onPress={() => setHideCompleted(!hideCompleted)}
            >
              <Text style={styles.toggleText}>Hide completed events</Text>
              <View
                style={[
                  styles.toggleSwitch,
                  hideCompleted && { backgroundColor: "#10B981" }
                ]}
              >
                <View
                  style={[
                    styles.toggleKnob,
                    hideCompleted && { transform: [{ translateX: 18 }] }
                  ]}
                />
              </View>
            </TouchableOpacity>

            {/* Filter Action Buttons */}
            <View style={styles.filterActions}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={resetFilters}
              >
                <Text style={styles.resetButtonText}>Reset All</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => setFilterModalVisible(false)}
              >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
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

      {/* Filter Bar */}
      <View style={styles.filterBar}>
        <View style={styles.dateRow}>
          <MaterialCommunityIcons name="calendar" size={16} color="#6B7280" />
          <Text style={styles.dateText}>Monday, March 30, 2025</Text>
        </View>
        
        <TouchableOpacity 
          style={[styles.filterButton, hasActiveFilters && styles.activeFilterButton]} 
          onPress={() => setFilterModalVisible(true)}
        >
          <MaterialCommunityIcons 
            name="filter-variant" 
            size={18} 
            color={hasActiveFilters ? "#FFFFFF" : "#6B7280"} 
          />
          {hasActiveFilters && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>
                {selectedTypes.length + selectedPets.length + (hideCompleted ? 1 : 0)}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Filter Chips (visible when filters are applied) */}
      {hasActiveFilters && (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.activeFiltersContainer}
          contentContainerStyle={styles.activeFiltersContent}
        >
          {selectedTypes.map(type => (
            <View key={`active-${type}`} style={[styles.activeFilterChip, { backgroundColor: getEventColors(type)[0] }]}>
              <Text style={styles.activeFilterText}>{type}</Text>
              <TouchableOpacity onPress={() => toggleTypeFilter(type)}>
                <MaterialCommunityIcons name="close" size={14} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          ))}
          
          {selectedPets.map(pet => (
            <View key={`active-${pet}`} style={[styles.activeFilterChip, { backgroundColor: "#6366F1" }]}>
              <Text style={styles.activeFilterText}>{pet}</Text>
              <TouchableOpacity onPress={() => togglePetFilter(pet)}>
                <MaterialCommunityIcons name="close" size={14} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          ))}
          
          {hideCompleted && (
            <View style={[styles.activeFilterChip, { backgroundColor: "#10B981" }]}>
              <Text style={styles.activeFilterText}>Hide Completed</Text>
              <TouchableOpacity onPress={() => setHideCompleted(false)}>
                <MaterialCommunityIcons name="close" size={14} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          )}
          
          {hasActiveFilters && (
            <TouchableOpacity style={styles.clearAllButton} onPress={resetFilters}>
              <Text style={styles.clearAllText}>Clear All</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      )}

      {/* Event List */}
      <FlatList
        data={eventList}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="calendar-blank" size={50} color="#D1D5DB" />
            <Text style={styles.emptyText}>No events match your filters</Text>
            <TouchableOpacity style={styles.resetFilterButton} onPress={resetFilters}>
              <Text style={styles.resetFilterText}>Reset Filters</Text>
            </TouchableOpacity>
          </View>
        }
      />

      {/* Add Event Button */}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton}>
          <MaterialCommunityIcons name="plus" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Filter Modal */}
      <FilterModal />
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
  filterBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10
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
  filterButton: {
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    padding: 6,
    flexDirection: "row",
    alignItems: "center"
  },
  activeFilterButton: {
    backgroundColor: "#6366F1"
  },
  filterBadge: {
    backgroundColor: "#FF7A9D",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4
  },
  filterBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600"
  },
  activeFiltersContainer: {
    maxHeight: 40,
    paddingLeft: 16
  },
  activeFiltersContent: {
    paddingRight: 16,
    paddingVertical: 4,
    flexDirection: "row"
  },
  activeFilterChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6366F1",
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 8
  },
  activeFilterText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
    marginRight: 4
  },
  clearAllButton: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 10
  },
  clearAllText: {
    color: "#6B7280",
    fontSize: 12,
    fontWeight: "500"
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
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end"
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    maxHeight: "80%"
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6"
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937"
  },
  modalContent: {
    padding: 16
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 10,
    marginTop: 10
  },
  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16
  },
  filterChip: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8
  },
  filterChipText: {
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "500"
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8
  },
  toggleText: {
    fontSize: 14,
    color: "#374151"
  },
  toggleSwitch: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#D1D5DB",
    padding: 2
  },
  toggleKnob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5
  },
  filterActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6"
  },
  resetButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB"
  },
  resetButtonText: {
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "500"
  },
  applyButton: {
    backgroundColor: "#FF7A9D",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8
  },
  applyButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500"
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60
  },
  emptyText: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 12,
    marginBottom: 16
  },
  resetFilterButton: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8
  },
  resetFilterText: {
    color: "#6B7280",
    fontWeight: "500"
  }
})

export default AgendaScreen