import { Tabs } from "expo-router"
import React from "react"
import { Platform, Pressable } from "react-native"
import { IconSymbol } from "@/components/ui/IconSymbol"
import TabBarBackground from "@/components/ui/TabBarBackground"
import { FontAwesome, SimpleLineIcons } from "@expo/vector-icons"

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarButton: (props) => <Pressable {...props} android_ripple={{ color: "transparent" }} />,
        tabBarBackground: TabBarBackground,
        tabBarActiveTintColor: "#FF7A9D",
        tabBarInactiveTintColor: "#868E96",
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute"
          },
          default: {}
        })
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />
        }}
      />
      <Tabs.Screen
        name="agenda"
        options={{
          title: "agenda",
          tabBarIcon: ({ color, size }) => <SimpleLineIcons name="calendar" size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name="pets"
        options={{
          title: "pets",
          tabBarIcon: ({ color, size }) => <FontAwesome name="paw" size={size} color={color} />
        }}
      />
    </Tabs>
  )
}
