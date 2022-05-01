import React, { FC } from "react"
import { StyleSheet, Text, View } from "react-native"
import { Ripple } from "./components"

export const RippleScreen: FC = () => {
  const onTap = () => {}

  return (
    <View style={styles.root}>
      <Ripple style={styles.ripple} onTap={onTap}>
        <Text style={styles.text}>Tap</Text>
      </Ripple>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  ripple: {
    width: 200,
    height: 200,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    elevation: 2
  },
  text: {
    fontSize: 25,
    fontWeight: "500"
  }
})
