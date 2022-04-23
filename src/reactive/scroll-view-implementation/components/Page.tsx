import React, { FC } from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"

const WIDTH = Dimensions.get("window").width

interface Props {
  index: number
  title: string
}

export const Page: FC<Props> = (props) => {
  return (
    <View style={[styles.root, { backgroundColor: `rgba(0, 255, 0, 0.${props.index})` }]}>
      <Text style={styles.text}>{props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: WIDTH,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 70,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "capitalize"
  }
})
