import React, { FC, useCallback, useEffect, useMemo } from "react"
import { Button, Dimensions, StyleSheet, View } from "react-native"
import { useHeaderHeight } from "@react-navigation/elements"
import Svg, { Circle } from "react-native-svg"
import Animated, {
  cancelAnimation,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming
} from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ReText } from "react-native-redash"

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

export const SvgAndTextScreen: FC = () => {
  const headerHeight = useHeaderHeight()
  const { top } = useSafeAreaInsets()
  const circle = useMemo(() => {
    const { width, height } = Dimensions.get("window")
    const cx = width / 2
    const cy = height / 2 - headerHeight + top
    const radius = width * 0.3
    const circumference = 2 * Math.PI * radius
    return { cx, cy, radius, circumference }
  }, [headerHeight])

  const progress = useSharedValue<number>(0)
  const percent = useDerivedValue<string>(() => `${Math.floor(progress.value * 100)}%`, [])

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: (1 - progress.value) * circle.circumference
    }
  }, [])

  const onPress = useCallback(() => {
    cancelAnimation(progress)
    let duration = 5000
    if (progress.value === 0) {
      progress.value = withTiming(1, { duration })
    } else {
      duration *= progress.value
      progress.value = withTiming(0, { duration })
    }
  }, [])

  return (
    <View style={styles.root}>
      <ReText style={styles.text} text={percent} />
      <Svg style={styles.svg}>
        <Circle cx={circle.cx} cy={circle.cy} r={circle.radius} stroke="#303858" strokeWidth={20} />
        <AnimatedCircle
          cx={circle.cx}
          cy={circle.cy}
          r={circle.radius}
          stroke="#a6e1fa"
          strokeWidth={25}
          strokeDasharray={circle.circumference}
          animatedProps={animatedProps}
        />
      </Svg>
      <View style={styles.button}>
        <Button title="Touch me!" onPress={onPress} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  svg: {
    position: "absolute"
  },
  text: {
    fontSize: 50,
    color: "#888888",
    textAlign: "center",
    width: "100%"
  },
  button: {
    position: "absolute",
    bottom: 80
  }
})
