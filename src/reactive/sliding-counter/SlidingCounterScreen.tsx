import React, { FC } from "react"
import { StyleSheet, View } from "react-native"

import { SlidingCounter } from "./components"

export const SlidingCounterScreen: FC = () => {
  return (
    <View style={styles.root}>
      <SlidingCounter />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})
