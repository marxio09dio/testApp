import { MaterialCommunityIcons } from "@expo/vector-icons"
import React from "react"
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from "react-native"
import { pets } from "@/data/mackupData"
const PetsScreen = () => {
  // Current date
  const today = new Date()

  const isBirthday = (petBirthday) => {
    return today.getMonth() === petBirthday.getMonth() && today.getDate() === petBirthday.getDate()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Pets</Text>
      </View>
      <ScrollView contentContainerStyle={styles.petList} showsVerticalScrollIndicator={false}>
        {pets.map((pet) => (
          <TouchableOpacity key={pet.id} style={styles.petItem}>
            <View style={styles.petItemLeft}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: pet.image }} style={styles.petImage} />
                {isBirthday(pet.birthday) && (
                  <View style={styles.birthdayOverlay}>
                    <Text style={styles.birthdayText}>🎉</Text>
                  </View>
                )}
              </View>
              <View style={styles.petDetails}>
                <View style={styles.nameContainer}>
                  <Text style={styles.petName}>{pet.name}</Text>
                  {isBirthday(pet.birthday) && <Text style={styles.birthdayTag}>Birthday!</Text>}
                </View>
                <Text style={styles.petAge}>{pet.age} years old</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    backgroundColor: "#F9FAFB"
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1F2937"
  },
  petList: {
    paddingTop: 16
  },
  petItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0"
  },
  petItemLeft: {
    flexDirection: "row",
    alignItems: "center"
  },
  imageContainer: {
    position: "relative",
    marginRight: 12
  },
  petImage: {
    width: 60,
    height: 60,
    borderRadius: 12
  },
  birthdayOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 105, 180, 0.3)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center"
  },
  birthdayText: {
    fontSize: 24,
    color: "white"
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  petDetails: {
    justifyContent: "center"
  },
  petName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginRight: 8
  },
  birthdayTag: {
    fontSize: 12,
    color: "#FF69B4",
    backgroundColor: "#FFE6F2",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6
  },
  petAge: {
    fontSize: 14,
    color: "#888"
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

export default PetsScreen
