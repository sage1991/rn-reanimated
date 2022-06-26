import React, { FC } from "react"
import { StyleSheet } from "react-native"
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated"

import { Page } from "./components"

const WORDS: string[] = ["NICE", "ONE,", "SONNY!", "NICE", "ONE,", "SON!"]

export const AnimatedScrollViewScreen: FC = () => {
  const translateX = useSharedValue<number>(0)

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x
  })

  return (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      style={styles.root}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
    >
      {WORDS.map((word, index) => (
        <Page key={index} index={index} title={word} translateX={translateX} />
      ))}
    </Animated.ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
})
