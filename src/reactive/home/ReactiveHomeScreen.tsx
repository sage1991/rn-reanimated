import React, { FC } from "react"
import { Button, SafeAreaView, ScrollView, StyleSheet } from "react-native"
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
        <Button title="scroll-view" onPress={navigateTo("scroll-view")} />
        <Button title="interpolate-colors" onPress={navigateTo("interpolate-colors")} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
})
