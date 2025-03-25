import React, { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const SettingsScreen = () => {
  // State for toggleable settings
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  // Setting sections
  const settingSections = [
    {
      title: "Profile",
      items: [
        {
          icon: "person-outline",
          title: "User Profile",
          iconColor: "#4A90E2",
          onPress: () => {
            /* Navigate to profile */
          }
        }
      ]
    },
    {
      title: "Preferences",
      items: [
        {
          icon: "moon-outline",
          title: "Dark Mode",
          iconColor: "#8E44AD",
          switch: darkMode,
          onSwitch: () => setDarkMode(!darkMode)
        },
        {
          icon: "notifications-outline",
          title: "Notifications",
          iconColor: "#F39C12",
          switch: notifications,
          onSwitch: () => setNotifications(!notifications)
        },
        {
          icon: "language-outline",
          title: "Language",
          iconColor: "#2ECC71",
          value: "English",
          onPress: () => {
            /* Language selection */
          }
        },
        {
          icon: "stats-chart-outline",
          title: "Measure Units",
          iconColor: "#E74C3C",
          value: "Metric",
          onPress: () => {
            /* Measure units selection */
          }
        }
      ]
    },
    {
      title: "Support",
      items: [
        {
          icon: "chatbubble-outline",
          title: "Provide Feedback",
          iconColor: "#3498DB",
          onPress: () => {
            /* Navigate to feedback */
          }
        },
        {
          icon: "document-text-outline",
          title: "Terms and Conditions",
          iconColor: "#1ABC9C",
          onPress: () => {
            /* Show terms */
          }
        }
      ]
    },
    {
      title: "Account",
      items: [
        {
          icon: "log-out-outline",
          title: "Logout",
          iconColor: "#E74C3C",
          onPress: () => {
            /* Logout functionality */
          }
        }
      ]
    },
    {
      title: "About",
      items: [
        {
          icon: "information-circle-outline",
          title: "App Version",
          iconColor: "#95A5A6",
          value: "1.0.0"
        }
      ]
    }
  ]

  const renderSettingItem = (item) => {
    return (
      <TouchableOpacity 
        style={styles.settingItem} 
        onPress={item.onPress} 
        key={item.title}
      >
        <View style={styles.settingItemLeft}>
          <View style={[styles.iconContainer, { backgroundColor: `${item.iconColor}20` }]}>
            <Ionicons 
              name={item.icon} 
              size={20} 
              color={item.iconColor} 
            />
          </View>
          <Text style={styles.settingTitle}>
            {item.title}
          </Text>
        </View>
        <View style={styles.settingItemRight}>
          {item.value && <Text style={styles.settingValue}>{item.value}</Text>}
          {item.switch !== undefined ? (
            <Switch
              value={item.switch}
              onValueChange={item.onSwitch}
              trackColor={{ false: "#767577", true: item.iconColor }}
              thumbColor="#FFFFFF"
            />
          ) : (
            <Ionicons name="chevron-forward" size={20} color="#999" />
          )}
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      <ScrollView>
        <View style={styles.profileContainer}>
          <Image 
            source={require('../../assets/images/react-logo.png')} // Replace with actual path
            style={styles.avatar} 
          />
          <View>
            <Text style={styles.profileName}>Márcio</Text>
            <Text style={styles.profileEmail}>marcio@example.com</Text>
          </View>
        </View>
        {settingSections.map((section) => (
          <View key={section.title} style={styles.settingSection}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map(renderSettingItem)}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5"
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333"
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginBottom: 16
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333'
  },
  profileEmail: {
    fontSize: 14,
    color: '#666'
  },
  settingSection: {
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
    borderRadius: 12,
    marginHorizontal: 16
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0"
  },
  settingItemLeft: {
    flexDirection: "row",
    alignItems: "center"
  },
  iconContainer: {
    borderRadius: 8,
    padding: 8,
    marginRight: 12
  },
  settingTitle: {
    fontSize: 16,
    color: "#333"
  },
  settingItemRight: {
    flexDirection: "row",
    alignItems: "center"
  },
  settingValue: {
    fontSize: 14,
    color: "#666",
    marginRight: 12
  }
})

export default SettingsScreen