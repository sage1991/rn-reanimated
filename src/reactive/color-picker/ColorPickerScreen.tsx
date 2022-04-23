import React, { FC } from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useWorkletCallback
} from "react-native-reanimated"

import { ReactiveNavigationParams } from "../../navigations"
import { ColorPicker } from "./components"

const COLORS = ["#000000", "#ffffff"]
const SCREEN_WIDTH = Dimensions.get("window").width
const PICKER_WIDTH = SCREEN_WIDTH * 0.9
const PREVIEW_RADIUS = SCREEN_WIDTH * 0.9

type Props = StackScreenProps<ReactiveNavigationParams>

export const ColorPickerScreen: FC<Props> = () => {
  const pickedColor = useSharedValue<string | number>(COLORS[0])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pickedColor.value
    }
  }, [])

  const onColorChanged = useWorkletCallback((color: number | string) => {
    pickedColor.value = color
  }, [])

  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.previewRoot}>
        <Animated.View style={[styles.preview, animatedStyle]} />
      </View>
      <View style={styles.colorPickerRoot}>
        <ColorPicker
          style={styles.colorPicker}
          colors={COLORS}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          onColorChanged={onColorChanged}
        />
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  previewRoot: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center"
  },
  preview: {
    width: PREVIEW_RADIUS,
    height: PREVIEW_RADIUS,
    borderRadius: PREVIEW_RADIUS / 2,
    backgroundColor: "#000000"
  },
  colorPickerRoot: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  colorPicker: {
    height: 30,
    width: PICKER_WIDTH,
    borderRadius: 10
  }
})
