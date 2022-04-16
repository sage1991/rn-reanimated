import React, { FC } from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import Animated, { SharedValue } from "react-native-reanimated"

const SCREEN_WIDTH = Dimensions.get("window").width
const BOX_SIZE = SCREEN_WIDTH * 0.7

interface Props {
  title: string
  index: number
  translateX: SharedValue<number>
}

export const Page: FC<Props> = (props) => {
  return (
    <View style={[styles.root, { backgroundColor: `rgba(0, 0, 255, 0.${props.index})` }]}>
      <Animated.View style={styles.square} />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: SCREEN_WIDTH,
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  square: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    backgroundColor: "rgba(0, 0, 255, 0.4)"
  }
})
