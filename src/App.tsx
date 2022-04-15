import React, { FC } from "react"
import { StatusBar } from "expo-status-bar"
import { NavigationContainer } from "@react-navigation/native"

import { RootNavigation } from "./navigations"

export const App: FC = () => {
  return (
    <>
      <StatusBar style="auto"/>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </>
  )
}
