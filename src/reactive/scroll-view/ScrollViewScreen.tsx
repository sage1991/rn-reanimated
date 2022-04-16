import React, { FC } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { StyleSheet } from "react-native"
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated"

import { ReactiveNavigationParams } from "../../navigations"
import { Page } from "./components"

const WORDS: string[] = ["NICE", "ONE,", "SONNY!", "NICE", "ONE,", "SON!"]

type Props = StackScreenProps<ReactiveNavigationParams, "scroll-view">

export const ScrollViewScreen: FC<Props> = (props) => {
  const translateX = useSharedValue<number>(0)

  const scrollHandler = useAnimatedScrollHandler((event) => {
    console.log(event.contentOffset.x)
  })

  return (
    <Animated.ScrollView
      horizontal
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
