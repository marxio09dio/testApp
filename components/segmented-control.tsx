import React from "react"
import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native"
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated"
import { Ionicons } from "@expo/vector-icons"

type SegmentedControlProps = {
  options: string[]
  selectedOption: string
  onOptionPress?: (option: string) => void
  hasMissed?: boolean
}

const SegmentedControl: React.FC<SegmentedControlProps> = React.memo(
  ({ options, selectedOption, onOptionPress, hasMissed }) => {
    const { width: windowWidth } = useWindowDimensions()

    const internalPadding = 20
    const segmentedControlWidth = windowWidth - 40
    const itemWidth = (segmentedControlWidth - internalPadding) / options.length

    const rStyle = useAnimatedStyle(() => {
      return {
        left: withTiming(itemWidth * options.indexOf(selectedOption) + internalPadding / 2)
      }
    }, [selectedOption, options, itemWidth])

    return (
      <View
        style={[
          styles.container,
          {
            width: segmentedControlWidth,
            borderRadius: 15,
            paddingLeft: internalPadding / 2,
            backgroundColor: "#FFFFFF"
          }
        ]}
      >
        <Animated.View
          style={[
            {
              width: itemWidth,
              backgroundColor: "#FF7A9D"
            },
            rStyle,
            styles.activeBox
          ]}
        />
        {options.map((option) => {
          const isSelected = option === selectedOption
          return (
            <TouchableOpacity
              onPress={() => onOptionPress?.(option)}
              key={option}
              style={[
                {
                  width: itemWidth
                },
                styles.labelContainer
              ]}
            >
              <Text style={{ color: isSelected ? "white" : "#FF7A9D" }}>{option}</Text>

              {option === "Past" && hasMissed && (
                <View style={styles.warningBadge}>
                  <Ionicons name="warning" size={12} color="white" />
                </View>
              )}
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 55,
    marginVertical: 10
  },
  activeBox: {
    position: "absolute",
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.1,
    elevation: 3,
    height: "80%",
    top: "10%"
  },
  labelContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  warningBadge: {
    position: "absolute",
    top: 5,
    right: 0,
    backgroundColor: "#FF6B6B",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center"
  }
})

export { SegmentedControl }
