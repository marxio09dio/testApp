import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';

const PetsScreen = () => {
  // Current date
  const today = new Date();

  const pets = [
    {
      id: '1',
      name: 'Tommy',
      age: 3,
      birthday: new Date(2022, 2, 24),
      image: 'https://place.dog/300/200'
    },
    {
      id: '2',
      name: 'Max',
      age: 5,
      birthday: new Date(2020, 6, 15),
      image: 'https://place.dog/300/200'
    },
    {
      id: '3',
      name: 'Bella',
      age: 2,
      birthday: new Date(2023, 11, 25),
      image: 'https://place.dog/300/200'
    }
  ];

  const isBirthday = (petBirthday) => {
    return (
      today.getMonth() === petBirthday.getMonth() &&
      today.getDate() === petBirthday.getDate()
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>My Pets</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.petList}
        showsVerticalScrollIndicator={false}
      >
        {pets.map((pet) => (
          <TouchableOpacity key={pet.id} style={styles.petItem}>
            <View style={styles.petItemLeft}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: pet.image }}
                  style={styles.petImage}
                />
                {isBirthday(pet.birthday) && (
                  <View style={styles.birthdayOverlay}>
                    <Text style={styles.birthdayText}>🎉</Text>
                  </View>
                )}
              </View>
              <View style={styles.petDetails}>
                <View style={styles.nameContainer}>
                  <Text style={styles.petName}>{pet.name}</Text>
                  {isBirthday(pet.birthday) && (
                    <Text style={styles.birthdayTag}>Birthday!</Text>
                  )}
                </View>
                <Text style={styles.petAge}>{pet.age} years old</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Details</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.bottomAddButton}>
        <Text style={styles.bottomAddButtonText}>+ Add Pet</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 20
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16
  },
  petList: {
    paddingTop: 16
  },
  petItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  petItemLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageContainer: {
    position: 'relative',
    marginRight: 12
  },
  petImage: {
    width: 60,
    height: 60,
    borderRadius: 12
  },
  birthdayOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 105, 180, 0.3)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  birthdayText: {
    fontSize: 24,
    color: 'white'
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  petDetails: {
    justifyContent: 'center'
  },
  petName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginRight: 8
  },
  birthdayTag: {
    fontSize: 12,
    color: '#FF69B4',
    backgroundColor: '#FFE6F2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6
  },
  petAge: {
    fontSize: 14,
    color: '#888'
  },
  addButton: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8
  },
  addButtonText: {
    color: '#000',
    fontSize: 14
  },
  bottomAddButton: {
    position: 'absolute',
    bottom: 126,
    right: 16,
    backgroundColor: '#FF69B4',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  bottomAddButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16
  }
});

export default PetsScreen;