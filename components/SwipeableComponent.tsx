import React, { useState, useEffect } from "react"
import { StyleSheet, Text, View, TouchableOpacity, ViewStyle, TextStyle } from "react-native"
import Swipeable, { SwipeableMethods } from "react-native-gesture-handler/ReanimatedSwipeable"
import { Ionicons } from "@expo/vector-icons"
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated"

interface SwipeableItemProps {
  swipeableRef?: React.RefObject<SwipeableMethods>
  onDelete?: () => void
  onEdit?: () => void
  children: React.ReactNode
  rightActionText?: string
  leftActionText?: string
  rightActionIcon?: string
  leftActionIcon?: string
  rightActionColor?: string
  leftActionColor?: string
  rightActionWidth?: number
  leftActionWidth?: number
  containerStyle?: ViewStyle
  itemKey?: string | number
  onSwipeableOpen?: (direction?: "left" | "right") => void
  // Add index for calculating dynamic delay
  index?: number
  // Base animation duration
  baseDuration?: number
  // Delay increment per item
  delayIncrement?: number
}

const SwipeableItem: React.FC<SwipeableItemProps> = ({
  swipeableRef,
  onDelete = () => {},
  onEdit = () => {},
  children,
  rightActionText = "Delete",
  leftActionText = "Edit",
  rightActionIcon = "trash-outline",
  leftActionIcon = "pencil-outline",
  rightActionColor = "#FF3B30",
  leftActionColor = "#30A0FF",
  rightActionWidth = 80,
  leftActionWidth = 80,
  containerStyle = {},
  onSwipeableOpen,
  index = 0,
  baseDuration = 800,
  delayIncrement = 100
}) => {
  // Track whether the entrance animation has completed
  const [isAnimationComplete, setIsAnimationComplete] = useState(false)
  const opacity = useSharedValue(1)

  // Calculate total animation time based on index
  const totalAnimationTime = baseDuration + index * delayIncrement

  // Set up animation completion after calculated delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimationComplete(true)
    }, totalAnimationTime)

    return () => clearTimeout(timer)
  }, [totalAnimationTime])

  // Render right action (delete)
  const renderRightActions = () => {
    if (!isAnimationComplete) return null

    return (
      <View style={[containerStyle, { overflow: "hidden" }]}>
        <TouchableOpacity
          style={[
            styles.rightAction,
            {
              backgroundColor: rightActionColor,
              width: rightActionWidth
            }
          ]}
          onPress={() => {
            if (swipeableRef?.current) {
              swipeableRef.current.close()
            }
            onDelete()
          }}
        >
          <Ionicons name={rightActionIcon as any} size={24} color="white" />
          <Text style={styles.actionText}>{rightActionText}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  // Render left action (edit)
  const renderLeftActions = () => {
    if (!isAnimationComplete) return null

    return (
      <View style={[containerStyle, { overflow: "hidden" }]}>
        <TouchableOpacity
          style={[
            styles.leftAction,
            {
              backgroundColor: leftActionColor,
              width: leftActionWidth
            }
          ]}
          onPress={() => {
            if (swipeableRef?.current) {
              swipeableRef.current.close()
            }
            onEdit()
          }}
        >
          <Ionicons name={leftActionIcon as any} size={24} color="white" />
          <Text style={styles.actionText}>{leftActionText}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value
    }
  })

  return (
    <Animated.View style={[styles.container, containerStyle, animatedStyle]}>
      {isAnimationComplete ? (
        <Swipeable
          ref={swipeableRef}
          renderRightActions={renderRightActions}
          renderLeftActions={renderLeftActions}
          rightThreshold={40}
          leftThreshold={40}
          overshootRight={false}
          overshootLeft={false}
          onSwipeableWillOpen={onSwipeableOpen}
        >
          {children}
        </Swipeable>
      ) : (
        <View>{children}</View>
      )}
    </Animated.View>
  )
}

interface Styles {
  container: ViewStyle
  rightAction: ViewStyle
  leftAction: ViewStyle
  actionText: TextStyle
}

const styles = StyleSheet.create<Styles>({
  container: {
    overflow: "hidden"
  },
  rightAction: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
  leftAction: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
  actionText: {
    color: "white",
    fontSize: 12,
    marginTop: 3
  }
})

export default SwipeableItem
