import React, { FC, useEffect } from "react"
import { StyleSheet, View } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withRepeat
} from "react-native-reanimated"

const handleRotation = (progress: Animated.SharedValue<number>) => {
  "worklet"
  return `${Math.PI * 2 * progress.value}rad`
}

export const Screen: FC = () => {
  const progress = useSharedValue<number>(0)

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value / 2,
      borderRadius: progress.value * 100 / 2,
      transform: [{ scale: progress.value * 2 }, { rotate: handleRotation(progress) }]
    }
  }, [])

  useEffect(() => {
    progress.value = withRepeat(withSpring(1), -1, true)
  }, [])

  return (
    <View style={styles.root}>
      <Animated.View style={[ styles.box, reanimatedStyle ]} />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff"
  },
  box: {
    height: 100,
    width: 100,
    backgroundColor: "blue"
  }
})
