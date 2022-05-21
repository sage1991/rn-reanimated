import React, { FC } from "react"
import { Button, ScrollView, StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StackScreenProps } from "@react-navigation/stack"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"

import {
  HomeNavigationParams,
  ReactiveNavigationParams,
  RootNavigationParams
} from "../../navigations"

type Props = CompositeScreenProps<
  BottomTabScreenProps<HomeNavigationParams, "reactive">,
  StackScreenProps<RootNavigationParams>
>

export const ReactiveHomeScreen: FC<Props> = (props) => {
  const navigateTo = (name: keyof ReactiveNavigationParams) => () => {
    props.navigation.navigate("reactive-stack", { screen: name })
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
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
})
