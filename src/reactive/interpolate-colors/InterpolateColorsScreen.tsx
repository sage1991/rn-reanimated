import React, { FC, useState } from "react"
import { Dimensions, StyleSheet, Switch } from "react-native"
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming
} from "react-native-reanimated"

type Theme = "light" | "dark"

const SWITCH_TRACK_COLOR = {
  true: "rgba(255, 0, 255, 0.2)",
  false: "rgba(0, 0, 0, 0.1)"
}

const Colors = {
  dark: {
    background: "#1e1e1e",
    circle: "#252525",
    text: "#f8f8f8"
  },
  light: {
    background: "#f8f8f8",
    circle: "#ffffff",
    text: "#1e1e1e"
  }
}

export const InterpolateColorsScreen: FC = () => {
  const [theme, setTheme] = useState<Theme>("light")
  const progress = useDerivedValue<number>(() => {
    return theme === "light" ? withTiming(0) : withTiming(1)
  }, [theme])

  const animatedRootStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.background, Colors.dark.background]
    )
    return { backgroundColor }
  }, [])

  const animatedCircleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.circle, Colors.dark.circle]
    )
    return { backgroundColor }
  }, [])

  const animatedTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(progress.value, [0, 1], [Colors.light.text, Colors.dark.text])
    return { color }
  }, [])

  const onThemeChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light")
  }

  return (
    <Animated.View style={[styles.root, animatedRootStyle]}>
      <Animated.Text style={[styles.text, animatedTextStyle]}>Theme</Animated.Text>
      <Animated.View style={[styles.circle, animatedCircleStyle]}>
        <Switch
          value={theme === "dark"}
          onValueChange={onThemeChange}
          trackColor={SWITCH_TRACK_COLOR}
          thumbColor="violet"
        />
      </Animated.View>
    </Animated.View>
  )
}

const RADIUS = Dimensions.get("window").width * 0.7

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  circle: {
    alignItems: "center",
    justifyContent: "center",
    width: RADIUS,
    height: RADIUS,
    borderRadius: RADIUS / 2,
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8
  },
  text: {
    fontSize: 70,
    textTransform: "uppercase",
    fontWeight: "700",
    letterSpacing: 14,
    marginBottom: 25
  }
})
