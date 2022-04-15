import React, { FC } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { StyleSheet, View } from "react-native"

import { ReactiveNavigationParams } from "../../navigations"

type Props = StackScreenProps<ReactiveNavigationParams, "scroll-view">

export const ScrollViewScreen: FC<Props> = () => {
  return (
    <View style={styles.root}>

    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
})
