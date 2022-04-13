import React, { FC } from "react"
import { StatusBar } from "expo-status-bar"

import { GestureHandlerRootView } from "react-native-gesture-handler"
import { StyleSheet } from "react-native"

import { Screen } from "./reactive/intro"

export const App: FC = () => {
  return (
    <GestureHandlerRootView style={styles.root}>
      <StatusBar style="auto"/>
      <Screen />
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
})

