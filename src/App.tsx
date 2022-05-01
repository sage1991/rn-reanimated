import React, { FC } from "react"
import { StyleSheet } from "react-native"
import { StatusBar } from "expo-status-bar"
import { NavigationContainer } from "@react-navigation/native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { GestureHandlerRootView } from "react-native-gesture-handler"

import { RootNavigation } from "./navigations"

export const App: FC = () => {
  return (
    <GestureHandlerRootView style={styles.root}>
      <StatusBar style="auto" />
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
})
