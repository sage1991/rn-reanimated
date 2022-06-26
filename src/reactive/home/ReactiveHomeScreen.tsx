import React, { FC } from "react"
import { Button, ScrollView, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StackScreenProps } from "@react-navigation/stack"

import { NavigationParams } from "../../navigations"

type Props = StackScreenProps<NavigationParams>

export const ReactiveHomeScreen: FC<Props> = (props) => {
  const navigateTo = (name: keyof NavigationParams) => () => {
    props.navigation.navigate(name)
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView>
        <Button title="intro" onPress={navigateTo("intro")} />
        <Button title="pan-gesture-handler" onPress={navigateTo("pan-gesture-handler")} />
        <Button title="animated-scroll-view" onPress={navigateTo("animated-scroll-view")} />
        <Button title="interpolate-colors" onPress={navigateTo("interpolate-colors")} />
        <Button title="pinch-gesture-handler" onPress={navigateTo("pinch-gesture-handler")} />
        <Button title="tap-gesture-handler" onPress={navigateTo("tap-gesture-handler")} />
        <Button
          title="scroll-view-implementation"
          onPress={navigateTo("scroll-view-implementation")}
        />
        <Button title="color-picker" onPress={navigateTo("color-picker")} />
        <Button title="svg-and-text" onPress={navigateTo("svg-and-text")} />
        <Button title="swipe-to-delete" onPress={navigateTo("swipe-to-delete")} />
        <Button title="ripple" onPress={navigateTo("ripple")} />
        <Button title="perspective-menu" onPress={navigateTo("perspective-menu")} />
        <Button title="sliding-counter" onPress={navigateTo("sliding-counter")} />
        <Button title="3d-card" onPress={navigateTo("3d-card")} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
})
