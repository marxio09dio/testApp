import { FontAwesome5, MaterialIcons } from "@expo/vector-icons"

export const getEventColors = (type: string): [string, string] => {
  switch (type) {
    case "APPOINTMENT":
      return ["#4CAF50", "#388E3C"]
    case "GROOMING":
      return ["#FF4081", "#F50057"]
    case "PRESCRIPTION":
      return ["#2196F3", "#1976D2"]
    case "OTHER":
    default:
      return ["#673AB7", "#512DA8"]
  }
}

export const getEventIcon = (type: string) => {
  switch (type) {
    case "APPOINTMENT":
      return <FontAwesome5 name="clinic-medical" size={20} color="white" />
    case "GROOMING":
      return <MaterialIcons name="content-cut" size={20} color="white" />
    case "PRESCRIPTION":
      return <FontAwesome5 name="pills" size={20} color="white" />
    case "OTHER":
    default:
      return <FontAwesome5 name="paw" size={20} color="white" />
  }
}
