import React, { FC } from "react"
import { Button, SafeAreaView, ScrollView, StyleSheet } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"

import { HomeNavigationParams, ReactiveNavigationParams, RootNavigationParams } from "../../navigations"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"

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
        <Button title="gesture-handler-basic" onPress={navigateTo("gesture-handler-basic")} />
        <Button title="scroll-view" onPress={navigateTo("scroll-view")} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
})
