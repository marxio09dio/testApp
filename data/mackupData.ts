export const events = [
  {
    id: "1",
    title: "Medicina",
    pet: "Tommy",
    time: "3:13 PM",
    date: "Mon, Mar 24",
    fullDate: "March 24, 2025",
    type: "PRESCRIPTION",
    color: "#3B82F6",
    status: "completed",
    description: "Give Tommy his monthly heart medication. Remember to administer after a meal.",
    location: "Home",
    notes: "Prescribed by Dr. Wilson on February 15. Dosage: 1 pill.",
    reminder: "15 minutes before",
    repeat: "Monthly",
    petImage: "https://place.dog/300/400",
    attachments: [
      { id: "1", name: "Prescription.pdf", icon: "file-pdf-box" },
      { id: "2", name: "Medication_Instructions.jpg", icon: "file-image" }
    ]
  },
  {
    id: "2",
    title: "Vet Checkup",
    pet: "Tommy",
    time: "5:30 PM",
    date: "Mon, Mar 24",
    fullDate: "March 24, 2025",
    type: "APPOINTMENT",
    color: "#8B5CF6",
    status: "upcoming",
    description: "Regular check-up appointment with Dr. Martinez.",
    location: "Happy Paws Veterinary Clinic, 123 Main St.",
    notes: "Bring vaccination records. Tommy needs rabies booster.",
    reminder: "1 hour before",
    repeat: "Every 6 months",
    petImage: "https://place.dog/300/300",
    attachments: [{ id: "1", name: "Last_Visit_Report.pdf", icon: "file-pdf-box" }]
  },
  {
    id: "3",
    title: "Grooming",
    pet: "Tommy",
    time: "11:00 AM",
    date: "Tue, Mar 25",
    fullDate: "March 25, 2025",
    type: "GROOMING",
    color: "#F59E0B",
    status: "upcoming",
    description: "Full grooming session including bath, haircut, and nail trimming.",
    location: "Fluffy Friends Grooming Salon, 456 Oak Ave.",
    notes: "Use hypoallergenic shampoo. Tommy gets anxious during nail trims.",
    reminder: "30 minutes before",
    repeat: "Monthly",
    petImage: "https://place.dog/300/500",
    attachments: []
  },
  {
    id: "4",
    title: "Walk",
    pet: "Max",
    time: "4:00 PM",
    date: "Mon, Mar 24",
    fullDate: "March 24, 2025",
    type: "OTHER",
    color: "#10B981",
    status: "upcoming",
    description: "Evening walk at the park. Bring frisbee for play session.",
    location: "Sunshine Park, West Entrance",
    notes: "Bring water bottle and poop bags. Max needs at least 30 minutes of exercise.",
    reminder: "15 minutes before",
    repeat: "Daily",
    petImage: "https://place.dog/300/200",
    attachments: []
  },
  {
    id: "5",
    title: "Vaccination",
    pet: "Bella",
    time: "2:30 PM",
    date: "Wed, Mar 26",
    fullDate: "March 26, 2025",
    type: "PRESCRIPTION",
    color: "#EF4444",
    status: "upcoming",
    description: "Annual vaccination appointment for distemper and bordetella.",
    location: "Pet Care Center, 789 Elm St.",
    notes: "Bella may need to stay for 15 minutes after for observation. Bring treats.",
    reminder: "1 day before",
    repeat: "Yearly",
    petImage: "https://place.dog/300/600",
    attachments: [
      { id: "1", name: "Vaccination_Schedule.pdf", icon: "file-pdf-box" },
      { id: "2", name: "Insurance_Info.pdf", icon: "file-pdf-box" }
    ]
  }
]

export const pets = [
  {
    id: "1",
    name: "Tommy",
    age: 3,
    breed: "Golden Retriever",
    birthday: new Date(2022, 2, 24),
    image: "https://place.dog/300/200"
  },
  {
    id: "2",
    name: "Max",
    breed: "Labrador",
    age: 5,
    birthday: new Date(2020, 6, 15),
    image: "https://place.dog/300/300"
  },
  {
    id: "3",
    name: "Bella",
    age: 2,
    breed: "Mixed",
    birthday: new Date(2023, 11, 25),
    image: "https://place.dog/300/400"
  }
]
